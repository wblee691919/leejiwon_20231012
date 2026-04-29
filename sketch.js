// let img; 

// let px, py; 
// let pd = 65; // 팩맨의 지름

// let wallPixels = [];

// let tunnelYMin = 710
// let tunnelYMax = 825

// let mouthAngle = 0;
// let mouthDir = 1; // 1: 열리는 방향
// let facing = 0; // 팩맨이 바라보는 방향 (PI -> Radians)

// let score = 0;
// let moveSpeed = 8;
// q = 430
// a= 215;

// let dx = [q, q+a, q+2*a, q+3*a, q+4*a, 
//           q, q+a, q+2*a, q+3*a, q+4*a,
//           q, q+a, q+2*a, q+4*a,
//           q+a, q+2*a, q+4*a]; // 점들의 X 좌표
// let dy = [123, 123, 123, 123, 123, 
//           315, 315, 315, 315, 315,
//           465, 465, 465, 465,
//           615, 615, 615]; // 점들의 Y 좌표
// let dSize = 45;                     // 점들의 크기
// let dActive = [true, true, true, true, true,
//               true, true, true, true, true,
//               true, true, true, true,
//               true, true, true]; // 점들의 생존 여부 (핵심!)

// function preload() {
//   img = loadImage('Map.png');
// }

// function setup() {
//   createCanvas(2816, 1536);
//   px = width / 2;
//   py = height / 2;

//   img.loadPixels();
//   //픽셀 배열을 추출하여 미리 로드
//   //https://p5js.org/ko/reference/p5/loadPixels/
//   for (let y = 0; y < img.height; y++) {
//     wallPixels[y] = [];
//     for (let x = 0; x < img.width; x++) {
//       let idx = (y * img.width + x) * 4; //y * img.width -> 몇 번째 줄인지
//       // + x -> 그 줄에서 몇 번째 칸인지
//       // *4 -> RGBA 각각 4개의 값이 있기 때문에 
//       //즉, 픽셀의 인덱스 값을 계산하여
//       let r = img.pixels[idx]; // idx는 R 
//       let b = img.pixels[idx + 2];// idx+2는 B
//       // 파란 벽 감지: R 낮고 B 높음
//       //배열에 벽 여부 저장
//       wallPixels[y][x] = (r < 100 && b > 120);
//       //R이 100보다 낮고 B가 120보다 높으면 벽으로 간주 후 true, 아니면 false
//     }
//   }
// }

// function isWall(x, y) {
//   x = int(constrain(x, 0, img.width - 1)); //밖으로 나가는 걸 제한함
//   y = int(constrain(y, 0, img.height - 1)); //벽인지 확인함
//   return wallPixels[y][x];
// }

// function canMove(nx, ny){
//   let r = pd / 2- 4; //팩맨 원의 테두리 부분은 픽셀 체크 -> 여긴 AI 도움을 받음...
//   return  !isWall(nx -r, ny) &&
//           !isWall(nx + r, ny) &&
//           !isWall(nx, ny - r) &&
//           !isWall(nx, ny + r);
// }

// function inTunnel(y) {
//   return y > tunnelYMin && y < tunnelYMax;
// }

// function draw() {
//   image(img, 0, 0);

//   fill(255, 255, 255);
//   textSize(80);
//   text("Score: " + score, 19, 110);

//   //1은 입 열림, -1은 닫힘
//   mouthAngle += 0.03 * mouthDir;
//   if (mouthAngle > 0.4) mouthDir = -1;
//   if (mouthAngle < 0.01) mouthDir = 1;

//   if (keyIsDown(LEFT_ARROW)) {
//     facing = PI;
//     if (inTunnel(py)) {
//       px -= moveSpeed;
//     } 
//     else if (canMove(px - moveSpeed, py)) {
//       px -= moveSpeed;
//     }
//   }
//   if (keyIsDown(RIGHT_ARROW)) {
//     facing = 0;
//     if (inTunnel(py)) {
//       px += moveSpeed;
//     } 
//     else if (canMove(px + moveSpeed, py)) {
//       px += moveSpeed;
//     }
//   }
//   if (keyIsDown(UP_ARROW)) {
//     facing = -PI/2;
//     if (canMove(px, py- moveSpeed)) {
//       py -= moveSpeed;
//     }
//   }
//   if (keyIsDown(DOWN_ARROW)) {
//     facing = PI/2;
//     if (canMove(px, py+ moveSpeed)) {
//       py += moveSpeed;
//     }
//   }
// //이제워프처리해야함
//   if(inTunnel(py)){
//     if(px<-py){
//       px= width + pd;
//     }
//     if(px> width +pd){
//       px= -pd;
//     }
//   }

