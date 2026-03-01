class Eye {
  constructor(x, y, eyeWidth, eyeHeight, irisSize, pupilSize, maxIrisMovement) {
    this.x = x;
    this.y = y;
    this.eyeWidth = eyeWidth;
    this.eyeHeight = eyeHeight;
    this.irisSize = irisSize;
    this.pupilSize = pupilSize;
    this.maxIrisMovement = maxIrisMovement;
    this.targetEyeHeight = eyeHeight; // The current height of the eye (initially the eye height)
    this.targetIrisY = y; // The initial Y position of the iris
    this.isClosed = false; // Whether the eye is closed
  }

  // Draw the eye
  display() {
    // Draw the iris first, so it won't be hidden by the eye's shape
    fill(100, 255, 0);
    ellipse(this.x, this.targetIrisY, this.irisSize, this.irisSize);

    // Draw Bezier curves (eye shape) after the iris
    var x1 = this.x - this.eyeWidth / 2 + 5, y1 = this.y; // Start point
    var cx1 = this.x - this.eyeWidth / 2 + 20, cy1 = this.y - this.targetEyeHeight / 2 - 10; // First control point
    var cx2 = this.x + this.eyeWidth / 2 + 8, cy2 = this.y - this.targetEyeHeight / 2 + 2; // Second control point
    var x2 = this.x + this.eyeWidth / 2 - 10, y2 = this.y; // End point

    var x3 = this.x - this.eyeWidth / 2 + 5, y3 = this.y; // Start point
    var cx3 = this.x - this.eyeWidth / 2 + 30, cy3 = this.y + this.targetEyeHeight / 2 - 8; // Third control point
    var cx4 = this.x + this.eyeWidth / 2 - 40, cy4 = this.y + this.targetEyeHeight / 2 + 20; // Fourth control point
    var x4 = this.x + this.eyeWidth / 2 - 10, y4 = this.y; // End point

    // Draw Bezier curves (eye shape)
    bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);  
    bezier(x3, y3, cx3, cy3, cx4, cy4, x4, y4);

    // Draw the pupil
    fill(0);
    var pupilX = map(mouseX, 0, width, this.x - this.maxIrisMovement, this.x + this.maxIrisMovement);
    var pupilY = map(mouseY, 0, height, this.targetIrisY - this.maxIrisMovement, this.targetIrisY + this.maxIrisMovement);
    ellipse(pupilX, pupilY, this.pupilSize, this.pupilSize);

    // Draw the highlight on the pupil
    fill(255);
    noStroke();
    var highlightX = map(mouseX, 0, width, this.x - this.maxIrisMovement, this.x + this.maxIrisMovement) + this.eyeWidth / 12;
    var highlightY = map(mouseY, 0, height, this.targetIrisY - this.maxIrisMovement, this.targetIrisY + this.maxIrisMovement) - this.eyeHeight / 12;
    ellipse(highlightX, highlightY, this.pupilSize / 2, this.pupilSize / 2);
  }

  // Control the eye's closure
  closeEye() {
    if (this.isClosed) {
      this.targetEyeHeight = lerp(this.targetEyeHeight, 0, 0.1); // Gradually decrease eye height
      this.targetIrisY = lerp(this.targetIrisY, this.y + this.eyeHeight / 2, 0.1); // The iris gradually gets covered
    } else {
      this.targetEyeHeight = lerp(this.targetEyeHeight, this.eyeHeight, 0.1); // Restore eye height
      this.targetIrisY = lerp(this.targetIrisY, this.y, 0.1); // The iris gradually restores to its original position
    }
  }

  // Toggle eye closure when mouse is clicked
  toggleEye() {
    if (mouseIsPressed) {
      this.isClosed = !this.isClosed;  // Toggle the eye's closed state
    }
  }
}

// Initialize the eyes
var leftEye;
var rightEye;

// Initialize the year variable
var yearr = 1;

function setup() {
  createCanvas(1200, 400);

  // Create two eye objects
  leftEye = new Eye(350, 200, 200, 100, 80, 40, 10);  // Max radius of iris movement is 40
  rightEye = new Eye(600, 200, 200, 100, 80, 40, 10);  // Max radius of iris movement is 40
}

function draw() {
  // Change the background color, dynamically change as time passes
  let time = millis() / 1000;
  let red = map(sin(time), -1, 1, 0, 255);
  let green = map(cos(time), -1, 1, 0, 255);
  let blue = map(sin(time + PI / 2), -1, 1, 0, 255);
  background(red, green, blue);

  // Control the eye closure animation
  leftEye.toggleEye();  // Toggle the left eye's closed state
  rightEye.toggleEye();  // Toggle the right eye's closed state
  leftEye.closeEye();  // Execute eye closure animation
  rightEye.closeEye();  // Execute eye closure animation

  // Draw the left and right eyes
  leftEye.display();
  rightEye.display();

  // Draw the text boxes
  drawTextBoxes();

  // Draw the year text
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Year" + yearr, width / 2, height - 50);
}

// Draw the text boxes
function drawTextBoxes() {
  let boxWidth = 160;
  let boxHeight = 60;
  let yOffset = 50;

  let labels = ["Sleep Duration", "Study Hours", "Screen Time", "Caffeine Intake", "Physical Activity"];

  for (let i = 0; i < labels.length; i++) {
    let x = 100 + i * (boxWidth + 20);
    fill(75, 100, 225);
    rect(x, yOffset, boxWidth, boxHeight);
    fill(255, 255, 0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(labels[i], x + boxWidth / 2, yOffset + boxHeight / 2);
  }
}

// Update the year when the mouse is clicked
function mousePressed() {
  if (yearr < 4) {
    yearr++;
  }
  console.log(yearr);  // Print the year value, helpful for debugging
}