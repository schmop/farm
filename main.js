import {KeyHandler} from "./key-handler.js";
import {TileLayer} from "./map/tile-layer.js";
import {Ground} from "./map/ground.js";
import Editor from "./editor/editor.js";
import {PipetteTool} from "./editor/pipette-tool.js";
import {Canvas} from "./canvas.js";
import MapLoader from "./map/map-loader.js";
import GameMap from "./map/game-map.js";

window.Canvas = new Canvas(document.getElementById("game"));

window.Canvas.add(new KeyHandler());

(async () => {
    let map;
    try {
        const textResult = await (await fetch('./myMap.json')).json();
        console.log(textResult);
        map = MapLoader.load(textResult);
    } catch (e) {
        map = new GameMap();
        map.addLayer(new TileLayer(new Ground()));
    }

    const editor = new Editor(window.Canvas, map);
    const pipette = new PipetteTool(editor);
    window.Canvas.add(pipette, Canvas.LAYER_OVERLAY);
    window.Canvas.add(editor, Canvas.LAYER_UI);
    window.Canvas.add(map, Canvas.LAYER_SCENE);

    window.Canvas.init();
})();