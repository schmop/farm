export class Rect {
    constructor(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }

    static byCorners(tl, tr, br, bl) {
        return new Rect(tl, tr, br, bl);
    }

    /**
     * @param {Vec} pos
     * @param {Vec} size
     */
    static bySize(pos, size) {
        return new Rect(pos.x, pos.y, pos.x + size.x, pos.y + size.y);
    }

    /**
     * @param {Vec} offset
     */
    translate(offset) {
        return new Rect(
            this.left + offset.x,
            this.top + offset.y,
            this.right + offset.x,
            this.bottom + offset.y
        );
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

    get tl() {
        return this.left;
    }

    get tr() {
        return this.top;
    }

    get br() {
        return this.right;
    }

    get bl() {
        return this.bottom;
    }
}
