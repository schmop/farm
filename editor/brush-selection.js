import {Rect} from "../rect.js";
import Vec from "../vec.js";

export class BrushSelection {
    constructor(pos, parent = null) {
        this._pos = pos;
        this.parent = parent;
        this.selection = null;
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

    spritePosByScreenPos(screenPos) {
        return screenPos.sub(this.pos).floor(this.blocksize);
    }

    /**
     * @param {Canvas} canvas
     */
    update(canvas) {
        const {input} = canvas;

        if (!input.rightMouseDown && this.selection) {
            let selectionTo = this.spritePosByScreenPos(input.mousePos);
            if (selectionTo) {
                const smallestDimensions = new Vec(
                        Math.min(this.selection.x, selectionTo.x),
                        Math.min(this.selection.y, selectionTo.y)
                    )
                    .scale(1 / this.blocksize)
                ;
                const biggestDimensions = new Vec(
                        Math.max(this.selection.x, selectionTo.x),
                        Math.max(this.selection.y, selectionTo.y)
                    )
                    .scale(1 / this.blocksize)
                ;
                let tiles = [];
                for (let y = smallestDimensions.y; y <= biggestDimensions.y; y++) {
                    for (let x = smallestDimensions.x; x <= biggestDimensions.x; x++) {
                        tiles.push(this.tileset.getTileBySpritePos(new Vec(x, y).scale(this.blocksize)));
                    }
                }
                this.brush.setTiles(tiles, biggestDimensions.x - smallestDimensions.x + 1);
            }
            this.selection = null;
        } else if (input.rightMousePressed && !this.selection) {
            this.selection = this.spritePosByScreenPos(input.mousePos);
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
            if (!this.selection && Rect.bySize(renderPos, new Vec(this.blocksize, this.blocksize)).contains(input.mousePos)) {
                ctx.fillStyle = "white";
                ctx.strokeRect(renderPos.x, renderPos.y, this.blocksize, this.blocksize);
            }
        });

        if (this.selection) {
            let selectionTo = this.spritePosByScreenPos(input.mousePos);
            const smallestDimensions = new Vec(
                    Math.min(this.selection.x, selectionTo.x),
                    Math.min(this.selection.y, selectionTo.y)
                )
                .add(this.pos)
            ;
            const selectionSize = new Vec(
                    Math.max(this.selection.x, selectionTo.x),
                    Math.max(this.selection.y, selectionTo.y)
                )
                .add(this.pos)
                .add(this.blocksize, this.blocksize)
                .sub(smallestDimensions)
            ;
            ctx.strokeStyle = "white";
            ctx.strokeRect(smallestDimensions.x, smallestDimensions.y, selectionSize.x, selectionSize.y);
        }
    }
}