import Player from "./Characters/Player";
import Enemy from "./Characters/Enemy";
import { gameOverWindow, canvas } from "./html-elements";
import generateRandomNumber from "./utils/random-number";

// Assuming Player and Enemy have xpose, ypose, width, and height properties

export function detectCollision(player: Player, enemy: Enemy): boolean {
    // Check if the player and enemy overlap
    const playerLeft = player.xpose;
    const playerRight = player.xpose + player.width;
    const playerTop = player.ypose;
    const playerBottom = player.ypose + player.height;

    const enemyLeft = enemy.xpose;
    const enemyRight = enemy.xpose + enemy.width;
    const enemyTop = enemy.ypose;
    const enemyBottom = enemy.ypose + enemy.height;

    return playerRight > enemyLeft && playerLeft < enemyRight && playerBottom > enemyTop && playerTop < enemyBottom;
}

export function restartGame(lanes: number[], enemys: Enemy[]) {
    gameOverWindow.style.display = "none";
    canvas.style.display = "block";
    enemys.forEach((enemy) => {
        const randIndex = generateRandomNumber(0, 2); //to place car on random lane out of 3 lane
        enemy.updatePosition(lanes[randIndex], true); //keeping all enemy cars on begining pos on restart
    });
}
