import {Rect} from "./rect.js";
import Vec from "./vec.js";
import {Explosion} from "./explosion.js";

export class Tree {
    constructor(pos) {
        this.pos = pos.clone();
        this.renderPos = this.pos.sub(new Vec(this.width, this.height).half());
        this.rect = new Rect(this.renderPos.x, this.renderPos.y, this.renderPos.x + this.width, this.renderPos.y + this.height);
    }

    get width() {
        return 50;
    }

    get height() {
        return 82;
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
    render(canvas) {
        const {ctx, input, assets} = canvas;

        ctx.drawImage(assets.get('tree'), this.renderPos.x, this.renderPos.y, this.width, this.height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        if (this.rect.contains(input.mouseWorldPos)) {
            ctx.fillRect(this.renderPos.x, this.renderPos.y, this.width, this.height);
        }
    }
}
