import { ctx } from "./canvas/game-window";
import { canvas } from "./html-elements";

export interface IPlayer {
    xpose: number;
    ypose: number;
    width: number;
    height: number;
    dx: number;

    draw: () => void;

    updatePosition: (right: boolean, left: boolean) => void;
}

export default class Player implements IPlayer {
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
        ctx.drawImage(img, this.xpose, this.ypose, this.width, this.height); //initally player at this pos
    }

    updatePosition(right: boolean, left: boolean): void {
        if (right) {
            this.xpose += this.dx; //if pressed right arrow
        } else if (left) {
            this.xpose -= this.dx; //if pressed left arrow
        }

        // keeping car inside left boundry of the road/canvas window
        if (this.xpose < 235) {
            this.xpose = 235;
        }

        // keeping car inside right boundry of the road/canvas window
        if (this.xpose > canvas.width - 85) {
            this.xpose = canvas.width - 85;
        }
        
        this.draw();
    }
}
