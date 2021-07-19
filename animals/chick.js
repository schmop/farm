import Vec from "../vec.js";
import {Explosion} from "../explosion.js";
import {FarmAnimal} from "./farm-animal.js";
import {Chicken} from "./chicken.js";

export class Chick extends FarmAnimal {
    constructor(pos) {
        super(pos);
        this.chooseRandomColor();
    }

    get SPRITE_SET() {
        return 'chick';
    }

    get speed() {
        return 0.5;
    }

    get SNACK_DISTANCE() {
        return 10;
    }

    get COLOR_OFFSET() {
        return {
            'gold': new Vec(0, 0),
            'yellow': new Vec(0, 1),
            'black': new Vec(1, 0),
            'orange': new Vec(1, 1),
            'grey': new Vec(2, 0),
            'brown': new Vec(2, 1),
            'white': new Vec(3, 0),
            'green': new Vec(3, 1),
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
        if (Math.random() * 100000 < 1) {
            canvas.remove(this);
            canvas.add(new Chicken(this.pos, this.color));
        }
    }

    /**
     * @param {Canvas} canvas
     */
    render(canvas) {
        super.render(canvas);
    }

    getSpritePosition() {
        const spritePositions = this.spritePositionsByLookDirection();

        return spritePositions[this.animationIndex % spritePositions.length]
            .scale(this.size)
            .add(this.COLOR_OFFSET[this.color].mult(this.OFFSET_SIZE))
            .add(1, 1)
        ;
    }


    chooseRandomColor() {
        const colors = Object.keys(this.COLOR_OFFSET);
        this.color = colors[Math.floor(Math.random() * colors.length)];
        console.log("Chick is " + this.color);
    }
}
