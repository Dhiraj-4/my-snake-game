document.addEventListener('DOMContentLoaded', () => {
    //score Board
    const scoreBoard = document.createElement('div');
    let score = 0;
    scoreBoard.id = "socre-board";
    scoreBoard.textContent = "Score: " + score;
    const gameArena = document.getElementById('game-arena');
    document.body.insertBefore(scoreBoard,gameArena);

    // start game button
    const startGame = document.createElement('button');
    startGame.id = 'startGame';
    startGame.textContent = "START GAME";
    document.body.appendChild(startGame);

    let snake = [ {x: 160, y: 200}, {x: 140, y: 200}, {x: 120, y: 200}];

    let food = {x: 300, y: 200};

    let gameStart = false;

    const cellsize = 20;
    const arenaSize = 600;

    let gameSpeed = 200;
    let dx = cellsize;
    let dy = 0;

    //Start the game
    startGame.addEventListener('click', () => {
        startGame.style.display = 'none';
        if(!gameStart){
            gameStart = true;
            document.addEventListener('keydown', direction);
            gameLoop();
        }
    });

    function drawDiv ( x , y , className) {
        let div = document.createElement('div');
        div.classList = className;
        div.style.top = y + 'px';
        div.style.left = x + 'px';

        return div;
    }

    function drawSnakeAndFood() {
        gameArena.innerHTML = '';

        for(let i = 0; i < snake.length; i++){
            gameArena.appendChild(drawDiv(snake[i].x, snake[i].y, 'snake'));
        }
        gameArena.appendChild(drawDiv(food.x, food.y, 'food')); 
    }

    function direction(e) {
        const goUp = dy === -cellsize;
        const goDown = dy === cellsize;
        const goLeft = dx === -cellsize;
        const goRight = dx === cellsize;

        if(e.key === "ArrowDown" && !goUp) {
            dx = 0;
            dy = cellsize;
        } else if(e.key === 'ArrowUp' && !goDown) {
            dx = 0;
            dy = -cellsize;
        } else if(e.key === 'ArrowRight' && !goLeft){
            dx = cellsize;
            dy = 0;
        } else if (e.key === 'ArrowLeft' && !goRight){
            dx = -cellsize;
            dy = 0;
        }
    }

    function isGameOver() {
        //snake collision check
        for(let i = 1; i < snake.length; i++){
            if(snake[0].x === snake[i].x && snake[0].y ===snake[i].y) {
                return true;
            }
        }

        //wall collision check
        const hitLeftWall = snake[0].x < 0;
        const hitRightWall = snake[0].x > arenaSize - (cellsize+20);
        const hitTopWall = snake[0].y < 0;
        const hitBottomWall = snake[0].y > arenaSize - (cellsize+20);

        return hitBottomWall || hitTopWall || hitLeftWall || hitRightWall;
    }

    function gameLoop() {
        intervalId = setInterval(function () {
            if(isGameOver()) {
                clearInterval(intervalId);
                gameStart = false;
                alert('Game Over' + '\n' + 'Your Score: ' + score);
                return;
            }
            updateSanke();
            drawSnakeAndFood();
            console.log(gameSpeed,"is it updated")
        },gameSpeed);
    }

    function updateSanke() {
        let newHead = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(newHead);

        if(newHead.x === food.x && newHead.y === food.y){
            score += 10;
            if(gameSpeed > 50 ) {
                clearInterval(intervalId);
                gameSpeed -= 10;
                gameLoop();
            }
            updateScore(score);
            moveFood();
        } else {
            snake.pop();
        }

    }

    function updateScore(score) {
        scoreBoard.textContent = "Score: " + score;
    }

    function moveFood() {
        let newX , newY;

        do{
            newX = Math.floor(Math.random() * 29) * cellsize;
            newY = Math.floor(Math.random() * 29) * cellsize;

        }while(snake.some(snake => snake.x == newX, snake.y == newY));

        console.log(newX, newY);
        food.x = newX;
        food.y = newY;
    }
})