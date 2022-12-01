class Clock {
  constructor() {
    this._time = Date.now()
  };

  get delta_time() {
    let current_time = Date.now();
    let dt = (current_time - this._time) / 1_000;
    this._time = current_time;
    return dt
  }
};

class Dispatcher {
  get signals() {
    return this._signals
  };

  set signals(signals) {
    this._signals = signals
  };

  constructor() {
    this._signals = null
  };

  connect(type_s, handler) {
    if (this._signals == undefined) this._signals = {};
    if (this._signals[type_s] == undefined) this._signals[type_s] = [];

    if (this._signals[type_s].indexOf(handler) == -1) {
      this._signals[type_s].push(handler)
    }
  };

  disconnect(type_s, handler) {
    let index;
    if (this._signals == undefined) return;
    let signal_arr = this._signals[type_s];
    if (signal_arr != undefined) index = signal_arr.indexOf(handler);
    if (index != -1) signal_arr.splice(index, 1)
  };

  has_signal(type_s, handler) {
    if (this._signals == undefined) return false;
    return this._signals[type_s] != undefined && this._signals[type_s].indexOf(handler) != -1
  };

  emit_signal(type_s, ...args) {
    if (this._signals == undefined) return;
    let signal_arr = this._signals[type_s];

    if (signal_arr != undefined) {
      if (type_s == "added" && typeof this.ready == "undefined") return;
      signal_arr.slice(0).forEach(sig => sig(...args))
    }
  }
};

Dispatcher.ADDED = "added";
Dispatcher.READY = "ready";
Dispatcher.UPDATE = "update";
Dispatcher.DRAW = "draw";

class Vector2 {
  get x() {
    return this._x
  };

  set x(x) {
    this._x = x
  };

  get y() {
    return this._y
  };

  set y(y) {
    this._y = y
  };

  constructor(x=0, y=0) {
    this._x = x;
    this._y = y
  };

  get w() {
    return this._x
  };

  get h() {
    return this._y
  };

  get length() {
    return Math.sqrt(this._x * this._x + this._y * this._y)
  };

  lerp(vector, alpha) {
    this._x += (vector.x - this._x) * alpha;
    this._y += (vector.y - this._y) * alpha;
    return this
  };

  get normalized() {
    let v = this.clone;
    v._normalize;
    return v
  };

  multiply(vector) {
    this._x *= vector.x;
    this._y *= vector.y;
    return this
  };

  multiply_scalar(scalar) {
    this._x *= scalar;
    this._y *= scalar;
    return this
  };

  get clone() {
    return new this.constructor(this._x, this._y)
  };

  add(vector) {
    this._x += vector.x;
    this._y += vector.y;
    return this
  };

  sub(vector) {
    this._x -= vector.x;
    this._y -= vector.y;
    return this
  };

  sub_scalar(scalar) {
    this._x -= scalar;
    this._y -= scalar;
    return this
  };

  equals(vector) {
    return vector.x == this._x && vector.y == this._y
  };

  distance_to(vector) {
    return Math.sqrt(this.distance_to_squared(vector))
  };

  distance_to_squared(vector) {
    let dx = this._x - vector.x;
    let dy = this._y - vector.y;
    return dx * dx + dy * dy
  };

  dot(vector) {
    return this._x * vector.x + this._y * vector.y
  };

  // private
  get _normalize() {
    let l = this._x * this._x + this._y * this._y;

    if (l != 0) {
      l = Math.sqrt(l);
      this._x /= l;
      this._y /= l
    };

    return this
  }
};

class TDRenderer {
  constructor(canvas) {
    this._canvas = canvas;
    this._clock = new Clock
  };

  set_size(width, height) {
    this._canvas.width = width;
    this._canvas.height = height
  };

  get renderer() {
    return this._canvas.getContext(TDRenderer.DIMENSION)
  };

  render(scene) {
    this.renderer.clearRect(
      0,
      0,
      this._canvas.width,
      this._canvas.height
    );

    scene.emit_signal(Dispatcher.DRAW, this.renderer);
    scene.emit_signal(Dispatcher.UPDATE, this._clock.delta_time)
  }
};

