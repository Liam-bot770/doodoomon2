const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let square = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 30,
    color: 'blue',
    speed: 5
};

let creatures = [];
let creatureCount = 5;

// Generate random creatures
for (let i = 0; i < creatureCount; i++) {
    creatures.push({
        x: Math.random() * (canvas.width - 30),
        y: Math.random() * (canvas.height - 30),
        size: 20,
        color: 'green'
    });
}

function drawSquare() {
    ctx.fillStyle = square.color;
    ctx.fillRect(square.x, square.y, square.size, square.size);
}

function drawCreatures() {
    creatures.forEach(creature => {
        ctx.fillStyle = creature.color;
        ctx.fillRect(creature.x, creature.y, creature.size, creature.size);
    });
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSquare();
    drawCreatures();
}

function moveSquare(event) {
    switch (event.key) {
        case 'ArrowUp':
            square.y -= square.speed;
            break;
        case 'ArrowDown':
            square.y += square.speed;
            break;
        case 'ArrowLeft':
            square.x -= square.speed;
            break;
        case 'ArrowRight':
            square.x += square.speed;
            break;
    }
    // Keep the square within the canvas bounds
    square.x = Math.max(0, Math.min(canvas.width - square.size, square.x));
    square.y = Math.max(0, Math.min(canvas.height - square.size, square.y));
}

document.addEventListener('keydown', moveSquare);

function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
