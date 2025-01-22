// game.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const mapContainer = document.getElementById('mapContainer');

// Ashe's attributes
let ashe = {
    x: 100,
    y: 100,
    size: 30,
    health: 100,
    maxHealth: 100,
    level: 1,
    xp: 0,
    speed: 5,
    color: 'green',
    attackPower: 10,
};

// Example NPCs and Buildings
let npcs = [
    { x: 300, y: 300, size: 30, color: 'blue', name: 'NPC 1' },
    { x: 500, y: 500, size: 30, color: 'yellow', name: 'NPC 2' },
];

let buildings = [
    { x: 200, y: 150, width: 100, height: 100, color: '#8B4513' }, // A simple building (brown)
    { x: 600, y: 600, width: 120, height: 120, color: '#D2691E' }, // Another building
];

// Draw the player, NPCs, and buildings
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Buildings
    buildings.forEach(building => {
        ctx.fillStyle = building.color;
        ctx.fillRect(building.x, building.y, building.width, building.height);
    });

    // Draw NPCs
    npcs.forEach(npc => {
        ctx.fillStyle = npc.color;
        ctx.fillRect(npc.x, npc.y, npc.size, npc.size);
    });

    // Draw Ashe
    ctx.fillStyle = ashe.color;
    ctx.fillRect(ashe.x, ashe.y, ashe.size, ashe.size);
}

// Update player's position based on key presses
let keys = {};
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Move player on the map
function updatePlayerPosition() {
    if (keys['ArrowUp']) ashe.y -= ashe.speed;
    if (keys['ArrowDown']) ashe.y += ashe.speed;
    if (keys['ArrowLeft']) ashe.x -= ashe.speed;
    if (keys['ArrowRight']) ashe.x += ashe.speed;
}

// Collision detection with buildings
function checkBuildingCollision() {
    buildings.forEach(building => {
        if (
            ashe.x < building.x + building.width &&
            ashe.x + ashe.size > building.x &&
            ashe.y < building.y + building.height &&
            ashe.y + ashe.size > building.y
        ) {
            alert("You collided with a building!");
        }
    });
}

// Check if Ashe interacts with NPCs
function checkNPCInteraction() {
    npcs.forEach(npc => {
        if (
            ashe.x < npc.x + npc.size &&
            ashe.x + ashe.size > npc.x &&
            ashe.y < npc.y + npc.size &&
            ashe.y + ashe.size > npc.y
        ) {
            alert(`You interacted with ${npc.name}!`);
        }
    });
}

// Main game loop
function gameLoop() {
    updatePlayerPosition();
    checkBuildingCollision();
    checkNPCInteraction();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
