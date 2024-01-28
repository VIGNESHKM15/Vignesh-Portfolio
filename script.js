document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
    const gridSize = 20;
    let snake = [{ x: 2, y: 2 }];
    let direction = "right";
    let food = getRandomFoodPosition();

    function createBoard() {
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                board.appendChild(cell);
            }
        }
    }

    function renderSnake() {
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => cell.classList.remove("snake"));

        snake.forEach(segment => {
            const index = segment.x + segment.y * gridSize;
            cells[index].classList.add("snake");
        });
    }

    function renderFood() {
        const cells = document.querySelectorAll(".cell");
        const index = food.x + food.y * gridSize;
        cells[index].classList.add("food");
    }

    function getRandomFoodPosition() {
        return {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
        };
    }

    function moveSnake() {
        const head = Object.assign({}, snake[0]);

        switch (direction) {
            case "up":
                head.y = (head.y - 1 + gridSize) % gridSize;
                break;
            case "down":
                head.y = (head.y + 1) % gridSize;
                break;
            case "left":
                head.x = (head.x - 1 + gridSize) % gridSize;
                break;
            case "right":
                head.x = (head.x + 1) % gridSize;
                break;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            food = getRandomFoodPosition();
        } else {
            snake.pop();
        }
    }

    function handleKeyPress(event) {
        switch (event.key) {
            case "ArrowUp":
                direction = "up";
                break;
            case "ArrowDown":
                direction = "down";
                break;
            case "ArrowLeft":
                direction = "left";
                break;
            case "ArrowRight":
                direction = "right";
                break;
        }
    }

    function checkCollision() {
        const head = snake[0];
        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === head.x && snake[i].y === head.y) {
                return true;
            }
        }
        return false;
    }

    function updateGame() {
        moveSnake();
        renderSnake();
        renderFood();

        if (checkCollision()) {
            alert("Game Over! You collided with yourself.");
            resetGame();
        }

        setTimeout(updateGame, 200);
    }

    function resetGame() {
        snake = [{ x: 2, y: 2 }];
        direction = "right";
        food = getRandomFoodPosition();
        updateGame();
    }

    createBoard();
    document.addEventListener("keydown", handleKeyPress);
    updateGame();
});
