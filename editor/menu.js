import Vec from "../vec.js";
import {fillRoundRect, fillTextCentered, strokeRoundRect} from "../graphics.js";
import {Rect} from "../rect.js";
import Button from "../ui/button.js";
import {BrushSelection} from "./brush-selection.js";

export default class Menu {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        this.editor = editor;
        this.open = false;
        this.pos = new Vec(50, 50);
        this.size = new Vec(500, 700);
        this.children = [
            new Button(
                "Save",
                new Rect(100, 100, 200, 150),
                btn => {
                    this.editor.save();
                },
                this
            ),
            new BrushSelection(
                new Vec(10, 170),
                //new Rect(10, 170, 410, 570),
                this
            )
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
            canvas.skipGameUpdate();
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
        ctx.strokeStyle = "white";
        fillRoundRect(ctx, Rect.bySize(this.pos, this.size), 30);
        strokeRoundRect(ctx, Rect.bySize(this.pos, this.size), 30);
        ctx.fillStyle = "white";
        fillTextCentered(ctx, "Tileset", this.pos.add(0, 20), this.size.x);


        if (this.open) {
            this.children.forEach(child => child.render(canvas));
        }
    }

}