import { DIMENSIONS } from "../constants/Constants";

export const canvas = document.getElementById("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d")!;

canvas.width = DIMENSIONS.CANVAS__WIDHT;
canvas.height = DIMENSIONS.CANVAS__HEIGHT;
