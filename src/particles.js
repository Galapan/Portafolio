// Particle Background Animation - Grain / Sand effect tuned to image
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');


// Resize handling
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // recreate static noise when size changes
    createStaticNoise();
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Utility: linear interpolate between two numbers
function lerp(a, b, t) { return a + (b - a) * t; }

// Utility: interpolate colors (r,g,b)
function lerpColor(c1, c2, t) {
    return [
        Math.round(lerp(c1[0], c2[0], t)),
        Math.round(lerp(c1[1], c2[1], t)),
        Math.round(lerp(c1[2], c2[2], t))
    ];
}

// Color stops (RGB) used across canvas left (pink/purple) -> right (blue)
const colorLeft = [155, 89, 182];    // muted purple
const colorMid = [110, 48, 145];     // deeper purple
const colorRight = [88, 145, 255];   // soft blue

// Particle class - many small grains
class Particle {
    constructor(width, height) {
        this.reset(width, height);
    }

    reset(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 1.1 + 0.3; // tiny grain
        this.baseSpeed = Math.random() * 0.2 + 0.02;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * this.baseSpeed;
        this.vy = Math.sin(angle) * this.baseSpeed;
        this.opacity = Math.random() * 0.45 + 0.08;
        this.seed = Math.random();
    }

    update(w, h) {
        // very slow drifting
        this.x += this.vx + Math.sin(this.seed + Date.now() * 0.00002) * 0.02;
        this.y += this.vy + Math.cos(this.seed + Date.now() * 0.00002) * 0.02;

        // wrap
        if (this.x < -2) this.x = w + 2;
        if (this.x > w + 2) this.x = -2;
        if (this.y < -2) this.y = h + 2;
        if (this.y > h + 2) this.y = -2;
    }

    draw(ctx, w) {
        // color by horizontal position: left -> mid -> right
        const t = Math.max(0, Math.min(1, this.x / w));
        let rgb;
        if (t < 0.5) {
            rgb = lerpColor(colorLeft, colorMid, t * 2);
        } else {
            rgb = lerpColor(colorMid, colorRight, (t - 0.5) * 2);
        }

        ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create many particles for fine grain similar to image
let particles = [];
let particleCount = Math.floor((window.innerWidth * window.innerHeight) / 4000); // density scales with screen
particleCount = Math.max(400, Math.min(1400, particleCount));



function createStaticNoise() {
    noiseCanvas = document.createElement('canvas');
    noiseCanvas.width = canvas.width;
    noiseCanvas.height = canvas.height;
    noiseCtx = noiseCanvas.getContext('2d');

    const imageData = noiseCtx.createImageData(noiseCanvas.width, noiseCanvas.height);
    const buffer = new Uint8ClampedArray(imageData.data.length);
    for (let i = 0; i < buffer.length; i += 4) {
        // subtle luminance grain
        const v = Math.floor(Math.random() * 40); // 0..39
        buffer[i] = v;     // R
        buffer[i + 1] = v; // G
        buffer[i + 2] = v; // B
        buffer[i + 3] = Math.floor(Math.random() * 60); // alpha small
    }
    imageData.data.set(buffer);
    noiseCtx.putImageData(imageData, 0, 0);
}
createStaticNoise();

// Main animation loop
function animate() {
    // subtle background fill to create fade / motion trail
    ctx.fillStyle = 'rgba(12, 7, 25, 0.12)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw a soft gradient overlay to mimic the image color spread
    const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    g.addColorStop(0, 'rgba(84, 36, 107, 0.12)'); // left purple tint
    g.addColorStop(0.5, 'rgba(18, 10, 34, 0.18)'); // center darker
    g.addColorStop(1, 'rgba(78, 92, 230, 0.12)'); // right blue glow
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw particles (grain)
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update(canvas.width, canvas.height);
        p.draw(ctx, canvas.width);
    }

    // paint static noise with very low globalAlpha for film grain
    if (noiseCanvas) {
        ctx.save();
        ctx.globalAlpha = 0.04; // subtle
        ctx.drawImage(noiseCanvas, -1 * ((Date.now() / 3000) % 3), -1 * ((Date.now() / 4000) % 3));
        ctx.restore();
    }

    requestAnimationFrame(animate);
}

animate();