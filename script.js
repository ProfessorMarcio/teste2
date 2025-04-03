let car;
let lanes = 3; // Três pistas
let laneWidth;
let speed = 5;
let obstacles = [];
let collisionChance = 0.02; // Chance de gerar obstáculos a cada frame

function setup() {
  createCanvas(300, 500);
  laneWidth = width / lanes;  // Largura de cada pista
  car = new Car();           // Instancia o carro
}

function draw() {
  background(220);
  
  // Desenha as 3 pistas
  drawLanes();
  
  // Desenha e move o carro
  car.update();
  car.display();
  
  // Gerencia e desenha os obstáculos
  manageObstacles();
  
  // Verifica colisões
  checkCollisions();
}

function drawLanes() {
  stroke(0);
  for (let i = 1; i < lanes; i++) {
    line(i * laneWidth, 0, i * laneWidth, height);
  }
}

class Car {
  constructor() {
    this.x = laneWidth;  // Começa na pista do meio
    this.y = height - 50;
    this.width = 40;
    this.height = 60;
    this.speed = 5;
  }
  
  update() {
    if (keyIsDown(LEFT_ARROW) && this.x > 0) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW) && this.x < width - this.width) {
      this.x += this.speed;
    }
  }
  
  display() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.width, this.height);
  }
}

function manageObstacles() {
  // Chance de gerar obstáculos
  if (random() < collisionChance) {
    let lane = floor(random(lanes));
    obstacles.push(new Obstacle(lane));
  }
  
  // Atualiza e desenha obstáculos
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].display();
    
    // Remove obstáculos que saem da tela
    if (obstacles[i].y > height) {
      obstacles.splice(i, 1);
    }
  }
}

class Obstacle {
  constructor(lane) {
    this.x = lane * laneWidth + laneWidth / 2 - 20;  // Obstáculo centralizado na pista
    this.y = -20;  // Começa fora da tela
    this.size = 40;
    this.speed = 3;
  }
  
  update() {
    this.y += this.speed;
  }
  
  display() {
    fill(0, 0, 255);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

function checkCollisions() {
  for (let obstacle of obstacles) {
    // Verifica se o carro colidiu com o obstáculo
    if (car.x + car.width > obstacle.x - obstacle.size / 2 &&
        car.x < obstacle.x + obstacle.size / 2 &&
        car.y < obstacle.y + obstacle.size / 2 &&
        car.y + car.height > obstacle.y - obstacle.size / 2) {
      
      // Colisão detectada
      textSize(32);
      fill(255, 0, 0);
      text('Game Over!', width / 2 - 100, height / 2);
      noLoop();  // Para o jogo
    }
  }
}
