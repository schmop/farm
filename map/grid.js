import Vec from "../vec.js";

export class Grid {
    static get size() {
        return 32;
    }

    static snap(pos) {
        return pos.floor(this.size);
    }

    static toGrid(pos) {
        return new Vec(
            Math.floor(pos.x / this.size),
            Math.floor(pos.y / this.size)
        );
    }

    static toWorld(pos) {
        return pos.scale(this.size);
    }
}