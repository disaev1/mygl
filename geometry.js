class Vec2 {
  constructor(u, v) {
    this.u = u || 0;
    this.v = v || 0;
  }

  add(V) {
    return new Vec2(this.u + V.u, this.v + V.v);
  }

  subtract(V) {
    return new Vec2(this.u - V.u, this.v - V.v);
  }

  multiply(num) {
    return new Vec2(this.u * num, this.v * num);
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

class Vec3 {
  constructor(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  caret(v) {
    return new Vec3(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.z * v.y - this.y * v.z);
  }

  add(v) {
    return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  subtract(v) {
    return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  multiply(arg) {
    if (typeof arg === 'number') {
      return new Vec3(this.x * arg, this.y * arg, this.z * arg);
    } else if (arg instanceof Vec3) {
      return this.x * arg.x + this.y * arg.y + this.z * arg.z;
    }

    throw new Error('Multiply argument is neither number nor Vec3!');
  }

  norm() {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }

  normalize(l = 1) {
    return this.multiply(l / this.norm());
  }

  toString() {
    return `(${this.x}, ${this.y}, ${this.z})`;
  }
}
