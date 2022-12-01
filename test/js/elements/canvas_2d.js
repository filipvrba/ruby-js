import Scene from "../core/objects/scene";
import TDRenderer from "../core/td_renderer";
import Vector2 from "../core/math/vector2";
import Grid from "../scene/grid";

export default class Canvas2DElement extends HTMLElement {
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

Canvas2DElement.RESIZE = "resize"