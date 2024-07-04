
const MIN_SPEED = 1.0;
const MAX_SPEED = 1.5;

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

class Blob {
  constructor(el) {
    this.el = el;
    const boundingRect = this.el.getBoundingClientRect();
    this.size = boundingRect.width;
    this.initialX = randomNumber(0, window.innerWidth - this.size);
    this.initialY = randomNumber(0, window.innerHeight - this.size);
    this.el.style.top = `${this.initialY}px`;
    this.el.style.left = `${this.initialX}px`;
    this.vx = randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1);
    this.vy = randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1);
    this.x = this.initialX;
    this.y = this.initialY;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x >= window.innerWidth - this.size || this.x <= 0) {
      this.vx *= -1;
    }
    if (this.y >= window.innerHeight - this.size || this.y <= 0) {
      this.vy *= -1;
    }
  }

  move() {
    this.el.style.transform = `translate(${this.x - this.initialX}px, ${this.y - this.initialY}px)`;
  }
}

function initBlobs() {
  const blobEls = document.querySelectorAll('.bouncing-blob');
  const blobs = Array.from(blobEls).map(blobEl => new Blob(blobEl));

  function update() {
    requestAnimationFrame(update);
    blobs.forEach(blob => {
      blob.update();
      blob.move();
    });
  }

  requestAnimationFrame(update);
}

window.addEventListener('scroll', function() {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var scrollHeight = document.documentElement.scrollHeight;
  var clientHeight = document.documentElement.clientHeight;
  var scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 500;

  // Définir l'opacité en fonction du pourcentage de défilement
  document.querySelector('.white-background').style.opacity = scrollPercentage >= 90 ? '1' : '0';
});

initBlobs();

