import {Tileset} from "./tileset.js";
import Vec from "../vec.js";
import {Tile} from "./tile.js";

export class Ground extends Tileset {
    constructor() {
        super('ground');
        const data = [
            [0, 0, 'ground'],
            [1, 0, 'ground'],
            [2, 0, 'ground'],
            [3, 0, 'ground'],
            [4, 0, 'ground'],
            [5, 0, 'ground'],
            [6, 0, 'ground'],
            [7, 0, 'ground'],
            [8, 0, 'ground'],
            [9, 0, 'ground'],
            [0, 1, 'ground'],
            [1, 1, 'ground'],
            [2, 1, 'ground'],
            [3, 1, 'ground'],
            [4, 1, 'ground'],
            [5, 1, 'ground'],
            [6, 1, 'ground'],
            [7, 1, 'ground'],
            [8, 1, 'ground'],
            [9, 1, 'ground'],
            [0, 2, 'ground'],
            [1, 2, 'ground'],
            [2, 2, 'ground'],
            //[3, 2, 'ground'],
            [4, 2, 'ground'],
            [5, 2, 'ground'],
            [6, 2, 'ground'],
            [7, 2, 'ground'],
            [8, 2, 'ground'],
            [9, 2, 'ground'],
            [0, 3, 'ground'],
            [1, 3, 'ground'],
            [2, 3, 'ground'],
            //[3, 3, 'ground'],
            [4, 3, 'ground'],
            [5, 3, 'ground'],
            [6, 3, 'ground'],
            [7, 3, 'ground'],
            [8, 3, 'ground'],
            [9, 3, 'ground'],
            [0, 4, 'ground'],
            [1, 4, 'ground'],
            [2, 4, 'ground'],
            //[3, 4, 'ground'],
            [4, 4, 'ground'],
            [5, 4, 'ground'],
            [6, 4, 'ground'],
            [7, 4, 'ground'],
            [8, 4, 'ground'],
            [9, 4, 'ground'],
            [0, 5, 'ground'],
            [1, 5, 'ground'],
            [2, 5, 'ground'],
            //[3, 5, 'ground'],
            [4, 5, 'ground'],
            [5, 5, 'ground'],
            [6, 5, 'ground'],
            [7, 5, 'ground'],
            [8, 5, 'ground'],
            [9, 5, 'ground'],
        ];
        this.tiles = new Map(data.map(([x, y, type]) => {
            const pos = new Vec(x,y).scale(this.size);

            return [pos.toString(), new Tile(pos, type)];
        }));
    }
}