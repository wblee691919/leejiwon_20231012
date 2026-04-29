//이 코드 다 지우고 처음에 만든 거랑 섞어서 다시 만들기...
//다 다시 합쳐서 p5js에서 시험
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
  [1678, 1209, 67, 126], 
  
  [752, 1091, 80, 45],
  [1982, 1091, 80, 45],
  
  [1232, 657, 127, 34],
  [1455, 657, 127, 34],
  [1232, 657, 32, 211],
  [1550, 657, 32, 211],
  [1231, 832, 352, 35]
]; 

let img;

let px, py;
let pd = 60;

let tunnelYMin = 710;
let tunnelYMax = 825;

let mouthAngle = 0;
let mouthDir = 1;
let facing = 0;

let enemies
let score = 0;
let energy = 3;
// let gameOver = false;
// let gameClear = false;

let q = 430;
let a = 450;

let dx = [q,q+a,q+2*a,q+3*a,q+4*a,
          q,q+a,q+2*a,q+3*a,q+4*a,
          q,q+a,q+2*a,q+3*a,q+4*a,
          q+a,q+2*a,q+3*a,q+4*a-77,
          q+a,q+2*a,q+3*a,q+4*a-77,
          q+30,q+a,q+2*a,q+3*a,q+4*a,
          q+30,q+a,q+2*a,q+3*a,q+4*a,
          q,q+a,q+2*a,q+3*a,q+4*a];
let dy = [123,123,123,123,123,
          315,315,315,315,315,
          465,465,465,465,465,
          615,615,615,650,
          900,900,900,850,
          1050,1050,1050,1050,1050,
          
          1400,1400,1400,1400,1400];

let dSize = 45;
let eSize = 60;

let ex = [1110,1720];
let ey =[763, 763];

let dActive = [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,
  true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true];
let eActive = [true, true];

function preload() {
  img = loadImage("Map.png");
}

function setup() {
  createCanvas(2816, 1536);
  px = width/2;
  py = height/2;
}

function inTunnel(y) {
  return y > tunnelYMin && y < tunnelYMax;
}

function draw() {
  image(img, 0, 0);

  fill(255);
  textSize(70);
  text("점수: " + score, 20, 100);
  text("목숨: " + energy, 20, 200);

  // 입 애니메이션
  mouthAngle += 0.03 * mouthDir;
  if (mouthAngle > 0.4) mouthDir = -1;
  if (mouthAngle < 0.01) mouthDir = 1;

  let nx = px;
  let ny = py;

  if (keyIsDown(LEFT_ARROW)) {
    facing = PI;
    nx -= 8;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    facing = 0;
    nx += 8;
  }
  if (keyIsDown(UP_ARROW)) {
    facing = -PI / 2;
    ny -= 8;
  }
  if (keyIsDown(DOWN_ARROW)) {
    facing = PI / 2;
    ny += 8;
  }

  if (inTunnel(ny)) {
    if (nx < -pd) nx = width + pd;
    if (nx > width + pd) nx = -pd;
  }
 //이건 X방향만 충돌코드
  let collisionX = false;
  for (let i = 0; i < walls.length; i++) {
    let [wx, wy, ww, wh] = walls[i];
    let cx = constrain(nx, wx, wx + ww); //못 가게 막는 함수 https://p5js.org/ko/examples/calculating-values-constrain/
    let cy = constrain(ny, wy, wy + wh);
    if (dist(nx, py, cx, cy) < pd / 2) {
      collisionX = true;
    }
  }

  let collisionY = false;
  for (let i = 0; i < walls.length; i++) {
    let [wx, wy, ww, wh] = walls[i];
    let cx = constrain(nx, wx, wx + ww);
    let cy = constrain(ny, wy, wy + wh);
    if (dist(px, ny, cx, cy) < pd / 2) {
      collisionY = true;
    }
  }

  if (!collisionX) px = nx;
  if (!collisionY) py = ny;

  fill(255, 255, 0);
  noStroke();
  arc(px, py, pd, pd, facing + mouthAngle, facing + TWO_PI - mouthAngle, PIE);


  //벽 충돌 코드 짜야 함
  // 적도 만들어야 함 
  // 게임 재시작도 해야 됨
  //에너지도
  for (let i = 0; i < 50; i++) {
    if (dActive[i]) {
      fill(255, 100, 100);
      ellipse(dx[i], dy[i], dSize);

      let d = dist(px, py, dx[i], dy[i]);
      if (d < pd / 2 + dSize / 2) {
        dActive[i] = false;
        score++;
      }
    }
  }

  for (let j = 0; j < 2; j++) {
    if (eActive[j]) {
      fill(100, 100, 255);
      ellipse(ex[j], ey[j], eSize);

      let e = dist(px, py, ex[j], ey[j]);
      if (e < pd / 2 + eSize / 2) {
        eActive[j] = false;
        energy--;
      }
    }
  }

  if (score == 17) {
    background(0, 0, 0, 200);
    fill(255);
    textSize(180);
    textAlign(CENTER, CENTER);
    text("GAME CLEAR!", width / 2, height / 2);
  }
  if (energy <= 0) {
    background(0, 0, 0, 200);
    fill(255);
    textSize(180);
    textAlign(CENTER, CENTER);
    text("GAME OVER!", width / 2, height / 2);
  }
}

//점 찍기 끝...