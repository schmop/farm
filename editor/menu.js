import Vec from "../vec.js";
import {fillRoundRect, fillTextCentered} from "../graphics.js";
import {Rect} from "../rect.js";

export default class Menu {
    constructor() {
        this.open = false;
        this.pos = new Vec(50, 50);
        this.size = new Vec(300, 500);
        this.children = [
            new Button(new Rect(100, 100, 200, 150), "Click me", "red"),
        ];
    }

    /**
     * @param {Canvas} canvas
     */
    update(canvas) {
        const {input} = canvas;

        if (input.keypressed("Tab")) {
            this.open = !this.open;
        }

        if (this.open) {
            this.children.forEach(child => child.update(canvas));
        }
    }

    /**
     * @param {Canvas} canvas
     */
    render(canvas) {
        if (!this.open) {
            return;
        }
        const {ctx} = canvas;
        ctx.fillStyle = "black";
        fillRoundRect(ctx, Rect.bySize(this.pos, this.size), 30);
        ctx.fillStyle = "white";
        fillTextCentered(ctx, "Tileset", this.pos.add(0, 20), this.size.x);


        if (this.open) {
            this.children.forEach(child => child.render(canvas));
        }
    }

}