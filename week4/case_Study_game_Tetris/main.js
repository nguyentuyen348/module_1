const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const ROW = 18;
const COL = 10;
const SQ = 40;
const COLOR = 'WHITE';
let score = 0;

function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ);

    ctx.strokeStyle = '#ff9999';
    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

let board = [];
for (let r = 0; r < ROW; r++) {
    board[r] = [];
    for (let c = 0; c < COL; c++) {
        board[r][c] = COLOR;
    }
}
console.log(board);

function drawBoard() {
    for (let r = 0; r < ROW; r++) {
        for (let c = 0; c < COL; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}

drawBoard();

class Piece {
    constructor(tetromino, color) {
        this.tetromino = tetromino;
        this.color = color;

        this.tetrominoN = 0;
        this.activeTetromino = this.tetromino[this.tetrominoN];

        this.x = 3;
        this.y = -2;
    }

    fill(color) {
        for (let r = 0; r < this.activeTetromino.length; r++) {
            for (let c = 0; c < this.activeTetromino.length; c++) {
                if (this.activeTetromino[r][c]) {
                    drawSquare(this.x + c, this.y + r, color);
                }
            }
        }
    }

    draw() {
        this.fill(this.color);
    }

    unDraw() {
        this.fill(COLOR);
    }

    moveDown() {
        if (!this.collision(0, 1, this.activeTetromino)) {
            this.unDraw();
            this.y++;
            this.draw();
        } else {
            this.lock();
            p = randomPiece();
        }
    }

    moveLeft() {
        if (!this.collision(-1, 0, this.activeTetromino)) {
            this.unDraw();
            this.x--;
            this.draw();
        }
    }

    moveRight() {
        if (!this.collision(1, 0, this.activeTetromino)) {
            this.unDraw();
            this.x++;
            this.draw();
        }
    }

    lock() {
        for (let r = 0; r < this.activeTetromino.length; r++) {
            for (let c = 0; c < this.activeTetromino.length; c++) {
                if (!this.activeTetromino[r][c]) {
                    continue
                }
                if (this.y + r < 0) {
                    document.getElementById('gameover').innerHTML=
                    'GAME OVER!!';
                    gameOver = true;
                    break;
                }
                board[this.y+r][this.x+c]=this.color;
            }
        }
        //score:
        for (let r = 0; r < ROW; r++) {
            let rowFull=true;
            for (let c = 0; c <COL ; c++) {
             rowFull= rowFull&&(board[r][c] !== COLOR)
            }
            if (rowFull){
                for (let r1 = r; r1 >1 ; r1--) {
                    for (let c = 0; c <COL ; c++) {
                        board[r1][c]=board[r1-1][c];
                    }
                }
                for (let c=0;c<COL;c++){
                    board[0][c]=COLOR;
                }
                score+=10;
            }
        }
        drawBoard();
        document.querySelector('#score').innerHTML=score;

    }

    rotate(){
        let next = this.tetromino[(this.tetrominoN+1)%this.tetromino.length];
        let move=0;
        if (this.collision(0,0,next)){
            if (this.x>COL/2){
                move=-1;
            }else {
                move=1;
            }
        }
        if (!this.collision(0,0,next)){
            this.unDraw();
            this.x+=move;
            this.tetrominoN=(this.tetrominoN+1)%this.tetromino.length;
            this.activeTetromino=this.tetromino[this.tetrominoN];
            this.draw();
        }
    }

    collision(x, y, piece) {
        for (let r = 0; r < piece.length; r++) {
            for (let c = 0; c < piece.length; c++) {
                if (!piece[r][c]) {
                    continue
                }
                let newX = this.x + c + x;
                let newY = this.y + r + y;


                if (newX < 0 || newX >= COL || newY>=ROW) {
                    return true
                }
                if (newY < 0) {
                    continue
                }
                if (board[newY][newX] !== COLOR) {
                    return true
                }
            }
        }
        return false
    }
}

const PIECES = [
    [I, '#0000ff'],
    [J, '#0000ff'],
    [O, '#0000ff'],
    [S, '#0000ff'],
    [T, '#0000ff'],
];

function randomPiece() {
    let r = Math.floor(Math.random() * PIECES.length);
    return new Piece(PIECES[r][0], PIECES[r][1]);
}
let gameOver = false;
let interval;


document.addEventListener('keydown', function (e) {
    if (e.keyCode === 37) {
        p.moveLeft();
    } else if (e.keyCode === 39) {
        p.moveRight();
    } else if (e.keyCode === 38) {
        p.rotate();

    } else if (e.keyCode === 40) {
        p.moveDown();
    }
})

let p = randomPiece();
console.log(p);

function drop() {
    interval = setInterval(function () {
        if (!gameOver) {
            p.moveDown();
        } else {
            clearInterval(interval)
        }
    }, 1000)
}
drop();



