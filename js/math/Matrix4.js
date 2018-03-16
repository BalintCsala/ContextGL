class Matrix4 {
    constructor(values) {
        if (typeof values === "undefined") {
            this.values = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        } else {
            this.values = values;
        }
    }

    add(m) {
        return new Matrix4(this.values.map((x, i) => x + m.values[i]));
    }

    mul(n) {
        if (n instanceof Matrix4) {
            let result = new Matrix4();
            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 4; x++) {
                    let v = 0;
                    for (let i = 0; i < 4; i++) {
                        v += this.get(i, y) * n.get(x, i);
                    }
                    result.set(x, y, v);
                }
            }
            return result;
        } else if (n instanceof Vector4) {
            let result = new Vector4(0, 0, 0, 0);
            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 4; x++) {
                    result.values[y] += this.get(x, y) * n.values[x];
                }
            }
            return result;
        } else {
            return new Matrix(this.values.map(x => x * n));
        }
    }

    get(x, y) {
        return this.values[y + x * 4];
    }

    set(x, y, value) {
        this.values[y + x * 4] = value;
    }

    static translate(vec) {
        let result = new Matrix4();
        result.set(3, 0, vec.x);
        result.set(3, 1, vec.y);
        result.set(3, 2, vec.z || 0);
        return result;
    }

    static rotate(axis, angle) {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        let result = new Matrix4([
            cos + axis.x * axis.x * (1 - cos), axis.y * axis.x * (1 - cos) + axis.z * sin, axis.z * axis.x * (1 - cos) - axis.y * sin, 0,
            axis.x * axis.y * (1 - cos) - axis.z * sin, cos + axis.y * axis.y * (1 - cos), axis.z * axis.y * (1 - cos) + axis.x * sin, 0,
            axis.x * axis.z * (1 - cos) + axis.y * sin, axis.y * axis.z * (1 - cos) - axis.x * sin, cos + axis.z * axis.z * (1 - cos), 0,
            0, 0, 0, 1
        ]);
        return result;
    }

    static scale(vec) {
        return new Matrix4([
            vec.x, 0, 0, 0,
            0, vec.y, 0, 0,
            0, 0, vec.z, 0,
            0, 0, 0, 1
        ]);
    }

    static TRS(translation, axis, angle, scale) {
        let trans = Matrix4.translate(translation);
        let rot = Matrix4.rotate(axis, angle);
        let scale = Matrix4.scale(scale);

        return trans.mul(rot.mul(scale));
    }

}
