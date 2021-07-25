import {Rect} from "./rect.js";

export function drawImageRotated(ctx, img, angle, x, y, w, h, x2, y2, w2, h2) {
    if (typeof h2 !== "undefined") {
        ctx.translate(x2, y2);
        ctx.rotate(angle);
        ctx.drawImage(img, x, y ,w , h, -w2 / 2, -h2 / 2, w2, h2);
        ctx.rotate(-angle);
        ctx.translate(-x2, -y2);
    } else {
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.drawImage(img, -w / 2, -h / 2, w, h);
        ctx.rotate(-angle);
        ctx.translate(-x, -y);
    }
}

export function fillCircle(ctx, pos, radius, style = "white") {
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = style;
    ctx.fill();
}


export function strokeCircle(ctx, pos, radius, style = "white") {
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = style;
    ctx.lineWidth = 2;
    ctx.stroke();
}

export function fillTextCentered(ctx, text, pos, containerWidth) {
    let {width} = ctx.measureText(text);
    width = Math.min(width, containerWidth);
    ctx.fillText(text, pos.x + (containerWidth - width) / 2, pos.y, containerWidth);
}

export function fillRoundRect(ctx, rect, radius) {
    roundRect(ctx, rect, radius, true, false);
}

export function strokeRoundRect(ctx, rect, radius) {
    roundRect(ctx, rect, radius, false, true);
}

export function roundRect(ctx, rect, radius, fill, stroke) {
    if (typeof stroke === 'undefined') {
        stroke = true;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    if (typeof radius === 'number') {
        radius = Rect.byCorners(radius, radius, radius, radius);
    }
    ctx.beginPath();
    ctx.moveTo(rect.x + radius.tl, rect.y);
    ctx.lineTo(rect.right - radius.tr, rect.y);
    ctx.quadraticCurveTo(rect.right, rect.y, rect.right, rect.y + radius.tr);
    ctx.lineTo(rect.right, rect.bottom - radius.br);
    ctx.quadraticCurveTo(rect.right, rect.bottom, rect.right - radius.br, rect.bottom);
    ctx.lineTo(rect.x + radius.bl, rect.bottom);
    ctx.quadraticCurveTo(rect.x, rect.bottom, rect.x, rect.bottom - radius.bl);
    ctx.lineTo(rect.x, rect.y + radius.tl);
    ctx.quadraticCurveTo(rect.x, rect.y, rect.x + radius.tl, rect.y);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }
}

export default {
    drawImageRotated,
    fillCircle,
    strokeCircle,
    fillTextCentered,
    roundRect,
    fillRoundRect,
    strokeRoundRect,
};