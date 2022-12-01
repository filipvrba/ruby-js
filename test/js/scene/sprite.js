import Object2D from "../core/objects/object2d";
import Vector2 from "../core/math/vector2";

export default class Sprite extends Object2D {
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
}