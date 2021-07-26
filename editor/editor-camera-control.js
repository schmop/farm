import Vec from "../vec.js";

export class EditorCameraControl {
    constructor(editor) {
        const {input, camera} = editor.canvas;
        this.editor = editor;
        this.mouseDragPos = null;

        input.onWheel(event => {
            const scale = -Math.sign(event.deltaY) * 0.1;
            const mousePos = input.mousePos.clone();
            camera.zoomBy(scale, mousePos);
        });
    }

    get speed() {
        return 3;
    }

    get camera() {
        return this.editor.canvas.camera;
    }

    /**
     * @param {Canvas} canvas
     */
    update(canvas) {
        const {input, camera} = canvas;
        if (input.middleMouseDown) {
            if (this.mouseDragPos) {
                const newMousePos = input.mousePos;
                this.camera.moveBy(newMousePos.sub(this.mouseDragPos).scale(1 / this.camera.zoom));
                this.mouseDragPos = newMousePos;
            } else {
                this.mouseDragPos = input.mousePos;
            }
        } else {
            this.mouseDragPos = null;
        }
        const dirs = {
            'a': new Vec(-1, 0),
            'd': new Vec(1, 0),
            'w': new Vec(0, -1),
            's': new Vec(0, 1),
        };
        let movement = new Vec();
        for (let [key, dir] of Object.entries(dirs)) {
            if (input.keydown(key)) {
                movement = movement.add(dir.scale(1 / camera.zoom));
            }
        }
        camera.moveBy(movement.scale(-this.speed));
    }

    /**
     * @param {Canvas} canvas
     */
    render(canvas) {

    }
}