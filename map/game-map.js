export default class GameMap {
    constructor() {
        this.layers = [];
    }

    addLayer(layer, zIndex = 0) {
        layer.zIndex = zIndex;
        this.layers.push(layer);
        this.layers.sort((a, b) => a.zIndex - b.zIndex);
    }

    getLayer(index) {
        return this.layers[index];
    }

    /**
     * @param {Canvas} canvas
     */
    update(canvas) {
        this.layers.forEach(layer => {
            if (typeof layer.update === 'function') {
                layer.update(canvas);
            }
        });
    }

    /**
     * @param {Canvas} canvas
     */
    render(canvas) {
        this.layers.forEach(layer => {
            if (typeof layer.render === 'function') {
                layer.render(canvas);
            }
        });
    }
}