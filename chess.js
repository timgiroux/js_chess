$(document).ready( main )


function main() {

  let TILES = 9;
  let DIMENSION = 100;
  let canvasWidth = DIMENSION * TILES;
  let canvasHeight = DIMENSION * TILES;
  let selectedBox = null;
  let canvas = $("#chess");
  let DOMcanvas = document.getElementById("chess");
  let ctx = canvas.get(0).getContext("2d"); 
  
  let board = Array.from(Array(8), () => new Array(8));

  setup_ui()
  init_board()  

  DOMcanvas.addEventListener("mousedown", doMouseDown, false)


function init_board() {
  init_row = [2,4,3,0,1,3,4,2]

  for(x=1;x<=8;x++) {
    write(get_piece(init_row[x-1]),x,1)
    write(get_piece(5),x,2)
    write(get_piece(init_row[x-1] + 6),x,8)
    write(get_piece(11),x,7)
 }
}

function get_piece(id) {
  // whites: (0-5) (king, queen, rook, bishop, knight, pawn)
  // blacks: (6,11) (^)
  pieces = ['\u2654', '\u2655', '\u2656', '\u2657', '\u2658', '\u2659', '\u265a', '\u265b', '\u265c', '\u265d', '\u265e', '\u265f']
  return pieces[id]
}

function getMousePos(canv, evt) {
  var rect = canv.getBoundingClientRect(), // abs. size of element
      scaleX = canv.width / rect.width,    // relationship bitmap vs. element for X
      scaleY = canv.height / rect.height;  // relationship bitmap vs. element for Y

  return {
    x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  }
}

function doMouseDown(event) {

  pos = getMousePos(DOMcanvas, event)

  x = parseInt(pos.x/DIMENSION)
  y = parseInt(pos.y/DIMENSION)

  write('\u2654',x,y);  
}

function write(val,x,y) {
  erase(x,y)
  ctx.fillStyle = "black";
  ctx.fillText(val, x*DIMENSION + DIMENSION*.4, y*DIMENSION + DIMENSION*.6);
   
  // draw sample chess piece
  // ctx.fillText( "\u2654",DIMENSION/2, DIMENSION/2);
}

function erase(x,y) {
  if (x>0 && y>0) {
    x--;
    y--;
    if (is_dark(x,y)) {
        ctx.beginPath();
        ctx.rect(DIMENSION + x*DIMENSION, DIMENSION + y*DIMENSION, DIMENSION, DIMENSION);
        ctx.fillStyle = "#d4622a";
        ctx.fill();
    } else {
      ctx.beginPath();
      ctx.rect(DIMENSION + x*DIMENSION, DIMENSION + y*DIMENSION, DIMENSION, DIMENSION);
      ctx.fillStyle = "#f7eee6";
      ctx.fill();
    }
  }
}

// tell if tile at coord is dark
function is_dark(x,y) {
  return (x+y)%2 == 0
}

function setup_ui() {

  canvas.attr('width', canvasWidth);
  canvas.attr('height', canvasHeight);

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
    let yval = verti_vals.charAt(i);
    write(xval,i+1,0);
    write(yval,0,i+1);
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

}
}
