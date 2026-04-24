let img; 

let px, py; 
let pd = 75; // 팩맨의 지름

let wallPixels = [];

// let wallX1 = 383;
// let wallX2 = 2430;
// let wallY1 = 90;
// let wallY2 = 1460;
// 벽을 하나하나 만드는 건 현실적으로 어렵
// 이미지 픽셀을 뽑아내는 코드를 짜야할 듯...

let tunnelYMin = 710
let tunnelYMax = 825

let mouthAngle = 0;
let mouthDir = 1; // 1: 열리는 방향
let facing = 0; // 팩맨이 바라보는 방향 (PI -> Radians)

let score = 0;

function preload() {
  img = loadImage('Map.png');
}

function setup() {
  createCanvas(2816, 1536);
  px = width / 2;
  py = height / 2;

  img.loadPixels();
  //픽셀 배열을 추출하여 미리 로드
  //https://p5js.org/ko/reference/p5/loadPixels/
  for (let y = 0; y < img.height; y++) {
    wallPixels[y] = [];
    for (let x = 0; x < img.width; x++) {
      let idx = (y * img.width + x) * 4; //y * img.width -> 몇 번째 줄인지
      // + x -> 그 줄에서 몇 번째 칸인지
      // *4 -> RGBA 각각 4개의 값이 있기 때문에 
      //즉, 픽셀의 인덱스 값을 계산하여
      let r = img.pixels[idx]; // idx는 R 
      let b = img.pixels[idx + 2];// idx+2는 B
      // 파란 벽 감지: R 낮고 B 높음
      //배열에 벽 여부 저장
      wallPixels[y][x] = (r < 100 && b > 120);
      //R이 100보다 낮고 B가 120보다 높으면 벽으로 간주 후 true, 아니면 false
    }
  }
}

function draw() {
  image(img, 0, 0);

  fill(255, 255, 255);
  textSize(80);
  text("Score: " + score, 19, 110);

  //1은 입 열림, -1은 닫힘
  mouthAngle += 0.03 * mouthDir;
  if (mouthAngle > 0.4) mouthDir = -1;
  if (mouthAngle < 0.01) mouthDir = 1;

  if (py > tunnelYMin && py < tunnelYMax) {
    // 왼쪽 끝으로 나가면 오른쪽으로 워프
    if (px < 0) {
      px = width;
    }
    // 오른쪽 끝으로 나가면 왼쪽으로 워프
    if (px > width) {
      px = 0;
    }
  }

  if (keyIsDown(LEFT_ARROW)) {
    if (py > tunnelYMin && py < tunnelYMax) {
      px -= 8;
    } 
    else if (px - pd/2 > wallX1) {
      px -= 8;
    }
  }
  if (keyIsDown(RIGHT_ARROW)) {
    if (py > tunnelYMin && py < tunnelYMax) {
      px += 8;
    } 
    else if (px + pd/2 < wallX2) {
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
  noStroke();
  arc(px, py, pd, pd, facing + mouthAngle, facing + TWO_PI - mouthAngle, PIE);
  //이러면 팩맨이 게임 실행하고 사라짐...
  

}

//20260425_02:
















// //점찍기
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
  