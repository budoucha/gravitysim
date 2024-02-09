int num;
Particle[] particles;
float r;
void setup() {
  size(800, 800);
  num = 18192;
  noSmooth();
  r=16;
  float stdSpd=2;
  particles = new Particle[num];
  for (int i=0; i<num; i++) {
    float x= random(-width/2, width/2);
    float y= random(-height/2, height/2);
    float vx = stdSpd*randomGaussian();
    float vy = stdSpd*randomGaussian();
    particles[i] = new Particle(x, y, vx, vy);
  }
  background(0);
}

void draw() {
  //background(0);
  noStroke();
  fill(0, 12);
  rect(0, 0, width, height);
  for (int i=0; i<num; i++) {
    particles[i].update();
    particles[i].draw();
  }

  ellipseMode(RADIUS);
  noFill();
  stroke(255);
  ellipse(width/2, height/2, r, r);
}


class Particle {
  static final float scaled=0.01;
  float x, y;
  float vx, vy;
  float ax, ay;
  float px, py;
  private boolean enabled;

  Particle(float x, float y, float vx, float vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    enabled=true;
  }

  public void update() {
    pushMatrix();
    translate(width/2, height/2);
    float distance = dist(x, y, 0, 0);
    if (distance < r) {
      enabled =false;
    }

    if (enabled == true) {
      float rr= scaled*sq(distance);
      float angle = atan2(x, y);
      ax= -10*sin(angle)*(1/rr);
      ay= -10*cos(angle)*(1/rr);

      px = x;
      py = y;
      vx +=ax;
      vy +=ay;
      x +=vx;
      y +=vy;
    }
    popMatrix();
  }

  public void draw() {
    if (enabled == true) {
      pushMatrix();
      translate(width/2, height/2);
      fill(255);
      stroke(255, 0, 0);
      strokeWeight(1);
      line(x, y, px, py);
      point(x, y);
      //ellipse(x, y, 5, 5);
      popMatrix();
    }
  }
}