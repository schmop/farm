import {Grid} from "./grid.js";

export class Tile {
    constructor(tileset, spritePos, type) {
        this.tileset = tileset;
        this.spritePos = spritePos;
        this.type = type;
    }

    /**
     * @param {Canvas} canvas
     * @param {Vec} pos
     */
    render(canvas, pos) {
        const {ctx, assets} = canvas;
        ctx.drawImage(
            assets.get(this.tileset.getAsset()),
            this.spritePos.x,
            this.spritePos.y,
            this.tileset.size,
            this.tileset.size,
            pos.x,
            pos.y,
            Grid.size,
            Grid.size
        );
    }
}