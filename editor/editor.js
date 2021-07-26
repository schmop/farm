import {Brush} from "./brush.js";
import {Grid} from "../map/grid.js";
import Menu from "./menu.js";
import Vec from "../vec.js";
import {EditorCameraControl} from "./editor-camera-control.js";

export default class Editor {
    /**
     * @param {Canvas} canvas
     * @param {Tilemap} map
     * @param {Brush} brush
     */
    constructor(canvas, map, brush) {
        this.canvas = canvas;
        this.map = map;
        this.brush = brush;
        this.menu = new Menu(this);
        this.selection = null;
        this.children = [
            this.menu,
            new EditorCameraControl(this),
        ];
    }

    /**
     * @param {Canvas} canvas
     */
    update(canvas) {
        const {input} = canvas;

        if (!this.menu.open) {
            if (input.mouseDown) {
                this.drawToPos(input.mouseWorldPos);
            }
        }

        this.children.forEach(child => child.update(canvas));
    }

    drawToPos(pos) {
        pos = Grid.toGrid(pos)
            .sub(new Vec(this.brush.width, this.brush.height)
                .half()
                .floor()
            )
        ;
        for (let x = 0; x < this.brush.width; x++) {
            for (let y = 0; y < this.brush.height; y++) {
                this.map.setBlock(pos.add(x, y), this.brush.get(x,y));
            }
        }
    }

    /**
     * @param {Canvas} canvas
     */
    render(canvas) {
        this.children.forEach(child => child.render(canvas));
    }
}