import {fillRoundRect, fillTextCentered} from "../graphics.js";
import Vec from "../vec.js";
import Colors from "./colors.js";

export default class Button {
    /**
     * @param {string} label
     * @param {Rect} rect
     * @param {Function} onclick
     * @param {Object} parent
     */
    constructor(label, rect, onclick, parent = null) {
        this._rect = rect;
        this.label = label;
        this.onclick = onclick;
        this.parent = parent;
        this.clicked = false;
        this.hovered = false;
    }

    get rect() {
        if (!this.parent) {
            return this._rect;
        }

        return this._rect.translate(this.parent.pos);
    }

    /**
     * @param {Canvas} canvas
     */
    update({input}) {
        this.hovered = this.rect.contains(input.mousePos);
        if (this.hovered && input.mousePressed) {
            this.clicked = true;
        }
        if (!input.mouseDown) {
            if (this.clicked && this.hovered) {
                this.onclick(this);
            }
            this.clicked = false;
        }
    }


    /**
     * @param {Canvas} canvas
     */
    render({ctx}) {
        ctx.fillStyle = (this.clicked && Colors.BG_ACTIVE)
            || (this.hovered && Colors.BG_HOVER)
            || Colors.BG
        ;
        fillRoundRect(ctx, this.rect, 10);
        ctx.fillStyle = Colors.TEXT;
        fillTextCentered(
            ctx,
            this.label,
            new Vec(this.rect.left, this.rect.top + this.rect.height / 2),
            this.rect.width
        );
    }
}