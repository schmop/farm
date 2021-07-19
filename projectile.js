export class Projectile {
    constructor(pos, target) {
        this.pos = pos;
        this.dir = target.pos.sub(pos).normalize();
        this.animationFrame = 0;
        this.target = target;
    }

    get NUM_FRAMES() {
        return 8;
    }

    get ANIMATION_WAIT() {
        return 10;
    }

    get HIT_RANGE() {
        return 10;
    }

    get size() {
        return 48;
    }

    get speed() {
        return 2;
    }

    /**
     * @param {Canvas} canvas
     */
    update(canvas) {
        if (this.pos.distance(this.target.pos) < this.HIT_RANGE) {
            canvas.remove(this.target);
            canvas.remove(this);
        }

        // homing
        this.dir = this.dir.steer(this.target.pos.sub(this.pos), 0.1);
        this.pos = this.pos.add(this.dir.scale(this.speed));
    }

    /**
     * @param {Canvas} canvas
     */
    render(canvas) {
        const {ctx, assets} = canvas;

        if (canvas.tickNum % this.ANIMATION_WAIT === 0) {
            this.animationFrame = (this.animationFrame + 1) % this.NUM_FRAMES;
        }

        const renderPos = this.pos.sub(this.size / 2, this.size / 2);
        ctx.drawImage(assets.get(`boomerang${this.animationFrame}`), 0, 0, this.size, this.size, renderPos.x, renderPos.y, this.size, this.size);
    }
}