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
            const selectionTo = Grid.snap(input.mouseWorldPos);
            const smallestDimensions = Grid.toGrid(Vec.minBounds(this.selection, selectionTo));
            const biggestDimensions = Grid.toGrid(Vec.maxBounds(this.selection, selectionTo));
            let tiles = [];
            for (let y = smallestDimensions.y; y <= biggestDimensions.y; y++) {
                for (let x = smallestDimensions.x; x <= biggestDimensions.x; x++) {
                    tiles.push(this.editor.map.getBlock(new Vec(x, y)));
                }
            }
            this.editor.brush.setTiles(tiles, biggestDimensions.x - smallestDimensions.x + 1);
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

            const selectionTo = Grid.snap(input.mouseWorldPos);
            const smallestDimensions = Grid.snap(Vec.minBounds(this.selection, selectionTo));
            const selectionSize = Grid.snap(Vec.maxBounds(this.selection, selectionTo))
                .add(Grid.size, Grid.size)
                .sub(smallestDimensions)
            ;
            ctx.strokeStyle = "white";
            ctx.strokeRect(smallestDimensions.x, smallestDimensions.y, selectionSize.x, selectionSize.y);
        }
    }
}