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
        this._middleMouseDown = false;
        this._middleMousePressed = false;
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
            } else if (event.button === 1) {
                this._middleMouseDown = false;
                this._middleMousePressed = false;
            } else if (event.button === 2) {
                this._rightMouseDown = false;
            }
        });
        document.addEventListener('mousedown', event => {
            if (event.button === 0) {
                this._mouseDown = true;
                this._mousePressed = true;
            } else if (event.button === 1) {
                this._middleMouseDown = true;
                this._middleMousePressed = true;
                event.preventDefault();
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
        this._middleMousePressed = false;
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
        return this.canvas.camera.screenToScene(this._mousePos);
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

    get middleMouseDown() {
        return this._middleMouseDown;
    }

    get middleMousePressed() {
        return this._middleMousePressed;
    }

    onClick(callback) {
        document.addEventListener('click', callback);
    }

    onWheel(callback) {
        document.addEventListener('wheel', callback);
    }
}