import Vec from "../vec.js";
import {Grid} from "../map/grid.js";

export class Brush {
    constructor(tiles = [], width = 0) {
        this.setTiles(tiles, width);
    }

    setTiles(tiles, width) {
        if (Math.floor(tiles.length / width) !== tiles.length / width) {
            console.error('Brush error, brush tiles must be rectangular!');
        }
        this.tiles = tiles;
        this.width = width;
    }

    get height() {
        return this.tiles.length / this.width;
    }

    get(x, y) {
        const index = this.posToIndex(x, y);

        return this.tiles[index];
    }

    posToIndex(x, y) {
        if (x instanceof Vec) {
            y = x.y;
            x = x.x;
        }

        return x + y * this.width;
    }

    indexToPos(index) {
        return new Vec(index % this.width, Math.floor(index / this.width));
    }

    /**
     * @param {Canvas} canvas
     */
    render(canvas) {
        const {input} = canvas;
        const startPos = Grid.snap(input.mouseWorldPos)
            .sub(new Vec(this.width, this.height)
                .half()
                .floor()
                .scale(Grid.size)
            )
        ;

        for (let i = 0; i < this.tiles.length; i++) {
            const tile = this.tiles[i];
            if (tile) {
                const pos = startPos.add(this.indexToPos(i).scale(tile.tileset.size));
                tile.render(canvas, pos);
            }
        }
    }
}
