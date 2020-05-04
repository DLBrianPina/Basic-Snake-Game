// Inicializa variáveis importantes
let
    canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d"),
    score_el = document.querySelector(".score"),
    snake = [],
    snake_length = 5,
    direction = '',
    direction_queue = '',
    grid_size = 20,
    tile_count = 20,
    cellX = [],
    cellY = [],
    food = {
        x: 0,
        y: 0
    },
    snake_color = "lime",
    food_color = "red",
    bg_color = "#222222",
    score = 0;


// Define tamanho do canvas dependo das variáveis de tamanho da grid e da quantidade de espaços
canvas.width = grid_size * tile_count;
canvas.height = grid_size * tile_count;

// Inicializa os espaços da grid
for (let i = 0; i < tile_count; i++) {
    cellX.push(i);
    cellY.push(i);
}

// Foca o canvas ao iniciar
canvas.setAttribute('tabindex', 1);
canvas.focus();

// Algoritimo aabb para detecção de colisões
const aabb = (x1, y1, x2, y2) => {
    if (x1 == x2 && y1 == y2) {
        return true;
    } else {
        return false;
    }
}

// Autoexplicativo
const drawSquare = (x, y, color) => {
    context.fillStyle = color;
    context.fillRect(x, y, grid_size, grid_size);
}

const createFood = () => {
    food.x = cellX[Math.floor(Math.random() * cellX.length)] * grid_size; // Posição aleatória da array X
    food.y = cellY[Math.floor(Math.random() * cellY.length)] * grid_size; // Posição aleatória da array Y
    // Checando por colisões com a cobra
    for (i = 0; i < snake.length; i++) {
        if (snake[i].x == food.x && snake[i].y == food.y) {
            createFood();
        }
    }
}

const drawFood = () => {
    drawSquare(food.x, food.y, food_color);
}

const drawBg = (color) => {
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

// Cria a cobra e inicializa suas coordenadas
const createSnake = () => {
    snake = [];
    for (let i = snake_length; i > 0; i--) {
        snake.push({
            x: i * grid_size,
            y: 0
        });
    }
}

// Desenha cada quadrado da cobra

const drawSnake = () => {
    for (let i = 0; i < snake.length; i++) {
        drawSquare(snake[i].x, snake[i].y, snake_color);
    }
}

const keyPressed = k => {
    if (k == 37 && direction != 'right') {
        direction_queue = 'left';
    } else if (k == 38 && direction != 'down') {
        direction_queue = 'up';
    } else if (k == 39 && direction != 'left') {
        direction_queue = 'right';
    } else if (k == 40 && direction != 'top') {
        direction_queue = 'down'
    }
}

const moveSnake = () => {
    var x = snake[0].x;
    var y = snake[0].y;

    direction = direction_queue;

    if (direction == 'right') {
        x += grid_size;
    } else if (direction == 'left') {
        x -= grid_size;
    } else if (direction == 'up') {
        y -= grid_size;
    } else if (direction == 'down') {
        y += grid_size;
    }

    var tail = snake.pop();
    tail.x = x;
    tail.y = y;
    snake.unshift(tail);
}


// Game loop
const game = () => {
    let head = snake[0];
    // Colisões com a parede
    if (head.x < 0 || head.x > (tile_count - 1) * grid_size ||
        head.y < 0 || head.y > (tile_count - 1) * grid_size) {
        alert("Você perdeu")
        drawBg();
        createSnake();
        drawSnake();
        createFood();
        drawFood();
        direction_queue = 'right';
        score = 0;
    }
    
    for (let i = 1; i < snake.length; i++) {
        if (head.x == snake[i].x && head.y == snake[i].y) {
            alert("Você perdeu");
            drawBg();
            createSnake();
            drawSnake();
            createFood();
            drawFood();
            direction_queue = 'right';
            score = 0;
        }
    }

    // Encontro com a comida
    if (head.x == food.x && head.y == food.y) {
        snake[snake.length] = {
            x: head.x,
            y: head.y
        };
        createFood();
        drawFood();
        score += 10;
    }


    canvas.onkeydown = e => {
        e = e || window.event;
        keyPressed(e.keyCode);
    }

    drawBg(bg_color);
    score_el.innerHTML = score;
    drawSnake();
    drawFood();
    drawSquare(head.x, head.y, "white");
    moveSnake();
}

const newGame = () => {
    direction = 'right';
    direction_queue = 'right';
    createSnake();
    createFood();
    let loop;

    if (typeof loop != 'undefined') {
        clearInterval(loop);
    } else {
        loop = setInterval(game, 75);
    }
}
newGame();