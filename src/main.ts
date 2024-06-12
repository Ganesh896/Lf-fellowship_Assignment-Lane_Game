import Rectangle from "./shapes/Rectangle";
import { ctx } from "./canvas/game-window";
import { canvas, startButton, reStartButton, startWindow, highScoreEle, currrentScoreEle, gameOverWindow } from "./html-elements";
import Player from "./Player";
import Enemy from "./Enemy";
import { PLAYER__YPOSE } from "./constants/Constants";
import detectCollision from "./utils/detectCollision";
import { generateRandomNumber } from "./utils/random-number";
import restartGame from "./utils/restart-game";

let highScore = 0;
let score = 0;

ctx.fillStyle = "#000";
ctx.fillRect(200, 10, canvas.width, canvas.height);

const player1 = new Player((canvas.width + 120) / 2, PLAYER__YPOSE, 50, 80);

const rectangles: Rectangle[] = [];
const enemys: Enemy[] = [];

// Create and store rectangles
for (let i = 0; i < 5; i++) {
    rectangles.push(new Rectangle((canvas.width + 200) / 3, 145 * i + 5, 15, 100));
    rectangles.push(new Rectangle((canvas.width + 200) / 2, 145 * i + 5, 15, 100));
    rectangles.push(new Rectangle((canvas.width + 300) / 3 + 300, 145 * i + 5, 15, 100));
}

const lanes: number[] = []; //storing random position between each lane

// placing enemy cars on lanes
for (let i = 0; i < 4; i++) {
    let xpos = 0;
    if (i == 0) {
        xpos = canvas.width - 365;
    } else if (i == 1) {
        xpos = canvas.width - 265;
    } else if (i == 2) {
        xpos = canvas.width - 195;
    } else if (i == 3) {
        xpos = 370;
    }
    enemys.push(new Enemy(xpos, 50, 90, 6));
}

let moveRight = false;
let moveLeft = false;

// controller with keys
window.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
        moveRight = true;
    } else if (e.key === "ArrowLeft") {
        moveLeft = true;
    }
});

window.addEventListener("keyup", function (e) {
    if (e.key === "ArrowRight") {
        moveRight = false;
    } else if (e.key === "ArrowLeft") {
        moveLeft = false;
    }
});

function drawScore() {
    ctx.font = "50px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText(`Score: `, 250, 80);

    ctx.font = "50px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(score.toString(), 420, 80);
}

// animate function
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // generating positon on x-axis on each lane
    const leftLane = generateRandomNumber(235, 370);
    const middleLane = generateRandomNumber(canvas.width - 365, canvas.width - 265);
    const rightLane = generateRandomNumber(canvas.width - 195, canvas.width - 85);
    lanes.push(leftLane);
    lanes.push(middleLane);
    lanes.push(rightLane);

    // Redraw the fixed background elements
    ctx.fillStyle = "#000";
    ctx.fillRect(200, 10, canvas.width, canvas.height);

    // drawing road left and right boundary
    ctx.fillStyle = "red";
    ctx.fillRect(200, 10, 30, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(canvas.width - 30, 10, 30, canvas.height);

    // drawing line on road to seperate lane
    ctx.fillStyle = "yellow";
    ctx.fillRect(425, 10, 5, canvas.height);

    ctx.fillStyle = "yellow";
    ctx.fillRect(canvas.width - 210, 10, 5, canvas.height);

    // Update and draw each rectangle
    rectangles.forEach((rectangle) => {
        rectangle.updatePosition();
        rectangle.draw();
    });

    player1.updatePosition(moveRight, moveLeft); //updating player pos on movement

    // if two enemy car get same ypos by random moving one car by 100 back
    for (let i = 0; i < enemys.length; i++) {
        for (let j = i + 1; j < enemys.length; j++) {
            if (Math.abs(enemys[i].ypose - enemys[j].ypose) < enemys[i].height) {
                enemys[i].ypose -= 100;
            }
        }
    }

    // placing enemy car on random lane
    enemys.forEach((enemy) => {
        const randIndex = generateRandomNumber(0, 2);
        enemy.updatePosition(lanes[randIndex]);
    });

    for (let i = 0; i < enemys.length; i++) {
        // checking if the enemy car and player car collide
        if (detectCollision(player1, enemys[i])) {
            if (highScore < score) {
                highScore = score;
            }
            canvas.style.display = "none";
            gameOverWindow.style.display = "flex";
            currrentScoreEle.innerText = "" + score;
            highScoreEle.innerText = "" + highScore;
            return;
        }

        // checking if the enemy car pass the player car y-axis
        if (!enemys[i].passedPlayer && enemys[i].ypose > player1.ypose + player1.height) {
            enemys[i].passedPlayer = true;
            score++;
        }
    }

    drawScore();

    requestAnimationFrame(animate);
}

// Start
startButton?.addEventListener("click", function () {
    startWindow.style.display = "none";
    canvas.style.display = "block";
    animate();
});

// game restart logic
reStartButton.addEventListener("click", function () {
    restartGame(lanes, enemys);
    animate();
    score = 0;
});
