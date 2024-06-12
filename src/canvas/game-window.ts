import { DIMENSIONS } from "../constants/Constants";
import { canvas } from "../html-elements";

export const ctx = canvas.getContext("2d")!;

canvas.width = DIMENSIONS.CANVAS__WIDHT;
canvas.height = DIMENSIONS.CANVAS__HEIGHT;
