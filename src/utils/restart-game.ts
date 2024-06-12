import Enemy from "../Enemy";
import { gameOverWindow, canvas } from "../html-elements";
import { generateRandomNumber } from "./random-number";

export default function restartGame(lanes: number[], enemys: Enemy[]) {
    gameOverWindow.style.display = "none";
    canvas.style.display = "block";
    enemys.forEach((enemy) => {
        const randIndex = generateRandomNumber(0, 2); //to place car on random lane out of 3 lane
        enemy.updatePosition(lanes[randIndex], true); //keeping all enemy cars on begining pos on restart
    });
}
