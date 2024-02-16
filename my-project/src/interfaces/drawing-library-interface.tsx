import p5 from "p5";

export interface DrawingLibrary {
    createCanvas(width: number, height: number): void;
    loadImage(path: string): void;
    image(image: p5.Image, x: number, y: number, width: number, height: number): void;
    random(min: number, max: number): number;
}