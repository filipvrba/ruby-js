export default class Clock {
  constructor() {
    this._time = Date.now()
  };

  get delta_time() {
    let current_time = Date.now();
    let dt = (current_time - this._time) / 1_000;
    this._time = current_time;
    return dt
  }
}