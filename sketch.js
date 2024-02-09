var num, r;
var particles = [];

function setup() {
  pixelDensity(1);
  var myCanvas = createCanvas(800, 800);
  myCanvas.parent('sketch-holder');

  num = 256;
  r = 16;
  var stdSpd = 2;

  noSmooth();
  for (i = 0; i < num; i++) {
    var x = random(-width / 2, width / 2);
    var y = random(-height / 2, height / 2);
    var vx = stdSpd * randomGaussian();
    var vy = stdSpd * randomGaussian();
    particles.push(new Particle(x, y, vx, vy));
  }
  background(0);
}

function draw() {
  noStroke();
  fill(0, 12);
  rect(0, 0, width, height);
  var cnt = 0;
  for (i = 0; i < num; i++) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].enabled) {
      cnt++;
    }
  }


  ellipseMode(RADIUS);
  noFill();
  stroke(255);
  ellipse(width / 2, height / 2, r, r);

  textSize(width / 48);
  noStroke();
  fill(255);
  text(cnt + "/" + num, width - width / 8, height - height / 16);
}


function Particle(x, y, vx, vy) {
  this.scaled = 0.01;
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.ax;
  this.ay;
  this.px;
  this.py;
  this.enable=true;

  this.update = function () {
    push();
    this.enabled = (dist(this.x, this.y, 0, 0) > r);
    if (this.enabled) {
      translate(width / 2, height / 2);
      this.distance = dist(this.x, this.y, 0, 0);
      this.rr = this.scaled * sq(this.distance);
      this.angle = atan2(this.x, this.y);
      this.ax = -10 * sin(this.angle) * (1 / this.rr);
      this.ay = -10 * cos(this.angle) * (1 / this.rr);

      this.px = this.x;
      this.py = this.y;
      this.vx += this.ax;
      this.vy += this.ay;
      this.x += this.vx;
      this.y += this.vy;
    }
    pop();
  }

  this.draw = function () {
    if (this.enabled) {
      push();
      translate(width / 2, height / 2);
      fill(255);
      stroke(255, 0, 0);
      strokeWeight(1);
      line(this.x, this.y, this.px, this.py);
      point(this.x, this.y);
      //ellipse(x, y, 5, 5);
      pop();
    }
  }
}

function mouseClicked() {
  particles = [];
  setup();
}