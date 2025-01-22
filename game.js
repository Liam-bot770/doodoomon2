// game.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ashe's attributes
let ashe = {
    x: 50,
    y: 50,
    size: 30,
    health: 100,
    maxHealth: 100,
    level: 1,
    xp: 0,
    speed: 5,
    color: 'green',
    attackPower: 10,
};

// Enemy attributes
let enemy = {
    x: 400,
    y: 300,
    size: 30,
    health: 50,
    maxHealth: 50,
    attackPower: 5,
    color: 'red',
    name: 'Wild Zarok',
};

// Battle flags and text display
let isInBattle = false;
let actionText = "Ashe's journey begins...";
let battleText = document.getElementById('actionText');
let playerXP = document.getElementById('playerXP');
let playerLevel = document.getElementById('playerLevel');

// Handle key presses for movement
let keys = {};
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Update player's position
function updatePlayerPosition() {
    if (keys['ArrowUp']) ashe.y -= ashe.speed;
    if (keys['ArrowDown']) ashe.y += ashe.speed;
    if (keys['ArrowLeft']) ashe.x -= ashe.speed;
    if (keys['ArrowRight']) ashe.x += ashe.speed;
}

// Update health bars in the UI
function updateHealthBars() {
    const playerHealthPercentage = (ashe.health / ashe.maxHealth) * 100;
    const enemyHealthPercentage = (enemy.health / enemy.maxHealth) * 100;
    
    document.getElementById('playerHealthBar').style.width = `${playerHealthPercentage}%`;
    document.getElementById('enemyHealthBar').style.width = `${enemyHealthPercentage}%`;
}

// Level up Ashe
function levelUp() {
    if (ashe.xp >= 100) {
        ashe.level++;
        ashe.xp = 0;
        ashe.maxHealth += 20;
        ashe.attackPower += 5;
        battleText.textContent = `Ashe leveled up! Now at Level ${ashe.level}`;
        playerLevel.textContent = ashe.level;
    }
}

// Perform a battle attack
function attackEnemy() {
    let damage = Math.floor(Math.random() * ashe.attackPower) + 5;
    enemy.health -= damage;
    battleText.textContent = `Ashe attacked Zarok for ${damage} damage!`;

    if (enemy.health <= 0) {
        enemy.health = 0;
        battleText.textContent = `You defeated Zarok!`;
        ashe.xp += 50; // Gain XP after victory
        levelUp();
        isInBattle = false;
    }
}

// Enemy attacks Ashe
function enemyAttack() {
    let damage = Math.floor(Math.random() * enemy.attackPower) + 5;
    ashe.health -= damage;
    battleText.textContent += `\nZarok attacks Ashe for ${damage} damage!`;

    if (ashe.health <= 0) {
        ashe.health = 0;
        battleText.textContent += "\nAshe has been defeated!";
        isInBattle = false;
    }
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

// Update the battle action text in the UI
function updateActionText(text) {
    battleText.textContent = text;
}

// Draw Ashe and the enemy
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Ashe
    ctx.fillStyle = ashe.color;
    ctx.fillRect(ashe.x, ashe.y, ashe.size, ashe.size);

    // Draw enemy
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);

    updateHealthBars();
}

// Event listeners for battle actions
document.getElementById('attackBtn').addEventListener('click', () => {
    if (isInBattle) {
        attackEnemy();
        enemyAttack();
    }
});

document.getElementById('itemBtn').addEventListener('click', () => {
    if (isInBattle) {
        // Implement healing or item use
        battleText.textContent = "You used an item to heal!";
        ashe.health += 20;
        if (ashe.health > ashe.maxHealth) ashe.health = ashe.maxHealth;
    }
});

document.getElementById('runBtn').addEventListener('click', () => {
    if (isInBattle) {
        updateActionText("You ran away from the battle.");
        isInBattle = false;
    }
});

// Main game loop
function gameLoop() {
    updatePlayerPosition();
    if (checkCollision() && !isInBattle) {
        isInBattle = true;
        updateActionText("A wild Zarok appeared! Battle starts!");
    }

    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