TDRenderer.DIMENSION = "2d";

class SSprite {
  get position() {
    return this._position
  };

  set position(position) {
    this._position = position
  };

  get size() {
    return this._size
  };

  set size(size) {
    this._size = size
  };

  constructor(source_position, source_size) {
    this._position = source_position;
    this._size = source_size
  }
};

class BasicObject extends Dispatcher {
  get id() {
    return this._id
  };

  get parent() {
    return this._parent
  };

  get children() {
    return this._children
  };

  set id(id) {
    this._id = id
  };

  set parent(parent) {
    this._parent = parent
  };

  constructor() {
    super();
    this._id = undefined;
    this._parent = null;
    this._children = []
  };

  add(object, id=undefined) {
    if (object == this) {
      console.error(`${this.class.name}.add: object can't be added as a child of itself.`);
      return this
    };

    if (object) {
      if (object.parent != null) object.parent.remove(object);
      object.parent = this;
      if (object.id == undefined) object.id = id;
      this._children.push(object);

      // TODO: updateGlobalPosition
      this.add_signals(object)
    } else {
      console.error(`${this.class.name}.add: object not an instance of ${this.class.name}`)
    };

    return this
  };

  add_signals(object) {
    // Added
    if (typeof object.ready !== 'undefined') object.ready();

    // Update
    if (typeof object.update !== 'undefined') {
      object.update_handler = dt => object.update(dt);

      this.get_scene(true).connect(
        Dispatcher.UPDATE,
        object.update_handler
      )
    };

    // Draw
    if (typeof object.draw !== 'undefined') {
      object.draw_handler = ren => object.draw(ren);
      this.get_scene(true).connect(Dispatcher.DRAW, object.draw_handler)
    }
  };

  remove(object) {
    let index = this._children.indexOf(object);

    if (index != -1) {
      object.id = undefined;
      object.parent = null;
      this._children.splice(index, 1)
    };

    return this
  };

  get free() {
    if (this._children.length > 0) {
      let _children = this._children.slice();
      _children.forEach(child => child.free)
    } else if (this._parent) {
      this.free_signals;
      this._parent.remove(this)
    };

    if (this._parent) return this._parent.free
  };

  get free_signals() {
    // this.signals = nil
    if (typeof this.update !== 'undefined') {
      this.get_scene(true).disconnect(
        Dispatcher.UPDATE,
        this.update_handler
      )
    };

    if (typeof this.draw !== 'undefined') {
      return this.get_scene(true).disconnect(
        Dispatcher.DRAW,
        this.draw_handler
      )
    }
  };

  get_scene(is_root=false) {
    let _scene = this;
    let _parent = _scene.parent;

    while (true) {
      if (is_root) {
        if (_parent == null) break
      } else {
        let super_class_name = Object.getPrototypeOf(Object.getPrototypeOf(_parent)).constructor.name;

        if (_parent.constructor.name == Scene.NAME_SCENE || super_class_name == Scene.NAME_SCENE) {
          _scene = _parent;
          break
        }
      };

      _scene = _parent;
      _parent = _scene.parent
    };

    return _scene
  };

  find_child(id) {
    let result = null;

    for (let i in this._children) {
      let child = this._children[i];

      if (child.id == id) {
        result = child;
        break
      }
    };

    return result
  }
};

class Object2D extends BasicObject {
  get position() {
    return this._position
  };

  set position(position) {
    this._position = position
  };

  set global_position(global_position) {
    this._global_position = global_position
  };

  constructor() {
    super();
    this._position = new Vector2;
    this._global_position = new Vector2
  };

  get global_position() {
    this.update_global_position();
    return this._global_position
  };

  // end
  update_global_position() {
    if (this.parent == null) return;

    // unsafe
    let add_vector = this.parent._global_position.clone.add(this._position);

    if (!this._global_position.equals(add_vector)) {
      this._global_position = add_vector
    }
  };

  update_world() {
    if (this.children.length > 0) {
      this.children.forEach((child) => {
        if (typeof child.update_global_position !== 'undefined') {
          child.update_global_position();
          child.update_world()
        }
      })
    } else if (typeof this.update_global_position !== 'undefined') {
      this.update_global_position()
    }
  }
};

