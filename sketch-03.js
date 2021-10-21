const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = ({ context, width, height }) => {
  const agents = [];
  const colors = ["#c2c2c2", "#ffffff", "#000000"];

  for (let i = 0; i < 40000; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);
    const color = colors[Math.floor(Math.random() * 3)];
    agents.push(new Agent(x, y, color));
  }

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    agents.forEach((agent) => {
      agent.draw(context);
    });
  };
};

canvasSketch(sketch, settings);

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x, y, color) {
    this.pos = new Point(x, y);
    this.radius = 10;
    this.color = color;
  }

  draw(context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
}
