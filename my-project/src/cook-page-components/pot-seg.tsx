import { P5Drawer } from "./drawer";

const yPos = 0;

export class Pot {
    x: number;
    y: number;
    width: number = 200;
    height: number = 200;
    image: any;
    drawer: P5Drawer;

    constructor(x: number, y: number, image: any, drawer: P5Drawer) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.drawer = drawer;
    }

    dragSegment = (xin: number) => {
        xin = this.drawer.constrain(xin, yPos, this.width);
        this.x = xin;
        this.display();
    };

    display() {
        this.drawer.image(this.image, this.x, this.y, this.width, this.height);
    }
}
