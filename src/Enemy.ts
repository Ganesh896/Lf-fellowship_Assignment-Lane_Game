import { canvas, ctx } from "./canvas/game-window";
import { generateRandomNumber } from "./utils/random-number";

export interface IEnemy {
    // img: HTMLImageElement;
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
    // img: HTMLImageElement;
    xpose: number;
    ypose: number;
    width: number;
    height: number;
    dx: number;
    dy: number;
    passedPlayer: boolean;

    constructor(xpose: number, ypose: number, width: number, height: number, dy: number) {
        this.width = width;
        this.height = height;
        this.xpose = xpose;
        this.ypose = generateRandomNumber(-400, 0);
        this.dx = 5;
        this.dy = dy;
        this.passedPlayer = false;
    }

    draw(): void {
        const img = new Image();
        img.src = "./images/obstacle-car1.png";
        ctx.drawImage(img, this.xpose, this.ypose, this.width, this.height);
    }

    updatePosition(lane: number): void {
        this.ypose += this.dy;

        if (this.ypose > canvas.height) {
            this.ypose = generateRandomNumber(-400, 0);
            this.xpose = lane;
            this.passedPlayer = false;
        }

        this.draw();
    }
}
