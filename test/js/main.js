import "../css/style.css";
import Scene from "./core/objects/scene";
import BasicObject from "./core/objects/basic_object";
import TDRenderer from "./core/td_renderer";
import Object2D from "./core/objects/object2d";
document.querySelector("#app").innerHTML = "<canvas-2d></canvas-2d>";
let canvas_2d = document.querySelector("canvas-2d");
let scene_r = canvas_2d.scene_r;
scene_r.connect("resize", () => update_scene_pos());

function update_scene_pos() {
  scene_r.global_position = canvas_2d.win_center_position
};

update_scene_pos();

class BoxB extends Object2D {
  constructor() {
    super();
    this.position.x = 100
  };

  ready() {
    console.log(this.id)
  };

  // console.log dt
  // console.log this.global_position, this.position
  update(dt) {};

  draw(r) {
    r.beginPath();

    r.arc(
      this.global_position.x,
      this.global_position.y,
      Math.abs(50),
      0,
      Math.PI * 2,
      false
    );

    r.closePath();
    r.fillStyle = "#13be11";
    r.fill()
  }
};

class Box extends Object2D {
  constructor() {
    super();
    this.position.x = 200
  };

  ready() {
    console.log(this.id);
    this.add(new BoxB, "box_b")
  };

  // console.log dt
  // console.log this.global_position, this.position
  update(dt) {};

  draw(r) {
    // console.log r
    r.beginPath();

    r.arc(
      this.global_position.x,
      this.global_position.y,
      Math.abs(30),
      0,
      Math.PI * 2,
      false
    );

    r.closePath();
    r.fillStyle = "#252525";
    r.fill()
  }
};

scene_r.add(new Box, "box")