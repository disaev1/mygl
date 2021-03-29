class Model {
  constructor(str) {
    this.verts_ = [];
    this.faces_ = [];

    const lines = str.split('\n');
    
    lines.forEach(line => {
      if (line.startsWith('v ')) {
        const coords = line
          .slice(2)
          .split(' ')
          .map(strValue => Number(strValue));

        this.verts_.push(new Vec3(...coords));

      } else if (line.startsWith('f ')) {
        const ids = line
          .slice(2)
          .split(' ')
          .map(item => Number(item.split('/')[0]))
          .map(id => id - 1);

        this.faces_.push(ids);
      }
    });
  }

  nverts() {
    return this.verts_.length;
  }

  nfaces() {
    return this.faces_.length;
  }

  vert(idx) {
    return this.verts_[idx];
  }

  face(idx) {
    return this.faces_[idx];
  }
}
