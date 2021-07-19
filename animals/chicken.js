import Vec from "../vec.js";
import {Explosion} from "../explosion.js";
import {FarmAnimal} from "./farm-animal.js";

export class Chicken extends FarmAnimal {
    constructor(pos, color = null) {
        super(pos, color);
    }

    get size() {
        return 48;
    }

    get OFFSET_SIZE() {
        return new Vec(144, 192);
    }

    get SPRITE_SET() {
        return 'chicken';
    }

    get speed() {
        return 0.5;
    }

    get COLOR_OFFSET() {
        return {
            'white': new Vec(0, 0),
            'gold': new Vec(0, 1),
            'green': new Vec(1, 0),
            'brown': new Vec(1, 1),
            'black': new Vec(2, 0),
            'grey': new Vec(2, 1),
            'yellow': new Vec(3, 0),
            'orange': new Vec(3, 1),
        }
    }

    /**
     * @param {Canvas} canvas
     */
    onRemove(canvas) {
        canvas.add(new Explosion(this.pos));
    }

    /**
     * @param {Canvas} canvas
     */
    update(canvas) {
        super.update(canvas);
    }

    /**
     * @param {Canvas} canvas
     */
    render(canvas) {
        super.render(canvas);
    }
}
