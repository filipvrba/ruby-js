export default class SSprite {
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
}