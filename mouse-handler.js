export class MouseHandler {
    /**
     * @param {Canvas} canvas
     */
    constructor(canvas) {
        const {input, camera} = canvas;
        input.onClick(event => {
            camera.lockToObj(canvas.closestObject(input.mouseWorldPos));
        });

        input.onWheel(event => {
            const scale = -Math.sign(event.deltaY) * 0.1;
            const mousePos = input.mousePos.clone();
            camera.zoomBy(scale, mousePos);
        });
    }
}
