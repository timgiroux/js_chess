$(document).ready( main )


function main() {

  setup_ui()
  write("h",3,3);
}


function write(val,x,y) {
  let DIMENSION = 100;
  let canvas = $("#chess");
  let ctx = canvas.get(0).getContext("2d");

  ctx.fillStyle = "black";
  ctx.fillText(val, x*DIMENSION + DIMENSION*.4, y*DIMENSION + DIMENSION*.6);
   
}


function setup_ui() {

  let TILES = 9;
  let DIMENSION = 100;

  let canvas = $("#chess");
  let ctx = canvas.get(0).getContext("2d");
  let canvasWidth = DIMENSION * TILES;
  let canvasHeight = DIMENSION * TILES;
  let selectedBox = null;

  canvas.attr('width', canvasWidth);
  canvas.attr('height', canvasHeight);

  console.log(TILES)
  
  // draw board bg
  ctx.beginPath();
  ctx.rect(DIMENSION, DIMENSION, canvasWidth - DIMENSION, canvasHeight - DIMENSION);
  ctx.fillStyle = "#f7eee6";
  ctx.fill();

  // draw coord guide
  ctx.font = 'bold '+DIMENSION/2.5+'px serif';
  ctx.fillStyle = "white";
  let horiz_vals = "ABCDEFGH";
  let verti_vals = "12345678";
  for (let i = 0; i < 8; i++) {    
    let xval = horiz_vals.charAt(i);
    ctx.fillText(xval, 2.8*DIMENSION/2 + i*DIMENSION, 1.2*DIMENSION/2);
    let yval = verti_vals.charAt(i);
    ctx.fillText(yval,0.8*DIMENSION/2, 3.2*DIMENSION/2 + i*DIMENSION);
  }

  // draw dark tiles
  for( let x = 0; x < 8; x++ ) {
    for( let y = 0; y < 8; y++ ) {
      if( (x+y)%2 == 0){
        ctx.beginPath();
        ctx.rect(DIMENSION + x*DIMENSION, DIMENSION + y*DIMENSION, DIMENSION, DIMENSION);
        ctx.fillStyle = "#d4622a";
        ctx.fill();
      }
    }
  }



  // draw sample chess piece
  // ctx.fillText( "\u2654",DIMENSION/2, DIMENSION/2);
}


