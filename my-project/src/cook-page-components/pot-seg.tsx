import { DrawingLibrary } from "../interfaces/drawing-library-interface";

const yPos = 0;
const width = 200;
const height = 200;

export class Pot {
    x: number;
    y: number;
    width: number = width;
    height: number = height;
    image: any;
    drawer: DrawingLibrary;

    constructor(x: number, y: number, image: any, drawer: DrawingLibrary) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.drawer = drawer;
    }

    dragSegment = (xPos: number) => {
        xPos = this.drawer.constrain(xPos, yPos, this.width);
        this.x = xPos;
        this.display();
    };

    display() {
        this.drawer.setImage(this.image, this.x, this.y, this.width, this.height);
    }
}
