export default class Vector2 {
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
}