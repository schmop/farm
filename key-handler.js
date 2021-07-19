import Vec from "./vec.js";
import {Chick} from "./animals/chick.js";
import {Chicken} from "./animals/chicken.js";
import {Cow} from "./animals/cow.js";

export class KeyHandler {
    get speed() {
        return 3;
    }

    /**
     * @param {Canvas} canvas
     */
    update(canvas) {
        const {input, camera} = canvas;
        const dirs = {
            'ArrowLeft': new Vec(-1, 0),
            'ArrowRight': new Vec(1, 0),
            'ArrowUp': new Vec(0, -1),
            'ArrowDown': new Vec(0, 1),
        };
        let movement = new Vec();
        for (let [key, dir] of Object.entries(dirs)) {
            if (input.keydown(key)) {
                movement = movement.add(dir);
            }
        }
        camera.moveBy(movement.scale(-this.speed));

        if (input.keydown('Escape')) {
            camera.unlock();
        }

        if (input.keypressed('1')) {
            canvas.objects.forEach(chick => {
                if (chick instanceof Chick || chick instanceof Chicken) {
                    chick.setGoal(input.mouseWorldPos);
                }
            })
        }
        if (input.keypressed('2')) {
            canvas.add(new Chick(input.mouseWorldPos), 1);
        }
        if (input.keypressed('3')) {
            canvas.add(new Chicken(input.mouseWorldPos), 1);
        }
        if (input.keypressed('4')) {
            canvas.add(new Cow(input.mouseWorldPos), 1);
        }
    }
}