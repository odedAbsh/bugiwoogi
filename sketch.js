let grid;
let sizes;
let cols = 100;
let rows = 100;

function setup() {
  createCanvas(800, 800);
  grid = create2DArray(cols, rows, 0);
  sizes = create2DArray(cols, rows, () => random(5, 20)); // גודל ריבוע רנדומלי בין 5 ל-20
}

function draw() {
  background(255);
  drawGrid();
}

function mousePressed() {
  updateGrid();
}

function mouseDragged() {
  updateGrid();
}

function updateGrid() {
  let col = floor(mouseX / width * cols);
  let row = floor(mouseY / height * rows);

  if (col >= 0 && col < cols && row >= 0 && row < rows) {
    if (mouseButton === LEFT) {
      grid[col][row]++;
      if (grid[col][row] > 2) {
        grid[col][row] = 0;
      }
    } else if (mouseButton === RIGHT) {
      grid[col][row] += 10;
      if (grid[col][row] > 13) {
        grid[col][row] = 0;
      }
    }
  }
}

function create2DArray(cols, rows, initialValue) {
  let arr = new Array(cols);
  for (let i = 0; i < cols; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      arr[i][j] = typeof initialValue === 'function' ? initialValue() : initialValue;
    }
  }
  return arr;
}

function drawGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let size = sizes[i][j];
      if (grid[i][j] === 1) {
        fill(0);
      } else if (grid[i][j] === 2) {
        fill(150);
      } else if (grid[i][j] === 10) {
        fill(0, 0, 255);
      } else if (grid[i][j] === 11) {
        fill(255, 0, 0);
      } else if (grid[i][j] === 12) {
        fill(255, 255, 0);
      } else {
        fill(255);
      }
      stroke(200);
      rect(i * (width / cols), j * (height / rows), size, size);
    }
  }
}

// Disable context menu on right click
document.oncontextmenu = function() {
  return false;
}

