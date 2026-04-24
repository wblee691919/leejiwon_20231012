let img; 

let px, py; 
let pd = 75; // 팩맨의 지름

let wallX1 = 383;
let wallX2 = 2430;
let wallY1 = 90;
let wallY2 = 1460;

let score = 0;

function preload() {
  img = loadImage('Map.png');
}
function setup() {
  createCanvas(2816, 1536);
  px = width / 2;
  py = height / 2;
  
}

function draw() {
  image(img, 0, 0);

  fill(255, 255, 255);
  textSize(20);
  text("점수: " + score, 20, 20);

  if (keyIsDown(LEFT_ARROW)) {
    if (px - pd/2 > wallX1) {
      px -= 8;
    }
  }

  if (keyIsDown(RIGHT_ARROW)) {
    if (px + pd/2 < wallX2) {
      px += 8;
    }
  }
  if (keyIsDown(UP_ARROW)) {
    if (py - pd/2 > wallY1){
      py -= 8;
    }
  }
  if (keyIsDown(DOWN_ARROW)) {
    if (py + pd/2 < wallY2) {
    py += 8;
    }
  }
  fill(255, 255, 0);
  ellipse(px, py, pd); // 팩맨 본체

}

//20260425_01:
















//점찍기
// let img;
// let points = []; // 클릭한 좌표 저장

// function preload() {
//   img = loadImage('Map.png');
// }

// function setup() {
//   createCanvas(2816, 1536);
// }

// function draw() {
//   image(img, 0, 0);

//   // 찍은 점들 다시 그리기
//   fill(255, 0, 0);
//   noStroke();
//   for (let p of points) {
//     ellipse(p.x, p.y, 10);
//   }
// }

// // 클릭하면 좌표 저장 + 콘솔 출력
// function mousePressed() {
//   points.push({ x: mouseX, y: mouseY });
//   console.log("x:", mouseX, "y:", mouseY);
// }
  