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

export default {
    drawImageRotated,
    fillCircle,
    strokeCircle
};