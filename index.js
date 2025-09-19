

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
const green = 'rgba(0, 255, 0, 255)';
const width = 200;
const height = width;
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

function triangle(t0, t1, t2, image, color) {
  if (t0.y === t1.y && t0.y === t2.y) {
    return;
  }

  [t0, t1, t2] = [t0, t1, t2].sort((a, b) => a.y > b.y ? 1 : -1)

  const totalHeight = t2.y - t0.y;

  for (let i = 0; i < totalHeight; i++) {
    const secondHalf = i > t1.y - t0.y || t1.y === t0.y;
    const segmentHeight = secondHalf ? t2.y - t1.y : t1.y - t0.y;

  }

  for (let y = t0.y; y <= t1.y; y++) {
    const segmentHeight = t1.y - t0.y + 1;
    const alpha = (y - t0.y) / totalHeight;
    const beta = (y - t0.y) / segmentHeight;

    let A = new Vec2(t2)
      .subtract(t0)
      .multiply(alpha)
      .add(t0);

    let B = new Vec2(t1)
      .subtract(t0)
      .multiply(beta)
      .add(t0);

    if (A.x > B.x) {
      [A, B] = [B, A];
    }

    for (let j = A.x; j <= B.x; j++) {
      image.set(j, y, color);
    }
  }

  for (let y = t1.y; y <= t2.y; y++) {
    const segmentHeight = t2.y - t1.y + 1;
    const alpha = (y - t0.y) / totalHeight;
    const beta = (y - t1.y) / segmentHeight;

    let A = new Vec2(t2)
      .subtract(t0)
      .multiply(alpha)
      .add(t0);

    let B = new Vec2(t2)
      .subtract(t1)
      .multiply(beta)
      .add(t1);

    if (A.x > B.x) {
      [A, B] = [B, A];
    }

    for (let j = A.x; j <= B.x; j++) {
      image.set(j, y, color);
    }
  }

  // line(t0, t1, image, color);
  // line(t1, t2, image, color);
  // line(t2, t0, image, color);
}

const t0 = [new Vec2(10, 70), new Vec2(50, 160), new Vec2(70, 80)];
const t1 = [new Vec2(180, 50), new Vec2(150, 1), new Vec2(70, 180)];
const t2 = [new Vec2(180, 150), new Vec2(120, 160), new Vec2(130, 180)]

triangle(t0[0], t0[1], t0[2], image, red);
triangle(t1[0], t1[1], t1[2], image, white);
triangle(t2[0], t2[1], t2[2], image, green);
