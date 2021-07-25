import {fillRoundRect} from "../graphics.js";

export default class Button {
    constructor(rect, label, onclick) {
        this.rect = rect;
        this.onclick = onclick;
    }

    /**
     * @param {Canvas} canvas
     */
    update({input}) {
        this.hovered = this.rect.contains(input.mousePos);
        if (this.hovered && input.onClick())
    }


    /**
     * @param {Canvas} canvas
     */
    render({ctx}) {
        fillRoundRect(ctx, this.rect, 10);

    }
}