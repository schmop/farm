import {Grid} from "../map/grid.js";
import Vec from "../vec.js";

export class PipetteTool {
    constructor(editor) {
        this.editor = editor;
        this.selection = null;
    }

    /**
     * @param {Canvas} canvas
     */
    update(canvas) {
        const {input} = canvas;

        if (!input.rightMouseDown && this.selection) {
            const selectionTo = input.mouseWorldPos.ceil(Grid.size);
            const smallestDimensions = new Vec(
                Math.min(this.selection.x, selectionTo.x),
                Math.min(this.selection.y, selectionTo.y)
            );
            const biggestDimensions = new Vec(
                Math.max(this.selection.x, selectionTo.x),
                Math.max(this.selection.y, selectionTo.y)
            );
            let tiles = [];
            for (let x = smallestDimensions.x; x <= biggestDimensions.x; x++) {
                for (let y = smallestDimensions.y; y <= biggestDimensions.y; y++) {
                    tiles.push(this.editor.map.getBlock(new Vec(x, y)));
                }
            }
            this.editor.brush.setTiles(tiles, biggestDimensions.x - smallestDimensions.x);
            this.selection = null;
        } else if (input.rightMousePressed && !this.selection) {
            this.selection = Grid.snap(input.mouseWorldPos);
        }
    }
    /**
     * @param {Canvas} canvas
     */
    render(canvas) {
        if (this.selection) {
            const {input, ctx} = canvas;

            let selectionTo = Grid.snap(input.mouseWorldPos).sub(this.selection);
            ctx.strokeStyle = "white";
            ctx.strokeRect(this.selection.x, this.selection.y, selectionTo.x, selectionTo.y);
        }
    }
}