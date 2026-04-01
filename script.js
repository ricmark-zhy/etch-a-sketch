
const sketch_pad = document.querySelector('#sketch_pad');
const generate_button = document.querySelector('#generate');
const sizeInput = document.querySelector('#size_input');
const mode_help_button = document.querySelector('#mode_help_button');
const help_popup = document.querySelector('#help_popup');
const mode_text = document.querySelector('#mode_text');
const toggle_grid = document.querySelector('#toggle_grid');

const sketch_pad_size = 514;

sketch_pad.style.width = `${sketch_pad_size}px`;
sketch_pad.style.height = `${sketch_pad_size}px`;

let gridSize = 16;
generateGrid(gridSize); //initialized grid

const boxes = document.querySelectorAll('.box');
console.log(boxes);

toggle_grid.addEventListener('click', () => {
  const boxes = sketch_pad.children;
  const boxesArr = Array.from(boxes);
  if (!toggle_grid.checked){
    boxesArr.forEach( box => box.classList.remove('box-grid'));
  } else {
    boxesArr.forEach( box => box.classList.add('box-grid'));
  }
})

const actionMode = (mode) => {
  if (mode.value === 'Paint'){
    return 'Paint';
  } else if (mode.value === 'Erase'){
    return 'Erase';
  } else {
    return 'View';
  }
}

sketch_pad.addEventListener('mousemove', (event) => {

  let target = event.target;
  
  if (actionMode(mode_text) === "Paint") {
    if (target.style.backgroundColor) {
      return;
    }
    console.log('painting');
    paintBox(target);
  } else if (actionMode(mode_text) === "Erase") {

    if (target.style.backgroundColor === ''){
      return;
    }
    console.log('erasing');
    clearBox(target);
  }
})

sketch_pad.addEventListener('mousedown', (event) => {

  let target = event.target;

  if (actionMode(mode_text) === "Paint") {
    paintBox(target);
  } else if (actionMode(mode_text) === 'Erase') {
    clearBox(target);
  }
})

function paintBox(target){
  let color = generateRandomColor();
  target.style.backgroundColor = `${color}`;
}

function clearBox(target){
  target.style.backgroundColor = '';
}

document.addEventListener('keyup', (event) => {
  if (event.key === 'd'){
    mode_text.value = 'Paint';
  } else if (event.key === 's'){
    mode_text.value = 'Erase';
  } else if (event.key === 'a'){
    mode_text.value = 'View';
  }
});

generate_button.addEventListener('mousedown', (event) => {
  event.preventDefault();
  gridSize = Number(sizeInput.value);

  if (gridSize < 16){
    // sizeInput.value = '16';
    gridSize = 16;
  }else if (gridSize > 100){
    // sizeInput.value = '100';
    gridSize = 100;
  }

  gridSize = Math.min(100, Math.max(16, gridSize));
  sizeInput.value = gridSize;

  sketch_pad.replaceChildren();
  generateGrid(gridSize);
});

function generateGrid(gridSize) {
  
  let boxCount = gridSize * gridSize;
  let boxSize = String(sketch_pad_size / gridSize);
  
  for (let i = 0; i < boxCount; i++) {
    const box = document.createElement("div");

    box.setAttribute('style', `width:${boxSize}px; height:${boxSize}px;`);

    if (toggle_grid.checked) {
      box.classList.add('box-grid');
    }
    sketch_pad.appendChild(box);

  }
  
}

let generateRandomColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red} ${green} ${blue})`;
}
//todo
// add pop up on what does the mode do <done>
// add a color mode (black, random, gradual darken)