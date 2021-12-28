function drawRectangle(x, y, width, height, color, borderWidth, borderColor) {
    context.beginPath();
    context.rect(x, y, width, height);
    context.fillStyle = color;
    context.fill();
    context.lineWidth = borderWidth;
    context.strokeStyle = borderColor;
    context.stroke();
    context.strokeStyle = "black"
    context.lineWidth = 1;
}

function drawArc(x, y, r, startAngle, endAngle, counterClockWise, color, borderWidth, borderColor) {
    context.beginPath();
    context.arc(x, y, r, startAngle, endAngle, counterClockWise);
    context.fillStyle = color;
    context.fill();
    context.lineWidth = borderWidth;
    context.strokeStyle = borderColor;
    context.stroke();

}

function drawTriangle() {
    context.beginPath();
    context.moveTo(xOfFirstPoint, yOfFirstPoint);
    context.lineTo(xOfSecondPoint, yOfSecondPoint);
    context.lineTo(xOFThirdPoint, yOFThirdPoint);
    context.lineTo(xOfFirstPoint, yOfFirstPoint);
    context.fillStyle = color;
    context.fill();
    context.lineWidth = borderWidth;
    context.strokeStyle = borderColor;
    context.stroke();
}

function drawLine(x1, y1, x2, y2, width, color) {
    context.beginPath();
    context.lineWidth = width;
    context.strokeStyle = color;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.lineWidth = 1;
    context.strokeStyle = "black";
}

function drawText(x, y, sizeAndFont, color, text) {
    context.beginPath();
    context.font = sizeAndFont;
    context.fillStyle = color;
    context.fillText(text, x, y);
    context.stroke;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}