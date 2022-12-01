import BasicObject from "../core/objects/basic_object";

export default class Grid extends BasicObject {
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
}