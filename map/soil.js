import {Tileset} from "./tileset.js";
import Vec from "../vec.js";
import {Tile} from "./tile.js";
import {Grid} from "./grid.js";

export class Soil extends Tileset {
    constructor() {
        super('plowed_soil');
        const data = [
            [0, 0, 'ground'],
            [1, 0, 'ground'],
            [2, 0, 'ground'],
            [0, 1, 'ground'],
            [1, 1, 'ground'],
            [2, 1, 'ground'],
            [0, 2, 'ground'],
            [1, 2, 'ground'],
            [2, 2, 'ground'],
            [0, 3, 'ground'],
            [1, 3, 'ground'],
            [2, 3, 'ground'],
            [0, 4, 'ground'],
            [1, 4, 'ground'],
            [2, 4, 'ground'],
            [0, 5, 'ground'],
            [1, 5, 'ground'],
            [2, 5, 'ground'],
        ];
        this.tiles = new Map(data.map(([x, y, type]) => {
            const pos = new Vec(x,y).scale(Grid.size);

            return [pos.toString(), new Tile(pos, type)];
        }));
    }
}