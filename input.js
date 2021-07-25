import Vec from "./vec.js";

export class Input {
    constructor(canvas) {
        this.keydowns = new Set();
        this.keypresses = new Set();
        this._mousePos = new Vec();
        this._mouseDown = false;
        this._mousePressed = false;
        this._rightMouseDown = false;
        this._rightMousePressed = false;
        this.canvas = canvas;

        document.addEventListener('keydown', event => {
            this.keydowns.add(event.key);
            this.keypresses.add(event.key);
            if (event.key === 'Tab') {
                event.preventDefault();
            }
        });
        document.addEventListener('keyup', event => {
            this.keydowns.delete(event.key);
        });
        document.addEventListener('mousemove', event => {
            this._mousePos = new Vec(event.clientX, event.clientY);
        });
        document.addEventListener('mouseup', event => {
            if (event.button === 0) {
                this._mouseDown = false;
            } else if (event.button === 2) {
                this._rightMouseDown = false;
            }
        });
        document.addEventListener('mousedown', event => {
            if (event.button === 0) {
                this._mouseDown = true;
                this._mousePressed = true;
            } else if (event.button === 2) {
                this._rightMouseDown = true;
                this._rightMousePressed = true;
                event.preventDefault();
            }
        });
        document.addEventListener('contextmenu', event => {
            event.preventDefault();
        });
    }

    /**
     * @param {Canvas} canvas
     */
    update(canvas) {
        this.keypresses.clear();
        this._mousePressed = false;
        this._rightMousePressed = false;
    }

    keydown(key) {
        return this.keydowns.has(key);
    }

    keypressed(key) {
        return this.keypresses.has(key);
    }

    get mousePos() {
        return this._mousePos;
    }

    get mouseWorldPos() {
        return this._mousePos
            .scale(1 / this.canvas.camera.zoom)
            .add(this.canvas.camera.pos)
        ;
    }

    get mouseDown() {
        return this._mouseDown;
    }

    get mousePressed() {
        return this._mousePressed;
    }

    get rightMouseDown() {
        return this._rightMouseDown;
    }

    get rightMousePressed() {
        return this._rightMousePressed;
    }

    onClick(callback) {
        document.addEventListener('click', callback);
    }

    onWheel(callback) {
        document.addEventListener('wheel', callback);
    }
}