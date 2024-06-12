import Player from "../Player";
import Enemy from "../Enemy";

// Assuming Player and Enemy have xpose, ypose, width, and height properties

export default function detectCollision(player: Player, enemy: Enemy): boolean {
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
