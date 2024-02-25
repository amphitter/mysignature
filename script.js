const canvas = document.getElementById('signatureCanvas');
const context = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const sizeRange = document.getElementById('sizeRange');

let isDrawing = false;

canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    draw(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, false);
});

canvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        draw(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, true);
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

function draw(x, y, isDragging) {
    if (!isDrawing) return;

    context.lineWidth = sizeRange.value;
    context.lineCap = 'round';
    context.strokeStyle = colorPicker.value;

    if (!isDragging) {
        context.beginPath();
        context.moveTo(x, y);
    } else {
        context.lineTo(x, y);
        context.stroke();
    }
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function downloadSignature() {
    const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const link = document.createElement('a');
    link.href = image;
    link.download = 'signature.png';
    link.click();
}
