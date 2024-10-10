const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Move the origin to the center of the canvas
ctx.translate(300, 300);

// Get references to the sliders
const sizeSlider = document.getElementById('size');
const widthSlider = document.getElementById('width');

// Floating shapes array
const shapes = [];

// Function to draw the heart
function drawHeart(size, width) {
    // Clear the canvas before drawing
    ctx.clearRect(-300, -300, 600, 600);
    
    // Draw the floating shapes
    for (const shape of shapes) {
        shape.draw();
        shape.update();
    }
    
    // Draw the heart
    ctx.beginPath();
    for (let t = 0; t <= 2 * Math.PI; t += 0.01) {
        const x = size * 16 * Math.pow(Math.sin(t), 3);
        const y = -width * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = '#ff66a3';  // Fill color for the heart
    ctx.fill();
}

// Class for floating shapes
class Shape {
    constructor(x, y, radius, color, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off the edges
        if (this.x + this.radius > 300 || this.x - this.radius < -300) {
            this.speedX = -this.speedX;
        }
        if (this.y + this.radius > 300 || this.y - this.radius < -300) {
            this.speedY = -this.speedY;
        }
    }
}


// Event listeners for sliders
sizeSlider.addEventListener('input', () => {
    const size = parseFloat(sizeSlider.value);
    const width = parseFloat(widthSlider.value);
    drawHeart(size, width);
});

widthSlider.addEventListener('input', () => {
    const size = parseFloat(sizeSlider.value);
    const width = parseFloat(widthSlider.value);
    drawHeart(size, width);
});

// Animation loop
function animate() {
    drawHeart(parseFloat(sizeSlider.value), parseFloat(widthSlider.value));
    requestAnimationFrame(animate);
}

// Start the animation
animate();

// Button to navigate to photos
document.getElementById('photoButton').addEventListener('click', () => {
    window.location.href = 'photos.html'; // Redirect to photos page
});
