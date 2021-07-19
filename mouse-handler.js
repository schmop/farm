import {Grid} from "./map/grid.js";

export class MouseHandler {
    /**
     * @param {Canvas} canvas
     */
    constructor(canvas) {
        const {input, camera} = canvas;
        input.onClick(event => {
            canvas.tilemap.setBlock(Grid.toGrid(input.mouseWorldPos), canvas.tilemap.tileset.randomTile());
        });

        input.onWheel(event => {
            const scale = -Math.sign(event.deltaY) * 0.1;
            const mousePos = input.mousePos.clone();
            camera.zoomBy(scale, mousePos);
        });
    }
}
