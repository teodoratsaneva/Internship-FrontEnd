import { Segment } from "../interfaces/segment-interface";
import p5 from "p5";

export class Pot implements Segment {
    x: number;
    y: number;
    width: number;
    height: number;
    image: p5.Image;
    p: p5;

    constructor(x: number, image: p5.Image, p: p5) {
        this.x = x;
        this.y = 850;
        this.width = 200;
        this.height = 200;
        this.image = image;
        this.p = p;
    }

    dragSegment = (xin: number) => {
        xin = this.p.constrain(xin, 0, this.p.width - 200);
        this.x = xin;
        this.display();
    };

    display() {
        this.p.image(this.image, this.x, this.y, this.width, 200);
    }
}