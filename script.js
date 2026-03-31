
const sketch_pad = document.querySelector('#sketch_pad');
const generate_button = document.querySelector('#generate');
const sizeInput = document.querySelector('#size_input');
const mode_help_button = document.querySelector('#mode_help_button');
const help_popup = document.querySelector('#help_popup')
const mode_text = document.querySelector('#mode_text');

let gridSize = 16;
generateGrid(gridSize); //initialized grid

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
    paintBox(event.target, "black");
  } else if (actionMode(mode_text) === 'Erase') {
    clearBox(target);
  }
})

sketch_pad.addEventListener('mousedown', (event) => {

  let target = event.target;

  if (actionMode(mode_text) === "Paint") {
    paintBox(target, "black");
  } else if (actionMode(mode_text) === 'Erase') {
    clearBox(target);
  }
})

function paintBox(target, color){
  target.style.backgroundColor = `${color}`;
  target.style.outline = `${color} solid 1px`;
}

function clearBox(target){
  target.style.backgroundColor = '';
  target.style.outline = 'green solid 1px';
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

mode_help_button.addEventListener('mouseenter', () => {
  help_popup.classList.add('show');
});

mode_help_button.addEventListener('mouseleave', () => {
  help_popup.classList.remove('show');
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
  let boxSize = String(500 / gridSize);
  
  for (let i = 0; i < boxCount; i++) {
    const box = document.createElement("div");

    box.setAttribute('style', `width:${boxSize}px; height:${boxSize}px; outline: 1px solid green`)
    sketch_pad.appendChild(box);
  }
  
}


//todo
// add pop up on what does the mode do <done>
// add a color mode (black, random, gradual darken)