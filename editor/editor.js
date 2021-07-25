import {Brush} from "./brush.js";
import {Grid} from "../map/grid.js";
import Menu from "./menu.js";
import Vec from "../vec.js";
import {PipetteTool} from "./pipette-tool.js";

export default class Editor {
    /**
     * @param {Tilemap} map
     * @param {Brush} brush
     */
    constructor(map, brush) {
        this.map = map;
        this.brush = brush;
        this.menu = new Menu(this);
        this.selection = null;
        this.children = [
            new PipetteTool(this),
            this.menu,
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
        pos = Grid.toGrid(pos);
        for (let x = -Math.floor(this.brush.width / 2); x < this.brush.width; x++) {
            for (let y = -Math.floor(this.brush.height / 2); x < this.brush.width; x++) {
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