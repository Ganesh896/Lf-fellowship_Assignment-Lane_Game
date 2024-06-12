import { ctx } from "../canvas/game-window";
import generateRandomNumber from "../utils/random-number";
import { canvas } from "../html-elements";

export interface IEnemy {
    xpose: number;
    ypose: number;
    width: number;
    height: number;
    dx: number;
    passedPlayer: boolean;

    draw: () => void;

    updatePosition: (lane: number) => void;
}

export default class Enemy implements IEnemy {
    xpose: number;
    ypose: number;
    width: number;
    height: number;
    dx: number;
    dy: number;
    passedPlayer: boolean;

    constructor(xpose: number, width: number, height: number, dy: number) {
        this.width = width;
        this.height = height;
        this.xpose = xpose;
        this.ypose = generateRandomNumber(-400, 0); //keeping car at random pos on y-axis
        this.dx = 5;
        this.dy = dy;
        this.passedPlayer = false; //to check if player passed this car or not to update score, initially not passed so false
    }

    draw(): void {
        const img = new Image();
        img.src = "./images/obstacle-car1.png";
        ctx.drawImage(img, this.xpose, this.ypose, this.width, this.height);
    }

    updatePosition(lane: number, restart = false): void {
        this.ypose += this.dy;

        if (this.ypose > canvas.height || restart) {
            this.ypose = generateRandomNumber(-400, 0);
            this.xpose = lane;
            this.passedPlayer = false;
        }

        this.draw();
    }
}
