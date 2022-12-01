import BasicObject from "./basic_object";
import Vector2 from "../math/vector2";

export default class Object2D extends BasicObject {
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
}