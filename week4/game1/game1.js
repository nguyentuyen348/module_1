const canvas= document.getElementById("pic1");
const ctx= canvas.getContext("2d");

const row=5;
const col=4;
const s=40;
const color='#ffff66';

function drawSquare(x,y,color) {
    ctx.fillStyle=color;
    ctx.fillRect(x*s,y*s,s,s);
    ctx.strokeStyle='#ff9999';
    ctx.strokeRect(x*s,y*s,s,s);
}
let board = [];
for (let r = 0; r < row; r++) {
    board[r] = [];
    for (let c = 0; c < col; c++) {
        board[r][c] = color;
    }
}
console.log(board);

function drawBoard() {
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}

drawBoard();