import {Beaver} from "./animals/beaver.js";
import {Projectile} from "./projectile.js";

export class Tower {
    constructor(pos) {
        this.pos = pos;
        this.level = 0;
        this.reloadTimer = Infinity;
    }

    get reloadSpeed() {
        return 200;
    }

    get range() {
        return 600;
    }

    get frameWidth() {
        return 32;
    }

    get frameHeight() {
        return 64;
    }

    /**
     * @param {Canvas} canvas
     */
    update(canvas) {
        if (this.reloadTimer++ < this.reloadSpeed) {
            return;
        }
        const beaver = canvas.closestObject(this.pos, obj => obj instanceof Beaver);
        if (!beaver) {
            return;
        }
        if (this.pos.distance(beaver.pos) < this.range) {
            canvas.add(new Projectile(this.pos, beaver));
        }
        this.reloadTimer = 0;
    }

    /**
     * @param {Canvas} canvas
     */
    render(canvas) {
        const {ctx, assets} = canvas;
        const renderPos = this.pos.sub(this.frameWidth / 2, this.frameHeight / 2);
        ctx.drawImage(assets.get('wolf'), 0, 0, this.frameWidth, this.frameHeight, renderPos.x, renderPos.y, this.frameWidth, this.frameHeight);
    }
}