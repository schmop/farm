import {Grid} from "./grid.js";

export class Tileset {
    constructor(asset) {
        this.asset = asset;
        this.tiles = new Map();
    }

    get size() {
        return Grid.size;
    }

    getAsset() {
        return this.asset;
    }

    getTileBySpritePos(spritePos) {
        return this.tiles.get(spritePos.toString());
    }

    randomTile() {
        let randomIndex = Math.floor(this.tiles.size * Math.random());
        for (const val of this.tiles.values()) {
            if ((randomIndex--) <= 0) {
                return val;
            }
        }
    }
}