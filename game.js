// 获取画布和上下文
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 设置画布大小
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// 游戏配置
const config = {
    gridSize: 20,
    initialSpeed: 150,
    speedIncrease: 2,
    speedLevels: {
        1: { base: 200, text: '很慢' },
        2: { base: 150, text: '较慢' },
        3: { base: 100, text: '中等' },
        4: { base: 75, text: '较快' },
        5: { base: 50, text: '很快' }
    }
};

// 游戏状态
let snake = [];
let food = {};
let direction = 'right';
let nextDirection = 'right';
let score = 0;
let gameLoop = null;
let gameSpeed = config.initialSpeed;
let currentSpeedLevel = 3;

// 初始化游戏
function initGame() {
    // 初始化蛇
    snake = [
        { x: 3, y: 1 },
        { x: 2, y: 1 },
        { x: 1, y: 1 }
    ];
    
    // 生成第一个食物
    generateFood();
    
    // 重置游戏状态
    direction = 'right';
    nextDirection = 'right';
    score = 0;
    gameSpeed = config.speedLevels[currentSpeedLevel].base;
    updateScore();
}

// 生成食物
function generateFood() {
    const maxX = Math.floor(canvas.width / config.gridSize) - 1;
    const maxY = Math.floor(canvas.height / config.gridSize) - 1;
    
    do {
        food = {
            x: Math.floor(Math.random() * maxX),
            y: Math.floor(Math.random() * maxY)
        };
    } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
}

// 更新分数
function updateScore() {
    document.getElementById('score').textContent = score;
}

// 游戏主循环
function gameUpdate() {
    // 更新方向
    direction = nextDirection;
    
    // 获取蛇头
    const head = { ...snake[0] };
    
    // 根据方向移动蛇头
    switch (direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
    }
    
    // 检查是否撞墙
    if (head.x < 0 || head.x >= canvas.width / config.gridSize ||
        head.y < 0 || head.y >= canvas.height / config.gridSize) {
        gameOver();
        return;
    }
    
    // 检查是否撞到自己
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }
    
    // 将新头部添加到蛇身
    snake.unshift(head);
    
    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        updateScore();
        generateFood();
        // 加快游戏速度，但保持相对速度级别
        const baseSpeed = config.speedLevels[currentSpeedLevel].base;
        gameSpeed = Math.max(30, baseSpeed - (score / 50) * config.speedIncrease);
        clearInterval(gameLoop);
        gameLoop = setInterval(gameUpdate, gameSpeed);
    } else {
        // 如果没有吃到食物，移除尾部
        snake.pop();
    }
    
    // 绘制游戏
    draw();
}

// 绘制游戏
function draw() {
    // 清空画布
    ctx.fillStyle = '#f5f5f7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制蛇
    ctx.fillStyle = '#0071e3';
    snake.forEach((segment, index) => {
        if (index === 0) {
            // 蛇头用深色
            ctx.fillStyle = '#0051a2';
        } else {
            ctx.fillStyle = '#0071e3';
        }
        ctx.fillRect(
            segment.x * config.gridSize,
            segment.y * config.gridSize,
            config.gridSize - 1,
            config.gridSize - 1
        );
    });
    
    // 绘制食物
    ctx.fillStyle = '#ff3b30';
    ctx.beginPath();
    ctx.arc(
        food.x * config.gridSize + config.gridSize / 2,
        food.y * config.gridSize + config.gridSize / 2,
        config.gridSize / 2 - 1,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

// 游戏结束
function gameOver() {
    clearInterval(gameLoop);
    alert(`游戏结束！得分：${score}`);
    initGame();
}

// 键盘控制
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction !== 'down') nextDirection = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') nextDirection = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') nextDirection = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') nextDirection = 'right';
            break;
    }
});

// 移动端控制
document.getElementById('upBtn').addEventListener('click', () => {
    if (direction !== 'down') nextDirection = 'up';
});
document.getElementById('downBtn').addEventListener('click', () => {
    if (direction !== 'up') nextDirection = 'down';
});
document.getElementById('leftBtn').addEventListener('click', () => {
    if (direction !== 'right') nextDirection = 'left';
});
document.getElementById('rightBtn').addEventListener('click', () => {
    if (direction !== 'left') nextDirection = 'right';
});

// 速度控制
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');

speedSlider.addEventListener('input', (e) => {
    currentSpeedLevel = parseInt(e.target.value);
    const speedInfo = config.speedLevels[currentSpeedLevel];
    speedValue.textContent = speedInfo.text;
    
    // 如果游戏正在进行，更新速度
    if (gameLoop) {
        const baseSpeed = speedInfo.base;
        gameSpeed = Math.max(30, baseSpeed - (score / 50) * config.speedIncrease);
        clearInterval(gameLoop);
        gameLoop = setInterval(gameUpdate, gameSpeed);
    }
});

// 开始游戏按钮
document.getElementById('startBtn').addEventListener('click', () => {
    if (gameLoop) {
        clearInterval(gameLoop);
    }
    initGame();
    gameLoop = setInterval(gameUpdate, gameSpeed);
});

// 窗口大小改变时重置画布大小
window.addEventListener('resize', () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    draw();
}); 