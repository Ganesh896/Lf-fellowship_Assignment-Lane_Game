import { canvas, ctx } from "./canvas/game-window";

export interface IPlayer {
    // img: HTMLImageElement;
    xpose: number;
    ypose: number;
    width: number;
    height: number;
    dx: number;

    draw: () => void;

    updatePosition: (right: boolean, left: boolean) => void;
}

export default class Player implements IPlayer {
    // img: HTMLImageElement;
    xpose: number;
    ypose: number;
    width: number;
    height: number;
    dx: number;

    constructor(xpose: number, ypose: number, width: number, height: number) {
        this.width = width;
        this.height = height;
        this.xpose = xpose;
        this.ypose = ypose;
        this.dx = 5;
    }

    draw(): void {
        const img = new Image();
        img.src = "./images/player1.png";
        ctx.drawImage(img, this.xpose, this.ypose, this.width, this.height);
    }

    updatePosition(right: boolean, left: boolean): void {
        if (right) {
            this.xpose += this.dx;
        } else if (left) {
            this.xpose -= this.dx;
        }

        if (this.xpose < 210) {
            this.xpose = 210;
        }

        if (this.xpose > canvas.width - 100) {
            this.xpose = canvas.width - 100;
        }
        this.draw();
    }
}
