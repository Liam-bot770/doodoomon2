// game.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const mapContainer = document.getElementById('mapContainer');

// Ashe's attributes
let ashe = {
    x: 100,
    y: 100,
    width: 30,
    height: 30,
    speed: 5,
    image: new Image(),
};

// NPC and Building Data
let npcs = [
    { x: 300, y: 300, width: 30, height: 30, name: 'NPC 1', interacted: false },
    { x: 500, y: 500, width: 30, height: 30, name: 'NPC 2', interacted: false },
];

let buildings = [
    { x: 200, y: 150, width: 100, height: 100, color: '#8B4513', name: 'Shop' },
    { x: 600, y: 600, width: 120, height: 120, color: '#D2691E', name: 'Inn' },
];

// Player sprite
ashe.image.src = 'path_to_ashe_sprite.png'; // Use a sprite image for Ashe

// Load NPC and building images (you can replace these with real images later)
let npcImage = new Image();
npcImage.src = 'path_to_npc_sprite.png'; // Replace with actual NPC sprite image

let buildingImage = new Image();
buildingImage.src = 'path_to_building_sprite.png'; // Replace with actual building sprite

// Draw the player, NPCs, and buildings
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw buildings
    buildings.forEach(building => {
        ctx.fillStyle = building.color;
        ctx.drawImage(buildingImage, building.x, building.y, building.width, building.height);
    });

    // Draw NPCs
    npcs.forEach(npc => {
        ctx.drawImage(npcImage, npc.x, npc.y, npc.width, npc.height);
    });

    // Draw Ashe
    ctx.drawImage(ashe.image, ashe.x, ashe.y, ashe.width, ashe.height);
}

// Player movement
let keys = {};
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

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
            ashe.x + ashe.width > building.x &&
            ashe.y < building.y + building.height &&
            ashe.y + ashe.height > building.y
        ) {
            alert(`You entered the ${building.name}!`);
        }
    });
}

// Check interaction with NPCs
function checkNPCInteraction() {
    npcs.forEach(npc => {
        if (
            ashe.x < npc.x + npc.width &&
            ashe.x + ashe.width > npc.x &&
            ashe.y < npc.y + npc.height &&
            ashe.y + ashe.height > npc.y
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
