import GameMap from "./game-map.js";
import {Ground} from "./ground.js";
import {TileLayer} from "./tile-layer.js";
import {Tile} from "./tile.js";

export default class MapLoader {
    static get TILE_SETS() {
        return {
            'ground': Ground
        };
    }

    static load(rawMap) {
        const map = new GameMap();
        rawMap.layers.forEach(layer => {
            map.addLayer(this.hydrateLayer(layer), layer.zIndex);
        });

        return map;
    }

    static hydrateLayer(rawLayer) {
        return new TileLayer(
            new this.TILE_SETS[rawLayer.tileset],
            rawLayer.blocks.map(([index, block]) => [index, new Tile(block.spritePos, block.type)])
        );
    }
}