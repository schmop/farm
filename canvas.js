import Vec from './vec.js';
import {Input} from "./input.js";
import {KeyHandler} from "./key-handler.js";
import {Camera} from "./camera.js";
import {AssetRepository} from "./asset-repository.js";
import {Tilemap} from "./map/tilemap.js";
import {Ground} from "./map/ground.js";
import Editor from "./editor/editor.js";
import {Brush} from "./editor/brush.js";
import {PipetteTool} from "./editor/pipette-tool.js";

class Canvas {
    static get LAYER_BACKGROUND() {
        return 0;
    }

    static get LAYER_SCENE() {
        return 1;
    }

    static get LAYER_OVERLAY() {
        return 2;
    }

    static get LAYER_UI() {
        return 3;
    }

    constructor(element) {
        this.canvas = element;
        this.tickNum = 0;
        this.objects = [];
        this.uiObjects = [];
        this.skipUpdate = false;
        this.input = new Input(this);
        this.camera = new Camera(this);
        this.resetCanvas();
        this.add(this.camera);
        this.assets = new AssetRepository();
    }

    get biggerDimension() {
        return Math.max(this.width, this.height);
    }

    get center() {
        return new Vec(this.width, this.height).half();
    }

    resetCanvas() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.camera.applyTransformation();
        console.log("reset to", this.width, this.height);
    }

    init() {
        window.addEventListener('resize', this.resetCanvas.bind(this));

        this.tick();
    }

    add(object, layer = this.constructor.LAYER_BACKGROUND) {
        object.layer = layer;
        if (layer === this.constructor.LAYER_UI) {
            this.uiObjects.push(object);
            return;
        }

        this.objects.push(object);
        this.objects.sort((a,b) => a.layer - b.layer);
    }

    remove(object) {
        if (typeof object.onRemove === 'function') {
            object.onRemove(this);
        }
        this.objects = this.objects.filter(obj => obj !== object);
        this.uiObjects = this.uiObjects.filter(obj => obj !== object);
    }

    tick() {
        const cameraView = this.camera.view();
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(cameraView.x, cameraView.y, cameraView.width, cameraView.height);

        this.skipUpdate = false;

        this.uiObjects.some(object => {
            if (typeof object.update === 'function') {
                return object.update(this);
            }

            return true;
        });

        if (!this.skipUpdate) {
            this.objects.forEach(object => {
                if (typeof object.update === 'function') {
                    object.update(this);
                }
            });
        }

        this.objects.forEach(object => {
            if (typeof object.render === 'function') {
                object.render(this);
            }
        });

        this.camera.withoutTransform(() => {
            this.uiObjects.forEach(object => {
                if (typeof object.render === 'function') {
                    object.render(this);
                }
            });
        });
        this.input.update(this);

        this.tickNum++;
        requestAnimationFrame(this.tick.bind(this));
    }

    skipGameUpdate() {
        this.skipUpdate = true;
    }

    closestObject(pos, constraint = null) {
        let selected = null;
        this.objects.forEach(object => {
            if (!(object.pos instanceof Vec) || (typeof constraint === 'function' && !constraint(object))) {
                return;
            }
            if (null == selected || object.pos.distance(pos) < selected.pos.distance(pos)) {
                selected = object;
            }
        });

        return selected;
    }

    colorToString(color) {
        if (color instanceof CanvasGradient) {
            return color;
        }
        return "rgb(" + color.join(', ') + ")";
    }

    complementaryColor(color) {
        return [255 - color[0], 255 - color[1], 255 - color[2]];
    }

    randomColor() {
        return Array(3).fill(null).map(() => Math.floor(Math.random() * 255));
    }
}

window.Canvas = new Canvas(document.getElementById("mieps"));

window.Canvas.add(new KeyHandler());

const tilemap = new Tilemap(new Ground());
const brush = new Brush([tilemap.tileset.randomTile()], 1);
const editor = new Editor(tilemap, brush);
const pipette = new PipetteTool(editor);
window.Canvas.add(brush, Canvas.LAYER_OVERLAY);
window.Canvas.add(pipette, Canvas.LAYER_OVERLAY);
window.Canvas.add(editor, Canvas.LAYER_UI);
window.Canvas.add(tilemap, Canvas.LAYER_SCENE);

window.Canvas.init();

