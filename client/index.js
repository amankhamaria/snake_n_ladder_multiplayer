const socket = io('ws://localhost:5000')

socket.on('info', (msg) => {
  console.log(msg)
})

socket.emit('info', 'hello from client')

const canvasSize = 600
const blockSize = canvasSize / 10

const canvasEle = document.getElementById("canvas")
canvasEle.height = canvasSize
canvasEle.width = canvasSize
canvasEle.style.backgroundColor = "#aa0"
const ctx = canvasEle.getContext("2d")

const drawCircle = (x, y, r, fillColor) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = fillColor;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "blue";
  ctx.stroke();
}

const drawLine = (x1, y1, x2, y2) => {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineWidth = 1;
  ctx.stroke();
}

for (let i = 1; i < 10; i++) {
  drawLine(blockSize * i, 0, blockSize * i, canvasSize)
}
for (let i = 1; i < 10; i++) {
  drawLine(0, blockSize * i, canvasSize, blockSize * i)
}




drawCircle(blockSize / 2 + blockSize * 2, blockSize / 2 + blockSize * 1, blockSize / 2 - blockSize / 5, "red")