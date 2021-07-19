import {Beaver} from "./animals/beaver.js";
import Vec from "./vec.js";
import {drawImageRotated} from "./graphics.js";

export class Wolf {
    constructor(pos) {
        this.pos = pos.clone();
        this.dir = new Vec(1, 0);
        this.state = 'idle';
        this.frame = 0;
    }

    get SNACK_RANGE() {
        return this.COLLISION_SIZE;
    }

    get speed() {
        return 0.8;
    }

    get WALKING_FRAME_POSITIONS() {
        return [
            new Vec(0, 192),
            new Vec(32, 192),
            new Vec(64, 192),
            new Vec(96, 192),
            new Vec(128, 192),
        ];
    }

    get IDLE_FRAME_POSITIONS() {
        return [
            new Vec(0, 0),
            new Vec(32, 0),
            new Vec(64, 0),
            new Vec(96, 0),
            new Vec(128, 0),
        ];
    }

    get COLLISION_SIZE() {
        return 32;
    }

    get frameWidth() {
        return 32;
    }

    get frameHeight() {
        return 64;
    }

    get ANIMATION_WAIT() {
        return 20;
    }
    /**
     * @param {Canvas} canvas
     */
    update(canvas) {
        const beaver = canvas.closestObject(this.pos, obj => obj instanceof Beaver);
        if (!beaver) {
            this.state = 'idle';
            return;
        }
        if (this.pos.distance(beaver.pos) < this.SNACK_RANGE) {
            canvas.remove(beaver);
        }
        this.dir = this.dir.steer(beaver.pos.sub(this.pos), 0.1);
        this.pos = this.pos.add(this.dir.scale(this.speed));
        canvas.objects.forEach(object => {
            if (this !== object && typeof object.COLLISION_SIZE === 'number' && !(object instanceof Beaver)) {
                const collisionRadius = this.COLLISION_SIZE + object.COLLISION_SIZE;
                if (this.pos.distance(object.pos) < collisionRadius) {
                    this.pos = object.pos.add(object.pos.sub(this.pos).normalize().scale(-collisionRadius));
                }
            }
        });
        this.state = 'walking';
    }

    /**
     * @param {Canvas} canvas
     */
    render(canvas) {
        const {ctx, assets} = canvas;
        const renderPos = this.pos.sub(this.frameWidth / 2, this.frameHeight / 2);

        if (canvas.tickNum % this.ANIMATION_WAIT === 0) {
            this.frame++;
        }
        let framePos = null;
        if (this.state === 'walking') {
            framePos = this.WALKING_FRAME_POSITIONS[this.frame % this.WALKING_FRAME_POSITIONS.length];
        } else if (this.state === 'idle') {
            framePos = this.IDLE_FRAME_POSITIONS[this.frame % this.IDLE_FRAME_POSITIONS.length];
        }
        if (null != framePos) {
            drawImageRotated(
                ctx,
                assets.get('wolf'),
                -this.dir.clockwiseAngleBetween(new Vec(0, 1)),
                framePos.x,
                framePos.y,
                this.frameWidth,
                this.frameHeight,
                renderPos.x,
                renderPos.y,
                this.frameWidth,
                this.frameHeight
            );
        }
    }
}