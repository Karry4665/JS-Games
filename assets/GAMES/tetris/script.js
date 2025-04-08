const canvas = document.getElementById('canvas');
const scoreBoard = document.querySelector('.score');

let ctx = canvas.getContext('2d');
ctx.scale(30, 30);

let score = 0;
let gameOver = false;
let isGameRunning = false;
const SHAPES = [
  [[0, 1, 0], [1, 1, 1], [0, 1, 0]], // Cross
  [[1, 1, 1], [1, 1, 1]], // Large Block
  [[1, 1, 1, 1]], // Line
  [[0, 1, 0], [0, 1, 0], [1, 1, 0]], // L Shape
  [[0, 1, 0], [0, 1, 0], [0, 1, 1]], // Mirrored L
  [[1, 1], [1, 1]], // Square
  [[1, 1, 1], [0, 1, 0]], // T Shape
  [[0, 1, 1], [1, 1, 0]], // Z Shape
  [[1, 1, 0], [0, 1, 1]] // Mirrored Z
];

const COLORS = ['#42F0F1', '#2201F1', '#F0A100', '#F1F001', '#37F002', '#A200F1', '#E40100', '#3E7B27', '#000957', '#FF9D23'];

const ROWS = 20;
const COLS = 10;

let fallingPieceObj = generateRandomPiece(SHAPES.length);
let grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

// Function to generate a random piece
function generateRandomPiece(n) {
  let random = Math.floor(Math.random() * n);
  let piece = SHAPES[random];
  let colorIndex = random + 1;
  return { piece, colorIndex, x: 4, y: 0 };
}

// Function to render the current piece
function renderPiece() {
  let piece = fallingPieceObj.piece;
  for (let i = 0; i < piece.length; i++) {
    for (let j = 0; j < piece[i].length; j++) {
      if (piece[i][j] === 1) {
        ctx.fillStyle = COLORS[fallingPieceObj.colorIndex];
        ctx.fillRect(fallingPieceObj.x + j, fallingPieceObj.y + i, 1, 1);
        ctx.strokeStyle = '#e5e5e5';
        ctx.lineWidth = 0.03;
        ctx.strokeRect(fallingPieceObj.x + j, fallingPieceObj.y + i, 1, 1);
      }
    }
  }
}

// Function to render the grid
function renderGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      if (grid[i][j] !== 0) {
        ctx.fillStyle = COLORS[grid[i][j]] || '#000';
        ctx.fillRect(j, i, 1, 1);
        ctx.strokeStyle = '#e5e5e5';
        ctx.lineWidth = 0.05;
        ctx.strokeRect(j, i, 1, 1);
      }
    }
  }
  renderPiece();
}

// Function to check for collision
function collision(newX, newY, piece = fallingPieceObj.piece) {
  for (let i = 0; i < piece.length; i++) {
    for (let j = 0; j < piece[i].length; j++) {
      if (piece[i][j] === 1) {
        let x = newX + j;
        let y = newY + i;
        if (x < 0 || x >= COLS || y >= ROWS || (y >= 0 && grid[y][x] !== 0)) {
          return true;
        }
      }
    }
  }
  return false;
}

// Function to move the piece down
function moveDown() {
  if (!collision(fallingPieceObj.x, fallingPieceObj.y + 1)) {
    fallingPieceObj.y++;
  } else {
    lockPiece();
    clearLines();
    fallingPieceObj = generateRandomPiece(SHAPES.length);
    if (collision(fallingPieceObj.x, fallingPieceObj.y)) {
      gameOver = true;
      alert('Game Over!');
      return;
    }
  }
  renderGrid();
}

// Function to lock a piece into the grid
function lockPiece() {
  let piece = fallingPieceObj.piece;
  for (let i = 0; i < piece.length; i++) {
    for (let j = 0; j < piece[i].length; j++) {
      if (piece[i][j] === 1) {
        let x = fallingPieceObj.x + j;
        let y = fallingPieceObj.y + i;
        if (y >= 0) grid[y][x] = fallingPieceObj.colorIndex;
      }
    }
  }
}

// Function to clear completed lines
function clearLines() {
  for (let i = ROWS - 1; i >= 0; i--) {
    if (grid[i].every(cell => cell !== 0)) {
      grid.splice(i, 1);
      grid.unshift(Array(COLS).fill(0));
      score += 10;
      scoreBoard.textContent = `Score: ${score}`;
      i++;
    }
  }
}

// Function to rotate the current piece
function rotatePiece() {
  let rotatedPiece = fallingPieceObj.piece[0].map((_, index) => fallingPieceObj.piece.map(row => row[index])).reverse();
  if (!collision(fallingPieceObj.x, fallingPieceObj.y, rotatedPiece)) {
    fallingPieceObj.piece = rotatedPiece;
  }
}

// Event listener for user input
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowUp' || e.key === 'w') {
    rotatePiece();
  } else if (e.key === 'ArrowLeft' || e.key === 'a') {
    if (!collision(fallingPieceObj.x - 1, fallingPieceObj.y)) fallingPieceObj.x--;
  } else if (e.key === 'ArrowRight' || e.key === 'd') {
    if (!collision(fallingPieceObj.x + 1, fallingPieceObj.y)) fallingPieceObj.x++;
  } else if (e.key === 'ArrowDown' || e.key === 's') {
    moveDown();
  }
  renderGrid();
});

// Game loop
setInterval(() => {
  if (!gameOver) moveDown();
}, 500);

// Initial render
renderGrid();
