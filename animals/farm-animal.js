import Vec from "../vec.js";
import {fillCircle} from "../graphics.js";

export class FarmAnimal {
    constructor(pos, color = null) {
        this.pos = pos.clone();
        this.path = [];
        this.direction = new Vec(0,0);
        this.lookDirection = 'down';
        this.animationIndex = 0;
        this.color = color || this.getRandomColor();
    }

    get SPRITE_SET() {
        return '';
    }

    get speed() {
        return 1;
    }

    get size() {
        return 32;
    }

    get COLLISION_SIZE() {
        return 16;
    }

    get ANIMATION_WAIT() {
        return 40;
    }

    get COLOR_OFFSET() {
        return {};
    }

    get OFFSET_SIZE() {
        return new Vec(96, 128);
    }

    get DOWN_WALKING() {
        return [
            new Vec(0, 0),
            new Vec(1, 0),
            new Vec(2, 0),
            new Vec(1, 0)
        ];
    }

    get DOWN_STANDING() {
        return [new Vec(1, 0)];
    }

    get LEFT_WALKING() {
        return [
            new Vec(0, 1),
            new Vec(1, 1),
            new Vec(2, 1)
        ];
    }

    get LEFT_STANDING() {
        return [new Vec(1, 1)];
    }

    get RIGHT_WALKING() {
        return [
            new Vec(0, 2),
            new Vec(1, 2),
            new Vec(2, 2)
        ];
    }

    get RIGHT_STANDING() {
        return [new Vec(1, 2)];
    }

    get UP_WALKING() {
        return [
            new Vec(0, 3),
            new Vec(1, 3),
            new Vec(2, 3),
            new Vec(1, 3)
        ];
    }

    get UP_STANDING() {
        return [new Vec(1, 3)];
    }

    /**
     * @param {Canvas} canvas
     */
    update(canvas) {
        if (!this.path.length) {
            if (Math.random() * 10000 < 1) {
                const randX = Math.random() * 500 - 250;
                const randY = Math.random() * 500 - 250;
                this.setGoal(this.pos.add(randX, randY));
            }

            return;
        }

        const [nextStep, ] = this.path;
        if (nextStep.distance(this.pos) < this.size) {
            this.path.splice(0, 1);
            if (this.path.length === 0) {
                this.direction = new Vec();

                return;
            }
        }
        this.direction = nextStep.sub(this.pos).normalize();
        this.pos = this.pos.add(this.direction.scale(this.speed));
    }

    /**
     * @param {Canvas} canvas
     */
    render(canvas) {
        const {ctx, assets} = canvas;

        this.updateLookDirection();

        if (canvas.tickNum % this.ANIMATION_WAIT === 0) {
            this.animationIndex++;
        }

        const spritePosition = this.getSpritePosition();
        const renderPos = this.pos.sub(this.size / 2, this.size / 2);

        ctx.drawImage(
            assets.get(this.SPRITE_SET),
            spritePosition.x,
            spritePosition.y,
            this.size,
            this.size,
            renderPos.x,
            renderPos.y,
            this.size,
            this.size
        );

        /*this.path.forEach(pos => {
            fillCircle(ctx, pos, 1);
        });*/
    }

    setGoal(goal) {
        this.path = this.createPath(this.pos, goal);
    }

    createPath(from, to) {
        let pos = from.clone();
        const path = [];
        while (pos.distance(to) > this.size) {
            const upVector = new Vec(0, 1).normalize();
            const angle = Math.floor(upVector.clockwiseAngleBetween(to.sub(pos)) * 2 / Math.PI) * Math.PI / 2;
            const direction = upVector.rotate(angle);
            pos = pos.add(direction.scale(this.size));
            path.push(pos);
        }

        return path;
    }

    getSpritePosition() {
        const spritePositions = this.spritePositionsByLookDirection();

        return spritePositions[this.animationIndex % spritePositions.length]
            .scale(this.size)
            .add(this.COLOR_OFFSET[this.color].mult(this.OFFSET_SIZE))
        ;
    }

    spritePositionsByLookDirection() {
        const walking = this.direction.length() > 0.1;
        switch (this.lookDirection) {
            case 'up':
                return walking ? this.UP_WALKING : this.UP_STANDING;
            case 'down':
                return walking ? this.DOWN_WALKING : this.DOWN_STANDING;
            case 'left':
                return walking ? this.LEFT_WALKING : this.LEFT_STANDING;
            case 'right':
                return walking ? this.RIGHT_WALKING : this.RIGHT_STANDING;
        }
    }

    updateLookDirection() {
        if (this.direction.length() < 0.1) {
            return;
        }
        let angle = this.direction.clockwiseAngleBetween(-1, 1);
        if (angle < 0) {
            angle += Math.PI * 2;
        }
        if (0 <= angle && angle < Math.PI / 2) {
            this.lookDirection = 'down';
        }
        if (Math.PI / 2 <= angle && angle < Math.PI) {
            this.lookDirection = 'right';
        }
        if (Math.PI <= angle && angle < Math.PI * 3 / 2) {
            this.lookDirection = 'up';
        }
        if (Math.PI * 3 / 2 <= angle && angle < Math.PI * 2) {
            this.lookDirection = 'left';
        }
    }

    getRandomColor() {
        const colors = Object.keys(this.COLOR_OFFSET);

        return colors[Math.floor(Math.random() * colors.length)];
    }
}