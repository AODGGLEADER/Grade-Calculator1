document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', calculateGrade);
    });
});

function calculateGrade() {
    const quarter1 = parseFloat(document.getElementById('quarter1').value) || 0;
    const quarter2 = parseFloat(document.getElementById('quarter2').value) || 0;
    const final = parseFloat(document.getElementById('final').value) || 0;

    const semesterGrade = (quarter1 * 0.4) + (quarter2 * 0.4) + (final * 0.2);
    
    updateResult(semesterGrade);
}

function updateResult(percentage) {
    const result = document.getElementById('result');
    result.textContent = percentage.toFixed(2) + '%';
    
    if (percentage < 50) {
        result.style.color = 'red';
    } else if (percentage < 70) {
        result.style.color = 'yellow';
    } else {
        result.style.color = 'green';
    }
}

const glowCircle = document.getElementById('glow-circle');
let mouseX = 0, mouseY = 0;
let currentColor = { h: 0, s: 100, l: 50 };
let targetColor = { h: 0, s: 100, l: 50 };

function updateColor() {
    targetColor.h = Math.random() * 360;
}

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

function updateCirclePosition() {
    const x = mouseX - 150;
    const y = mouseY - 150;
    glowCircle.style.transform = `translate(${x}px, ${y}px)`;

    // Smooth color transition
    currentColor.h = lerp(currentColor.h, targetColor.h, 0.05);
    const color = `hsl(${currentColor.h}, ${currentColor.s}%, ${currentColor.l}%)`;
    glowCircle.style.backgroundColor = color;

    // Dynamic blur based on mouse speed
    const dx = x - parseFloat(glowCircle.style.left || 0);
    const dy = y - parseFloat(glowCircle.style.top || 0);
    const speed = Math.sqrt(dx * dx + dy * dy);
    const blur = Math.min(50 + speed, 100); // Limit max blur
    glowCircle.style.filter = `blur(${blur}px)`;

    requestAnimationFrame(updateCirclePosition);
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Change color every 2 seconds
setInterval(updateColor, 2000);

// Start the animation
updateCirclePosition();
