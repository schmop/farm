import Vec from './vec.js';
import {Input} from "./input.js";
import {KeyHandler} from "./key-handler.js";
import {Camera} from "./camera.js";
import {AssetRepository} from "./asset-repository.js";
import {Background} from "./background.js";
import {Tree} from "./tree.js";
import {MouseHandler} from "./mouse-handler.js";
import {Tilemap} from "./map/tilemap.js";
import {Soil} from "./map/soil.js";

class Canvas {
    static get LAYER_BACKGROUND() {
        return 0;
    }

    static get LAYER_SCENE() {
        return 1;
    }

    static get LAYER_UI() {
        return 2;
    }

    constructor(element) {
        this.canvas = element;
        this.tickNum = 0;
        this.objects = [];
        this.camera = new Camera(this);
        this.resetCanvas();
        this.add(this.camera, this.constructor.LAYER_UI);
        this.input = new Input(this.camera);
        this.assets = new AssetRepository();
        this.tilemap = new Tilemap(new Soil());
        this.add(this.tilemap, this.constructor.LAYER_SCENE);
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

        this.objects.push(object);
        this.objects.sort((a,b) => a.layer - b.layer);
    }

    remove(object) {
        if (typeof object.onRemove === 'function') {
            object.onRemove(this);
        }
        this.objects = this.objects.filter(obj => obj !== object);
    }

    tick() {
        const cameraView = this.camera.view();
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(cameraView.x, cameraView.y, cameraView.width, cameraView.height);

        this.objects.forEach(object => {
            if (typeof object.update === 'function') {
                object.update(this);
            }
        });

        this.objects.forEach(object => {
            if (typeof object.render === 'function') {
                object.render(this);
            }
        });

        this.input.update(this);

        this.tickNum++;
        requestAnimationFrame(this.tick.bind(this));
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
window.Canvas.add(new Background(), Canvas.LAYER_BACKGROUND);
[...Array(60)].forEach(() => {
    window.Canvas.add(new Tree(new Vec(Math.random() * 2000 - 500, Math.random() * 2000 - 500)));
});
window.Canvas.add(new KeyHandler());

window.Canvas.add(new MouseHandler(window.Canvas));

window.Canvas.init();

