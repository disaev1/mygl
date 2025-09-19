

CanvasRenderingContext2D.prototype.set = function(x, y, color) {
  let oldFillStyle;
  
  if (image.fillStyle !== color) {
    oldFillStyle = image.fillStyle;
  }

  image.fillStyle = color;
  this.fillRect(x, y, 1, 1);

  if (oldFillStyle !== color) {
    image.fillStyle = oldFillStyle;
  }
}

const white = 'rgba(255, 255, 255, 255)';
const red = 'rgba(255, 0, 0, 255)';
const width = 750;
const height = 750;
const canvas = document.getElementById('main');
canvas.width = width;
canvas.height = height;
const image = canvas.getContext('2d');

image.fillStyle = 'black';
image.fillRect(0, 0, width, height);

function line(p0, p1, image, color) {
  let steep = false;
  let ip0, ip1;

  if (Math.abs(p0.x - p1.x) < Math.abs(p0.y - p1.y)) {
    ip0 = new Vec2(p0.y, p0.x);
    ip1 = new Vec2(p1.y, p1.x);
    steep = true;
  } else {
    ip0 = new Vec2(p0.x, p0.y);
    ip1 = new Vec2(p1.x, p1.y);
  }

  if (ip0.x > ip1.x) {
    [ip0, ip1] = [ip1, ip0];
  }

  const dx = ip1.x - ip0.x;
  const dy = ip1.y - ip0.y;
  const derror2 = Math.abs(dy) * 2;
  
  let error2 = 0;
  let y = ip0.y;

  for (let x = ip0.x; x <= ip1.x; x++) {
    if (steep) {
      image.set(y, x, color);
    } else {
      image.set(x, y, color);
    }

    error2 += derror2;

    if (error2 > dx) {
      y += (ip1.y > ip0.y ? 1 : -1);
      error2 -= dx * 2;
    }
  }
}


const model = new Model(africanHeadStr);

for (let i = 0; i < model.nfaces(); i++) {
  const face = model.face(i);

  for (let j = 0; j < 3; j++) {
    const v0 = model.vert(face[j]);
    const v1 = model.vert(face[(j + 1) % 3]);

    const x0 = (v0.x + 1) * width / 2;
    const y0 = (v0.y + 1) * height / 2;
    const x1 = (v1.x + 1) * width / 2;
    const y1 = (v1.y + 1) * height / 2;

    const r = Math.round(255 / 1.35021 * (v0.z + 0.675105));
    line(x0, y0, x1, y1, image, `rgba(${r}, ${r}, ${r}, 255)`);
  }
}

// function triangle(t0, t1, t2, image, color) {
//   line(t0, t1, image, color);
//   line(t1, t2, image, color);
//   line(t2, t0, image, color);
// }

// const t0 = [new Vec2(10, 70), new Vec2(50, 160), new Vec2(70, 80)];

// triangle(t0[0], t0[1], t0[2], image, red);
