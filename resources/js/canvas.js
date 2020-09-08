document.addEventListener("DOMContentLoaded", domloaded, false);

function domloaded() {
  // Canvas variable declaration
  let wp = document.querySelector(".canvasDiv").offsetWidth / 100;
  let hp = 0.8 * wp;
  var canvas = document.getElementById("roboCanvas");
  var ctx = canvas.getContext("2d");

  // State handling variable declaration
  let reqId;
  let start = true;
  let up = true;

  // Image and object array declaration
  var dumbell = new Image();
  dumbell.src = "resources/img/weight.png";
  let animatedObjects = [];

  // Animated rectangle initiation
  function AnimatedRect(color, x, y, w, h, degdx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.color = color;
    this.deg = 0;
    this.degdx = degdx;

    this.draw = function () {
      ctx.save();
      ctx.fillStyle = this.color;
      ctx.translate(this.x, this.y);
      ctx.rotate((this.deg * Math.PI) / 180);
      ctx.fillRect(0, 0, this.w, this.h);
      ctx.restore();
    };

    this.animate = function () {
      if (up) {
        this.deg >= 45 ? (up = false) : 0;
        this.deg += this.degdx;
      } else {
        if (this.deg <= 0) {
          up = true;
          return true;
        }
        this.deg -= this.degdx;
      }
      this.draw();
      return false;
    };
  }

  // Animated weight initiation
  function AnimatedWeight(x, y, w, h, degdx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.deg = 0;
    this.degdx = degdx;

    this.draw = function () {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.deg * Math.PI) / 180);
      ctx.drawImage(dumbell, 0, 0, this.w, this.h);
      ctx.restore();
    };

    this.animate = function () {
      if (up) {
        this.deg >= 45 ? (up = false) : 0;
        this.deg += this.degdx;
      } else {
        if (this.deg <= 0) {
          up = true;
          return true;
        }
        this.deg -= this.degdx;
      }
      this.draw();
      return false;
    };
  }

  /**
   * Draw a rectangle on the screen
   *
   * @param string color
   * @param int x
   * @param int y
   * @param int w
   * @param int h
   *
   * @return void
   */
  function drawRect(color, x, y, w, h) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  }

  /**
   * Draw a circle on the screen
   *
   * @param string color
   * @param int x
   * @param int y
   * @param int r
   *
   * @return void
   */
  function drawCircle(color, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000000";
    ctx.stroke();
  }

  /**
   * Control the bicep-curl animation
   */
  function update() {
    start = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    redraw();
    for (let i = 0; i < animatedObjects.length; i++) {
      let stop = animatedObjects[i].animate();
      if (stop) {
        window.cancelAnimationFrame(reqId);
        start = true;
        redraw();
        return;
      }
    }
    reqId = window.requestAnimationFrame(update);
  }

  /**
   * Redraw the entire canvas
   */
  function redraw() {
    wp = document.querySelector(".canvasDiv").offsetWidth / 100;
    hp = 0.8 * wp;
    canvas.width = wp * 100;
    canvas.height = hp * 100;

    // Top
    drawRect("blue", wp * 54, hp * 5, wp * 2, hp * 5);
    drawCircle("yellow", wp * 55, hp * 3.8, hp * 2);

    // Head
    drawRect("grey", wp * 45, hp * 10, wp * 20, hp * 20);
    drawRect("red", wp * 50, hp * 22, wp * 10, hp * 3);
    drawRect("blue", wp * 52.5, hp * 30, wp * 5, hp * 7);
    drawCircle("yellow", wp * 50, hp * 15, hp * 2.5);
    drawCircle("yellow", wp * 60, hp * 15, hp * 2.5);

    // Body
    drawRect("grey", wp * 40, hp * 37, wp * 30, hp * 45);

    // Feet
    drawRect("red", wp * 45, hp * 82, wp * 5, hp * 10);
    drawRect("blue", wp * 60, hp * 82, wp * 5, hp * 10);
    drawCircle("yellow", wp * 47.5, hp * 92, hp * 4);
    drawCircle("yellow", wp * 62.5, hp * 92, hp * 4);

    // Arms
    drawRect("red", wp * 70, hp * 45, wp * 7, hp * 7);
    drawRect("red", wp * 33, hp * 45, wp * 7, hp * 7);
    if (start) {
      drawRect("blue", wp * 35, hp * 52, wp * 3, hp * 10);
      drawRect("blue", wp * 35, hp * 58, wp * 3, hp * 13);
      drawRect("blue", wp * 72, hp * 58, wp * 3, hp * 13);
      drawRect("blue", wp * 72, hp * 52, wp * 3, hp * 10);

      //Empty animation elements array and rebuild
      animatedObjects.length = 0;
      animatedObjects.push(new AnimatedRect("blue", wp * 35, hp * 52, wp * 3, hp * 8, 0.1));
      animatedObjects.push(new AnimatedRect("blue", wp * 35, hp * 58, wp * 3, hp * 13, 1));
      animatedObjects.push(new AnimatedRect("blue", wp * 72, hp * 58, wp * 3, hp * 13, 1));
      animatedObjects.push(new AnimatedRect("blue", wp * 72, hp * 52, wp * 3, hp * 8, 0.1));
      animatedObjects.push(new AnimatedWeight(wp * 65, hp * 55, wp * 20, hp * 20, 1));
      animatedObjects.push(new AnimatedWeight(wp * 26, hp * 55, wp * 20, hp * 20, 1));
      ctx.drawImage(dumbell, wp * 65, hp * 55, wp * 20, hp * 20);
      ctx.drawImage(dumbell, wp * 26, hp * 55, wp * 20, hp * 20);
    }
  }

  // Redraw the canvas upon resizing the screen
  $(window).resize(function () {
    redraw();
  });

  // Listen for clicks on the canvas to start the animation
  canvas.addEventListener("click", update, false);

  // Upon loading the dumbell image, draw the dumbells onto the screen
  dumbell.onload = function () {
    ctx.drawImage(dumbell, wp * 65, hp * 55, wp * 20, hp * 20);
    ctx.drawImage(dumbell, wp * 26, hp * 55, wp * 20, hp * 20);
  };

  // The initial drawing of the screen
  redraw();
}
