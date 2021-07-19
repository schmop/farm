import Vec from "./vec.js";

export class Input {
    constructor(camera) {
        this.camera = camera;
        this.keydowns = new Set();
        this.keypresses = new Set();
        this._mousePos = new Vec();
        document.addEventListener('keydown', event => {
            this.keydowns.add(event.key);
            this.keypresses.add(event.key);
        });
        document.addEventListener('keyup', event => {
            this.keydowns.delete(event.key);
        });
        document.addEventListener('mousemove', event => {
            this._mousePos = new Vec(event.clientX, event.clientY);
        })
    }

    /**
     * @param {Canvas} canvas
     */
    update(canvas) {
        this.keypresses.clear();
    }

    keydown(key) {
        return this.keydowns.has(key);
    }

    keypressed(key) {
        return this.keypresses.has(key);
    }

    get mousePos() {
        return this._mousePos
    }

    get mouseWorldPos() {
        return this._mousePos.scale(1 / this.camera.zoom).add(this.camera.pos);
    }

    onClick(callback) {
        document.addEventListener('click', callback);
    }

    onWheel(callback) {
        document.addEventListener('wheel', callback);
    }
}