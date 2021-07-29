import {Grid} from "./grid.js";

export class Tile {
    constructor(spritePos, type) {
        this.spritePos = spritePos;
        this.type = type;
    }

    /**
     * @param {Canvas} canvas
     * @param {Vec} pos
     * @param {Tileset} tileset
     */
    render(canvas, pos, tileset) {
        const {ctx, assets} = canvas;
        ctx.drawImage(
            assets.get(tileset.getAsset()),
            this.spritePos.x,
            this.spritePos.y,
            tileset.size,
            tileset.size,
            pos.x,
            pos.y,
            Grid.size,
            Grid.size
        );
    }
}