//   fill(255, 255, 0);
//   noStroke();
//   arc(px, py, pd, pd, facing + mouthAngle, facing + TWO_PI - mouthAngle, PIE);




//   for (let i = 0; i < 17; i++) {
//     // 점이 살아있는 경우에만 충돌 체크 및 그리기
//     if (dActive[i] === true) {
//       fill(255, 100, 100);
//       ellipse(dx[i], dy[i], dSize);

//       // 거리 계산 (dist 함수 사용)
//       let distance = dist(px, py, dx[i], dy[i]);

//       // 충돌 조건: 거리가 두 반지름의 합보다 작을 때
//       if (distance < (pd / 2) + (dSize / 2)) {
//         dActive[i] = false; // splice 대신 상태를 '거짓'으로 바꿔서 안 보이게 함
//         score = score + 1;
//       }
//     }
//   }

//   if(score == 17){ //완료 스코어에 따라 점수 변경
//     background(0, 0, 0, 200);
//     fill(255);
//     textAlign(CENTER, CENTER);
//     textSize(180);
//     text("GAME CLEAR!", width / 2, height / 2);
//   }
// }


let walls = [
  [0, 0, 2816, 85],
  [0, 0, 378, 505],
  [0, 505, 568, 222],
  [2438, 85, 383, 420],
  [2240, 505, 576, 222],
  [1372, 0, 73, 271],
  [0, 813, 570, 194],
  [0, 1007, 424, 1536],
  [0, 1448, 2816, 88],
  [2240, 813, 576, 197],
  [2390, 1010, 426, 526],

  [457, 168, 164, 102],
  [2193, 168, 164, 102],
  
  [729, 168, 556, 102],
  [1524, 168, 556, 102],
  
  [457, 366, 165, 55],

  [678, 366, 296, 55],   
  [678, 366, 24, 207],   

  [1219, 366, 376, 55],  
  [1372, 421, 68, 152],  

  [1841, 366, 294, 55],  
  [2111, 366, 24, 207],

  [2193, 366, 161, 55],

  [858, 518, 429, 55],
  [1068, 356, 67, 367],

  [1525, 518, 431, 55],
  [1679, 354, 67, 371],
  
  [750, 658, 222, 209],
  [1842, 658, 222, 209],
  
  [1067, 813, 68, 196],
  [1678, 813, 68, 196],
  [667, 950, 304, 56],
  [1841, 950, 304, 56],
  
  [515, 1090, 58, 175],
  [2241, 1090, 58, 175],
  
  [833, 1207, 138, 58],
  [1843, 1207, 138, 58],
  [927, 1092, 361, 42],
  [1525, 1092, 361, 42],
  
  [1235, 1209, 347, 45],
  [1235, 951, 347, 45],
  
  [1384, 1244, 45, 123],
  [1384, 996, 45, 123],
  
  [515, 1325, 772, 39],
  [1526, 1325, 772, 39],
  
  [669, 1091, 115, 236],
  [2029, 1091, 115, 236],
  
  [1068, 1208, 67, 126],
  [1678, 1209, 67, 126]
];

//점찍기 시작...
let img;
let points = []; // 클릭한 좌표 저장

function preload() {
  img = loadImage('Map.png');
}

function setup() {
  createCanvas(2816, 1536);
}

function draw() {
  image(img, 0, 0);

  // 찍은 점들 다시 그리기
  fill(255, 0, 0);
  noStroke();
  for (let p of points) {
    ellipse(p.x, p.y, 10);
  }
}

// 클릭하면 좌표 저장 + 콘솔 출력
function mousePressed() {
  points.push({ x: mouseX, y: mouseY });
  console.log("x:", mouseX, "y:", mouseY);
}
  
