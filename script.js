
const sketch_pad = document.querySelector('#sketch_pad');

let grid = 100, boxCount = grid * grid;

generateGrid();

function generateGrid() {

  for (let i = 0; i < boxCount; i++) {

    let boxSize = String(600 / grid);
    const box = document.createElement("div");

    box.classList.add("box");
    box.style.height = boxSize + "px";
    box.style.width = boxSize + "px";
    sketch_pad.append(box);

    if (i < 1) {
      console.log(typeof boxSize === "string");

    }
  }

}


