export class Background {
    get SIZE() {
        return 128;
    }

    /**
     * @param {Canvas} canvas
     */
    render(canvas) {
        const {ctx, camera, assets} = canvas;

        const numX = camera.width / this.SIZE + 1;
        const numY = camera.height / this.SIZE + 1;
        const startPos = camera.pos.floor(this.SIZE);
        for (let i = 0; i < numX; i++) {
            for (let j = 0; j < numY; j++) {
                const pos = startPos.add(i * this.SIZE, j * this.SIZE);
                ctx.drawImage(assets.get('grass'), pos.x, pos.y, this.SIZE, this.SIZE);
            }
        }
    }
}