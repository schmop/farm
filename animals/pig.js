import Vec from "../vec.js";
import {Explosion} from "../explosion.js";
import {FarmAnimal} from "./farm-animal.js";

export class Pig extends FarmAnimal {
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
        return 'pig';
    }

    get speed() {
        return 0.5;
    }

    get COLOR_OFFSET() {
        return {
            'type1': new Vec(0, 0),
            'type2': new Vec(0, 1),
            'type3': new Vec(1, 0),
            'type4': new Vec(1, 1),
            'type5': new Vec(2, 0),
            'type6': new Vec(2, 1),
            'type7': new Vec(3, 0),
            'type8': new Vec(3, 1),
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
