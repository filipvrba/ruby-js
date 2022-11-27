import Object2D from "./object2d";

export default class Scene extends Object2D {
  constructor() {
    super();
    this.id = "scene_r"
  };

  get ready() {
    if (!this.parent) return this.global_position = this.position
  }
};

Scene.NAME_SCENE = "Scene"