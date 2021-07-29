import {Brush} from "./brush.js";
import {Grid} from "../map/grid.js";
import {Canvas} from '../canvas.js';
import Menu from "./menu.js";
import Vec from "../vec.js";
import {EditorCameraControl} from "./editor-camera-control.js";
import MapSaver from "../map/map-saver.js";

export default class Editor {
    /**
     * @param {Canvas} canvas
     * @param {GameMap} map
     */
    constructor(canvas, map) {
        this.canvas = canvas;
        this.map = map;
        this.activeLayer = this.map.getLayer(0);
        this.brush = new Brush(this, [this.activeLayer.tileset.randomTile()], 1);
        this.menu = new Menu(this);
        this.selection = null;
        this.children = [
            this.menu,
            new EditorCameraControl(this),
        ];

        canvas.add(this.brush, Canvas.LAYER_OVERLAY);
    }

    save() {
        MapSaver.save(this.map);
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
                this.activeLayer.setBlock(pos.add(x, y), this.brush.get(x,y));
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