// game.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ashe (player) and enemy attributes
let ashe = {
    x: 50,
    y: 50,
    size: 30,
    health: 100,
    maxHealth: 100,
    color: 'green',
    speed: 5,
    name: 'Ashe'
};

let enemy = {
    x: 400,
    y: 300,
    size: 30,
    health: 100,
    maxHealth: 100,
    color: 'red',
    name: 'Zarok'
};

// Battle variables
let isInBattle = false;
let actionText = "Ashe's journey begins...";

// Handle key presses for movement
let keys = {};
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Update the player's position based on key presses
function updatePlayerPosition() {
    if (keys['ArrowUp']) ashe.y -= ashe.speed;
    if (keys['ArrowDown']) ashe.y += ashe.speed;
    if (keys['ArrowLeft']) ashe.x -= ashe.speed;
    if (keys['ArrowRight']) ashe.x += ashe.speed;
}

// Update the health bars in the UI
function updateHealthBars() {
    const playerHealthPercentage = (ashe.health / ashe.maxHealth) * 100;
    const enemyHealthPercentage = (enemy.health / enemy.maxHealth) * 100;
    
    document.getElementById('playerHealthBar').style.width = `${playerHealthPercentage}%`;
    document.getElementById('enemyHealthBar').style.width = `${enemyHealthPercentage}%`;
}

// Update the battle action text in the UI
function updateActionText(text) {
    document.getElementById('actionText').textContent = text;
}

// Battle actions (attack)
function attackEnemy() {
    let damage = Math.floor(Math.random() * 20) + 5;
    enemy.health -= damage;
    updateActionText(`You attacked Zarok for ${damage} damage!`);
    if (enemy.health <= 0) {
        enemy.health = 0;
        updateActionText("You defeated Zarok!");
        isInBattle = false; // End the battle
    }
}

function healPlayer() {
    let heal = Math.floor(Math.random() * 15) + 5;
    ashe.health += heal;
    if (ashe.health > ashe.maxHealth) ashe.health = ashe.maxHealth;
    updateActionText(`You healed for ${heal} health!`);
}

function runAway() {
    updateActionText("You ran away from the battle!");
    isInBattle = false;
}

// Check for collision between player and enemy
function checkCollision() {
    return (
        ashe.x < enemy.x + enemy.size &&
        ashe.x + ashe.size > enemy.x &&
        ashe.y < enemy.y + enemy.size &&
        ashe.y + ashe.size > enemy.y
    );
}

// Draw the player, enemy, and background
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Ashe
    ctx.fillStyle = ashe.color;
    ctx.fillRect(ashe.x, ashe.y, ashe.size, ashe.size);

    // Draw enemy
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);

    // Check for battle
    if (checkCollision() && !isInBattle) {
        isInBattle = true;
        updateActionText("A wild Zarok appeared!");
    }

    if (isInBattle) {
        ctx.font = '24px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('In Battle with Zarok!', 350, 50);
    }

    updateHealthBars();
}

// Event listeners for battle buttons
document.getElementById('attackBtn').addEventListener('click', () => {
    if (isInBattle) {
        attackEnemy();
    }
});

document.getElementById('itemBtn').addEventListener('click', () => {
    if (isInBattle) {
        healPlayer();
    }
});

document.getElementById('runBtn').addEventListener('click', () => {
    if (isInBattle) {
        runAway();
    }
});

// Main game loop
function gameLoop() {
    updatePlayerPosition();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
