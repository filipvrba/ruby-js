export default class Dispatcher {
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
Dispatcher.DRAW = "draw"