export class Rect {
    constructor(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }

    get x() {
        return this.left;
    }

    get y() {
        return this.top;
    }

    get width() {
        return this.right - this.left;
    }

    get height() {
        return this.bottom - this.top;
    }

    contains(pos) {
        return this.left <= pos.x && this.right > pos.x && this.top <= pos.y && this.bottom > pos.y;
    }
}
