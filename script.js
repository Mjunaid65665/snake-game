// ================= GRID SETUP =================
const grid = document.querySelector('.grid');
const scoreEl = document.querySelector('.score h1');
const highScoreEl = document.querySelector('.high-score h1');
const timeEl = document.querySelector('.time h1');
const blockSize = 28;

const cols = Math.floor(grid.clientWidth / blockSize);
const rows = Math.floor(grid.clientHeight / blockSize);
const totalCells = rows * cols;

// create grid
for (let i = 0; i < totalCells; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  grid.appendChild(cell);
}

const cells = document.querySelectorAll('.cell');

// ================= GAME STATE =================
let score = 0;
let highScore = 0;
let timeElapsed = 0;

let direction = 1;         
let nextDirection = 1;      

let gameSpeed = 600;
let gameInterval;
let timerInterval;

let snake = [
  Math.floor(totalCells / 2),
  Math.floor(totalCells / 2) - 1,
  Math.floor(totalCells / 2) - 2
];

let foodIndex = null;

// ================= DRAW =================
function drawSnake() {
  snake.forEach(i => cells[i].classList.add('snake'));
}

function clearSnake() {
  snake.forEach(i => cells[i].classList.remove('snake'));
}

// ================= FOOD =================
function spawnFood() {
  do {
    foodIndex = Math.floor(Math.random() * totalCells);
  } while (snake.includes(foodIndex));

  cells[foodIndex].classList.add('food');
}

// ================= MOVE LOGIC =================
function moveSnake() {
  clearSnake();

  
  direction = nextDirection;

  const head = snake[0];
  const newHead = head + direction;

  // ===== REAL SELF COLLISION CHECK =====
  // allow moving into tail IF tail is going to move
  const tailWillMove = newHead !== foodIndex;
  const bodyToCheck = tailWillMove ? snake.slice(0, -1) : snake;

  if (bodyToCheck.includes(newHead)) {
    endGame();
    alert('Game Over: You collided with yourself!');
    return;
  } 
  if(newHead )

  snake.unshift(newHead);

  // eat food
  if (newHead === foodIndex) {
    score++;
    scoreEl.innerHTML = `Score: ${score}`;
    highScore = Math.max(score, highScore);
    highScoreEl.innerHTML = `High Score: ${Math.max(score, highScore)}`;
    gameSpeed = Math.max(50, gameSpeed - 50); 
    cells[foodIndex].classList.remove('food');
    spawnFood();
  } else {
    snake.pop(); 
  }

  drawSnake();
}

// ================= END GAME =================
function endGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  alert(`Game Over\nScore: ${score}\nTime: ${timeElapsed}s`);
}

// ================= START =================
function startGame() {
  drawSnake();
  spawnFood();
   scoreEl.innerHTML = score;
  highScoreEl.innerHTML = highScore;
  timeEl.innerHTML = timeElapsed;
  gameInterval = setInterval(moveSnake, gameSpeed);
 
  timerInterval = setInterval(() => {
    timeElapsed++;
    timeEl.innerHTML = timeElapsed;
  }, 1000);
}
startGame();

// ================= CONTROLS =================
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp' && direction !== cols) {
    nextDirection = -cols;
  }
  if (e.key === 'ArrowDown' && direction !== -cols) {
    nextDirection = cols;
  }
  if (e.key === 'ArrowLeft' && direction !== 1) {
    nextDirection = -1;
  }
  if (e.key === 'ArrowRight' && direction !== -1) {
    nextDirection = 1;
  }
});
  