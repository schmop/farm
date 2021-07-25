import {Rect} from "../rect.js";
import Vec from "../vec.js";

export class BrushSelection {
    constructor(pos, parent = null) {
        this._pos = pos;
        this.parent = parent;
    }

    get pos() {
        if (this.parent) {
            return this.parent.pos.add(this._pos);
        }

        return this._pos;
    }

    get brush() {
        return this.parent.editor.brush;
    }

    get tileset() {
        return this.parent.editor.map.tileset;
    }

    get blocksize() {
        return this.tileset.size;
    }

    /**
     * @param {Canvas} canvas
     */
    update(canvas) {
        const {input} = canvas;

        if (input.mousePressed) {
            this.tileset.tiles.forEach(tile => {
                const renderPos = this.pos.add(tile.spritePos);
                if (Rect.bySize(renderPos, new Vec(this.blocksize, this.blocksize)).contains(input.mousePos)) {
                    this.brush.setTiles([tile], 1);
                }
            });
        }
    }

    /**
     * @param {Canvas} canvas
     */
    render(canvas) {
        const {input, ctx} = canvas;
        this.tileset.tiles.forEach(tile => {
            const renderPos = this.pos.add(tile.spritePos);
            tile.render(canvas, renderPos);
            if (Rect.bySize(renderPos, new Vec(this.blocksize, this.blocksize)).contains(input.mousePos)) {
                ctx.fillStyle = "white";
                ctx.strokeRect(renderPos.x, renderPos.y, this.blocksize, this.blocksize);
            }
        });
    }
}