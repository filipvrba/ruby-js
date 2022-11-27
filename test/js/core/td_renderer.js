import Clock from "./clock";
import Dispatcher from "./dispatcher";

export default class TDRenderer {
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

TDRenderer.DIMENSION = "2d"