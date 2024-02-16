import p5 from "p5";
import { DrawingLibrary } from "../interfaces/drawing-library-interface";

export class P5Drawer implements DrawingLibrary {
    private p: p5;

    constructor(p: p5) {
        this.p = p;
    }

    createCanvas(width: number, height: number): void {
        this.p.createCanvas(width, height);
    }

    loadImage(path: string): void {
        this.p.loadImage(path);
    }

    image(image: p5.Image, x: number, y: number, width: number, height: number): void {
        this.p.image(image, x, y, width, height);
    }

    random(min: number, max: number): number {
        return this.p.random(min, max);
    }
}