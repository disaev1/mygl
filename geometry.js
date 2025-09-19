/**
 * @property {Vec2|Number} u
 * @property {Number} v
 */
class Vec2 {
  /**
   * 
   * @param {Vec2|Number} arg1 
   * @param {Number} [v]
   */
  constructor(arg1, v) {
    if (arguments.length === 1 && arg1 instanceof Vec2) {
      this.u = arg1.u;
      this.v = arg1.v;
    } else {
      this.u = arg1 || 0;
      this.v = v || 0;
    }
  }

  get x() {
    return this.u;
  }

  get y() {
    return this.v;
  }

  set x(value) {
    this.u = value;
  }

  set y(value) {
    this.v = value;
  }

  /**
   * 
   * @param {Vec2} V 
   * @returns {Vec2}
   */
  add(V) {
    return new Vec2(this.u + V.u, this.v + V.v);
  }

  /**
   * 
   * @param {Vec2} V 
   * @returns {Vec2}
   */
  subtract(V) {
    return new Vec2(this.u - V.u, this.v - V.v);
  }

  /**
   * 
   * @param {Vec2} V 
   * @returns {Vec2}
   */
  multiply(num) {
    return new Vec2(this.u * num, this.v * num);
  }

  /**
   * @returns {String} string representation in the following format: "(x, y)"
   */
  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

class Vec3 {
  /**
   * @param {Number} x 
   * @param {Number} y 
   * @param {Number} z 
   */
  constructor(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  /**
   * @param {Vec3} v
   * @returns {Vec3} cross product of the vector with another
   */
  caret(v) {
    return new Vec3(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.z * v.y - this.y * v.z);
  }

  /**
   * @param {Vec3} v 
   * @returns {Vec3} summ of the vector with another
   */
  add(v) {
    return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  /**
   * @param {Vec3} v 
   * @returns {Vec3} vector which is a result of subtracting another vector from the vector
   */
  subtract(v) {
    return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  /**
   * 
   * @param {Number|Vec3} arg 
   * @returns {Number} dot product of the vector with another vector or a number
   */
  multiply(arg) {
    if (typeof arg === 'number') {
      return new Vec3(this.x * arg, this.y * arg, this.z * arg);
    } else if (arg instanceof Vec3) {
      return this.x * arg.x + this.y * arg.y + this.z * arg.z;
    }

    throw new Error('Multiply argument is neither number nor Vec3!');
  }

  /**
   * @returns {Number} euclidean norm
   */
  norm() {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }

  /**
   * 
   * @param {Number} [l = 1] multiplier
   * @returns {Vec3} normalized vector
   */
  normalize(l = 1) {
    return this.multiply(l / this.norm());
  }

  /**
   * @returns {String} string representation in the following format: "(x, y, z)"
   */
  toString() {
    return `(${this.x}, ${this.y}, ${this.z})`;
  }
}
