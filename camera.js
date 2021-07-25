import Vec from "./vec.js";
import {Rect} from "./rect.js";

export class Camera {
    constructor(canvas) {
        this.canvas = canvas;
        this.zoom = 1;
        this.pos = new Vec(0, 0);
        this.rotateAngle = 0;
        this.lockedObject = null;
    }

    get ctx() {
        return this.canvas.ctx;
    }

    get width() {
        return this.canvas.width / this.zoom;
    }

    get height() {
        return this.canvas.height / this.zoom;
    }

    applyTransformation() {
        this.resetTransform();
        this.ctx.scale(this.zoom, this.zoom);
        //this.ctx.rotate(this.rotateAngle);
        this.ctx.translate(-this.pos.x, -this.pos.y);
    }

    resetTransform() {
        this.ctx.resetTransform();
    }

    withoutTransform(callback) {
        this.resetTransform();
        callback();
        this.applyTransformation();
    }

    view() {
        return new Rect(
            this.pos.x,
            this.pos.y,
            this.width + this.pos.x,
            this.height + this.pos.y
        );
    }

    /**
     * @param {Vec} pos
     */
    moveTo(pos) {
        this.ctx.translate(this.pos.x - pos.x , this.pos.y - pos.y);
        this.pos = pos.clone();
    }

    centerPos(pos) {
        this.moveTo(pos.sub(this.width / 2, this.height / 2));
    }

    /**
     * @param {Vec} dir
     */
    moveBy(dir) {
        this.moveTo(this.pos.sub(dir));
    }

    rotateBy(angle) {
        this.rotateAround(this.canvas.center.x, this.canvas.center.y, angle);
        this.rotateAngle += angle;
    }

    rotateTo(angle) {
        this.rotateBy(angle - this.rotateAngle);
        this.rotateAngle = angle;
    }

    rotateAround(x, y, angle) {
        this.ctx.translate(x, y);
        this.ctx.rotate(angle);
        this.ctx.translate(-x, -y);
    }

    zoomTo(zoom, zoomPoint) {
        zoom = Math.max(0.1, Math.min(10, zoom));
        this.pos = zoomPoint.scale(1 / this.zoom - 1 / zoom).add(this.pos);
        this.zoom = zoom;
        this.applyTransformation();
    }

    zoomBy(zoom, zoomPoint) {
        this.zoomTo(this.zoom + zoom, zoomPoint);
    }

    lockToObj(object) {
        this.lockedObject = object;
        console.log("Watching", object);
    }

    unlock() {
        this.lockedObject = null;
    }

    clipCircle(center, radius) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
        this.ctx.clip();
    }

    unclip() {
        this.ctx.restore();
    }

    /**
     * @param {Canvas} canvas
     */
    update(canvas) {
        if (null != this.lockedObject && canvas.objects.includes(this.lockedObject)) {
            this.centerPos(this.lockedObject.pos);
        }
    }

    /**
     * @param {Canvas} canvas
     */
    render(canvas) {
        const {ctx} = canvas;
        const view = this.view();
        ctx.strokeStyle = "white";
        ctx.strokeRect(view.x + 10, view.y + 10, view.width - 10, view.height - 10);
    }
}