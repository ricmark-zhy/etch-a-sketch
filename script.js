
const sketch_pad = document.querySelector('#sketch_pad');
const generate_button = document.querySelector('#generate');
const sizeInput = document.querySelector('#size_input');
let grid = 16;

generateGrid(grid);

generate_button.addEventListener('click', (event) => {
  // event.preventDefault();
  grid = Number(sizeInput.value);

  if (grid < 16){
    sizeInput.value = '16';
    grid = 16;
  }else if (grid > 100){
    sizeInput.value = '100';
    grid = 100;
  }

  console.log(grid);

  sketch_pad.innerHTML = '';
  generateGrid(grid);
})

function generateGrid(gridSize) {
  let count = 0;
  let boxCount = gridSize * gridSize;
  for (let i = 0; i < boxCount; i++) {

    let boxSize = String(500 / grid);
    const box = document.createElement("div");

    box.classList.add("box");
    box.style.height = boxSize + "px";
    box.style.width = boxSize + "px";
    sketch_pad.append(box);

    if (i < 1) {
      console.log(typeof boxSize === "string");

    }
    count++;
  }
  console.log(count);
}


