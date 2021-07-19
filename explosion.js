import Vec from "./vec.js";

export class Explosion {
    constructor(pos) {
        this.pos = pos.sub(this.frame_size / 2, this.frame_size / 2);
        this.animationIndex = 0;
    }

    get width() {
        return 512;
    }

    get height() {
        return 256;
    }

    get frame_size() {
        return 64;
    }

    get frames_per_row() {
        return Math.floor(this.width / this.frame_size);
    }

    get FRAME_NUM() {
        return 24;
    }

    get FRAME_DURATION() {
        return 10;
    }

    /**
     * @param {Canvas} canvas
     */
    update(canvas) {
        if (this.animationIndex >= this.FRAME_NUM) {
            canvas.remove(this);
        }
    }

    /**
     * @param {Canvas} canvas
     */
    render(canvas) {
        const {ctx, assets} = canvas;

        if (canvas.tickNum % this.FRAME_DURATION === 0) {
            this.animationIndex++;
        }
        const posInTexture = (new Vec(this.animationIndex % this.frames_per_row, Math.floor(this.animationIndex / this.frames_per_row))).scale(this.frame_size);
        ctx.drawImage(
            assets.get('explosion'),
            posInTexture.x,
            posInTexture.y,
            this.frame_size,
            this.frame_size,
            this.pos.x,
            this.pos.y,
            this.frame_size,
            this.frame_size
        );
    }


}