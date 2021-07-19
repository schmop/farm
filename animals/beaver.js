import {Tree} from "../tree.js";
import Vec from "../vec.js";
import {drawImageRotated} from "../graphics.js";
import {Explosion} from "../explosion.js";
import {Wolf} from "../wolf.js";

export class Beaver {
    constructor(pos) {
        this.pos = pos.clone();
        this.direction = new Vec(1,0);
        this.animationIndex = 0;
    }

    get speed() {
        return 1;
    }

    get width() {
        return 26;
    }

    get height() {
        return 62;
    }

    get COLLISION_SIZE() {
        return 28;
    }

    get SCARE_DISTANCE() {
        return 60;
    }

    get SNACK_DISTANCE() {
        return 10;
    }

    get ANIMATION_WAIT() {
        return 70;
    }

    get ANIMATION_ORDER() {
        return [0, 1, 2, 1];
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
        const nearestTree = canvas.closestObject(this.pos, obj => obj instanceof Tree);
        const nearestWolf = canvas.closestObject(this.pos, obj => obj instanceof Wolf);
        if (nearestTree && nearestTree.pos.distance(this.pos) < this.SNACK_DISTANCE) {
            canvas.remove(nearestTree);
        }
        let wantedDir = null;
        if (nearestWolf && this.pos.distance(nearestWolf.pos) < this.SCARE_DISTANCE) {
            wantedDir = this.pos.sub(nearestWolf.pos).normalize();
        }
        else if (nearestTree) {
            wantedDir = nearestTree.pos.sub(this.pos);
        }
        // depression
        if (null == wantedDir) {
            return;
        }
        this.direction = this.direction.steer(wantedDir, 0.05).normalize();
        this.pos = this.pos.add(this.direction.scale(this.speed));
        canvas.objects.forEach(object => {
            if (this !== object && typeof object.COLLISION_SIZE === 'number' && !(object instanceof Wolf)) {
                const collisionRadius = this.COLLISION_SIZE + object.COLLISION_SIZE;
                if (this.pos.distance(object.pos) < collisionRadius) {
                    this.pos = object.pos.add(object.pos.sub(this.pos).normalize().scale(-collisionRadius));
                }
            }
        });
    }

    /**
     * @param {Canvas} canvas
     */
    render(canvas) {
        const {ctx, assets} = canvas;

        if (canvas.tickNum % this.ANIMATION_WAIT === 0) {
            this.animationIndex = (this.animationIndex + 1) % this.ANIMATION_ORDER.length;
        }

        drawImageRotated(
            ctx,
            assets.get(`beaver${this.ANIMATION_ORDER[this.animationIndex]}`),
            -this.direction.clockwiseAngleBetween(new Vec(0, -1)),
            this.pos.x,
            this.pos.y,
            this.width,
            this.height
        );
    }
}
