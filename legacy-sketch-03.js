const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const sketch = ({ context, width, height }) => {
  const agents = [];
  // const colors = ["#c2c2c2", "#ffffff", "#000000"];
  const colors = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"];

  for (let i = 0; i < 1000; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);
    const color = colors[Math.floor(Math.random() * colors.length)];
    agents.push(new Agent(x, y, color));
  }

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    agents.forEach((agent) => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x, y, color) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(10, 20);
    this.color = color;
  }

  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width / 2) this.vel.x *= -1; //i dunno why put /2 is fix the right and bottom bounce issue
    if (this.pos.y <= 0 || this.pos.y >= height / 2) this.vel.y *= -1; //i dunno why put /2 is fix the right and bottom bounce issue
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(context) {
    context.fillStyle = this.color;

    context.save();
    context.translate(this.pos.x, this.pos.y);

    // context.lineWidth = 4;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    // context.stroke();

    context.restore();
  }
}
