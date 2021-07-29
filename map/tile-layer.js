import {Grid} from "./grid.js";
import {Tile} from "./tile.js";

export class TileLayer {
    /**
     * @param {Tileset} tileset
     * @param blocks
     */
    constructor(tileset, blocks = []) {
        this.blocks = new Map(blocks);
        this.tileset = tileset;
    }

    getBlock(pos) {
        return this.blocks.get(pos.toString());
    }

    /**
     * @param {Vec} pos in grid space
     * @param {Tile} tile
     */
    setBlock(pos, tile) {
        this.blocks.set(pos.toString(), tile);
    }

    /**
     * @param {Canvas} canvas
     */
    render(canvas) {
        const {camera} = canvas;

        const numX = camera.width / Grid.size + 1;
        const numY = camera.height / Grid.size + 1;
        const startPos = Grid.toGrid(camera.pos);

        for (let i = 0; i < numX; i++) {
            for (let j = 0; j < numY; j++) {
                const pos = startPos.add(i, j);
                const block = this.blocks.get(pos.toString());
                if (block) {
                    block.render(canvas, Grid.toWorld(pos), this.tileset);
                }
            }
        }
    }
}