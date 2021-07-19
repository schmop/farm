export default class Vec {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new Vec(this.x, this.y);
    }

    add(x, y) {
        if (!(x instanceof Vec)) {
            x = new Vec(x,y);
        }
        return new Vec(this.x + x.x, this.y + x.y);
    }

    sub(x, y) {
        if (!(x instanceof Vec)) {
            x = new Vec(x,y);
        }
        return new Vec(this.x - x.x, this.y - x.y);
    }

    normalize() {
        return this.scale(1 / this.length());
    }

    floor(step) {
        return new Vec(Math.floor(this.x / step) * step, Math.floor(this.y / step) * step);
    }

    round(step) {
        return new Vec(Math.round(this.x / step) * step, Math.round(this.y / step) * step);
    }

    scale(factor) {
        return new Vec(this.x * factor, this.y * factor);
    }

    mult(x, y) {
        if (!(x instanceof Vec)) {
            x = new Vec(x,y);
        }

        return new Vec(this.x * x.x, this.y * x.y);
    }

    half() {
        return this.scale(0.5);
    }

    length() {
        return Math.sqrt(this.dot(this));
    }

    dot(x,y) {
        if (!(x instanceof Vec)) {
            x = new Vec(x,y);
        }
        return this.x*x.x + this.y*x.y;
    }

    det(x,y) {
        if (!(x instanceof Vec)) {
            x = new Vec(x,y);
        }
        return this.x*x.y - this.y*x.x;
    }

    clockwiseAngleBetween(x, y) {
        if (!(x instanceof Vec)) {
            x = new Vec(x,y);
        }

        return Math.atan2(this.det(x), this.dot(x));
    }

    distance(x, y) {
        if (!(x instanceof Vec)) {
            x = new Vec(x,y);
        }
        return this.sub(x).length();
    }

    rotate(angle) {
        return new Vec(
            this.x * Math.cos(angle) - this.y * Math.sin(angle),
            this.x * Math.sin(angle) + this.y * Math.cos(angle)
        );
    }

    steer(desired, factor) {
        const angle = this.normalize().clockwiseAngleBetween(desired.normalize());
        if (isNaN(angle)) {
            return this;
        }

        return this.rotate(angle * factor);
    }

    closestPointOnLine(a, b) {
        let ap = this.sub(a);
        let ab = b.sub(a);
        let magnitudeAB = ab.dot(ab);
        let abapProduct = ap.dot(ab);
        let dist = abapProduct / magnitudeAB;

        if (dist < 0) {
            return a;
        } else if (dist > 1) {
            return b;
        }
        return a.add(ab.scale(dist));
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
};