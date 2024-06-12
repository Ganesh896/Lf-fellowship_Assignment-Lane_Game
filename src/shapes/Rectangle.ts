import { DIMENSIONS } from "../constants/Constants";
import { ctx } from "../canvas/game-window";

export interface IRectangle {
    xpose: number;
    ypose: number;
    width: number;
    height: number;
    dx: number;
    dy: number;

    draw: () => void;

    updatePosition: () => void;
}

export default class Rectangle implements IRectangle {
    xpose: number;
    ypose: number;
    width: number;
    height: number;
    dx: number;
    dy: number;

    constructor(xpose: number, ypose: number, width: number, height: number) {
        this.width = width;
        this.height = height;
        this.xpose = xpose;
        this.ypose = ypose;
        this.dx = 0;
        this.dy = 4; // setting initial speed
    }

    get getWidth(): number {
        return this.width;
    }

    get getHeight(): number {
        return this.height;
    }

    set setWidth(x: number) {
        this.width = x;
    }

    set setHeight(y: number) {
        this.height = y;
    }

    draw(): void {
        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.fillRect(this.xpose, this.ypose, this.width, this.height);
    }

    updatePosition(): void {
        this.ypose += this.dy;

        if (this.ypose > DIMENSIONS.CANVAS__HEIGHT) {
            this.ypose = 0 - this.height - 10; // Reset position to the top
        }
    }
}
