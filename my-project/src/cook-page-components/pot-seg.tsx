import p5 from "p5";

const yPos = 0;
export class Pot{
    x: number;
    y: number = 850;
    width: number = 200;
    height: number = 200;
    image: p5.Image;
    p: p5;

    constructor(x: number, image: p5.Image, p: p5) {
        this.x = x;
        this.image = image;
        this.p = p;
    }

    dragSegment = (xin: number) => {
        xin = this.p.constrain(xin, yPos, this.p.width - this.width);
        this.x = xin;
        this.display();
    };

    display() {
        this.p.image(this.image, this.x, this.y, this.width, this.height);
    }
}