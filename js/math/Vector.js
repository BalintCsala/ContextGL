class Vector {

    constructor() {
        this.length = arguments.length;
        this.values = arguments;
    }

    add(v) {
        if (this.length == v.length)
            return new Vector(this.values.map((x, i) => x + v.values[i]));
    }

    sub(v) {
        return this.add(v.mul(-1));
    }

    mul(n) {
        return new Vector(this.values.map(x => x * n));
    }

    div(n) {
        return this.mul(1 / n);
    }

    dot(v) {
        if (this.length == v.length) {
            let result = 0;
            for (let i = 0; i < this.length; i++) {
                result += this.values[i] * v.values[i];
            }
            return result;
        }
    }

}

class Vector2 extends Vector {

    constructor(x, y) {
        super(x, y)
    }

    get x() {
        return this.values[0];
    }

    set x(value) {
        this.values[0] = value;
    }

    get y() {
        return this.values[1];
    }

    set y(value) {
        this.values[1] = value;
    }

}

class Vector3 extends Vector {

    constructor(x, y, z) {
        super(x, y, z)
    }

    get x() {
        return this.values[0];
    }

    set x(value) {
        this.values[0] = value;
    }

    get y() {
        return this.values[1];
    }

    set y(value) {
        this.values[1] = value;
    }

    get z() {
        return this.values[2];
    }

    set z(value) {
        this.values[2] = value;
    }

    cross(v) {
        if (v.length == 3) {
            return new Vector3(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
        }
    }

}

class Vector4 extends Vector {

    constructor(x, y, z, w) {
        super(x, y, z, w)
    }

    get x() {
        return this.values[0];
    }

    set x(value) {
        this.values[0] = value;
    }

    get y() {
        return this.values[1];
    }

    set y(value) {
        this.values[1] = value;
    }

    get z() {
        return this.values[2];
    }

    set z(value) {
        this.values[2] = value;
    }

    get w() {
        return this.values[3];
    }

    set w(value) {
        this.values[3] = value;
    }

}