class Scene extends Object2D {
  constructor() {
    super();
    this.id = "scene_r"
  };

  ready() {
    if (this.parent) {
      this.update_global_position()
    } else {
      this.global_position = this.position
    }
  }
};

Scene.NAME_SCENE = "Scene";

class Canvas2DElement extends HTMLElement {
  get scene_r() {
    return this._scene_r
  };

  constructor() {
    super();

    this._resizeHandler = () => {
      return this.resize()
    };

    this._renderer = new TDRenderer(this.init_canvas("c2d"));
    this._scene_r = new Scene;
    this._scene_r.ready();
    this.resize()
  };

  init_canvas(id) {
    let template = document.createElement("template");
    template.innerHTML = `${`
      <style type='text/css'>
      canvas {
          position: fixed;
          top: 0;
          left: 0;
          outline: none;
          z-index: -1;
      }
      </style>

      <canvas id='${id}'></canvas>
    `}`;
    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    return this.shadowRoot.getElementById(id)
  };

  tick() {
    this._renderer.render(this._scene_r);

    requestAnimationFrame(() => {
      return this.tick()
    })
  };

  resize() {
    this._renderer.set_size(window.innerWidth, window.innerHeight);
    this._scene_r.emit_signal(Canvas2DElement.RESIZE);
    this._scene_r.update_world()
  };

  get win_center_position() {
    let widthHalf = this._renderer._canvas.width / 2;
    let heightHalf = this._renderer._canvas.height / 2;
    return new Vector2(widthHalf, heightHalf)
  };

  connectedCallback() {
    this.tick();
    window.addEventListener(Canvas2DElement.RESIZE, this._resizeHandler)
  };

  disconnectedCallback() {
    this._scene_r.free;

    window.removeEventListener(
      Canvas2DElement.RESIZE,
      this._resizeHandler
    )
  }
};

Canvas2DElement.RESIZE = "resize";

class Grid extends BasicObject {
  get scale() {
    return this._scale
  };

  set scale(scale) {
    this._scale = scale
  };

  get visible() {
    return this._visible
  };

  set visible(visible) {
    this._visible = visible
  };

  constructor(size_v) {
    super(size_v);
    this._size_v = size_v;
    this._scale = 1;
    this._visible = true
  };

  draw(r) {
    if (!this._visible) return;
    let x = this._size_v.w * this._scale;
    let y = this._size_v.h * this._scale;
    r.lineWidth = 1;

    // x
    for (let i = 0; i < r.canvas.width / x; i++) {
      r.beginPath();
      r.moveTo(x * i, 0);
      r.lineTo(x * i, r.canvas.height);
      r.fill();
      r.stroke()
    };

    // y
    for (let i = 0; i < r.canvas.height / y; i++) {
      r.beginPath();
      r.moveTo(0, y * i);
      r.lineTo(r.canvas.width, y * i);
      r.fill();
      r.stroke()
    }
  }
};

class Sprite extends Object2D {
  get scale() {
    return this._scale
  };

  set scale(scale) {
    this._scale = scale
  };

  get type() {
    return this._type
  };

  set type(type) {
    this._type = type
  };

  get img() {
    return this._img
  };

  set img(img) {
    this._img = img
  };

  constructor(s_sprite) {
    super(s_sprite);
    this._scale = 1;
    this._s_sprite = s_sprite;
    this._img = null
  };

  ready() {
    if (this._s_sprite) {
      this.position = new Vector2(-(this._s_sprite.size.w * this._scale) / 2, -(this._s_sprite.size.h * this._scale) / 2)
    }
  };

  draw(r) {
    if (this._img && this._s_sprite) {
      r.drawImage(
        this._img,
        this._s_sprite.position.x,
        this._s_sprite.position.y,
        this._s_sprite.size.w,
        this._s_sprite.size.h,
        this.global_position.x,
        this.global_position.y,
        this._s_sprite.size.w * this._scale,
        this._s_sprite.size.h * this._scale
      )
    }
  }
};

window.customElements.define("canvas-2d", Canvas2DElement)