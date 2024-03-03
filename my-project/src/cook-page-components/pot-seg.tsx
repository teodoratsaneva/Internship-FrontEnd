const yPos = 0;
const width = 200;
const height = 200;

export class Pot {
    x: number;
    y: number;
    width: number = width;
    height: number = height;
    image: any;
    constrain: (xin: number, yPos: number, width: number) => number;
	setImage:  (image: any,
		x: number,
		y: number,
		width: number,
		height: number) => void;

    constructor(x: number, y: number, image: any, constrain: (xin: number, yPos: number, width: number) => number, setImage: (image: any,
		x: number,
		y: number,
		width: number,
		height: number) => void) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.constrain = constrain;
        this.setImage = setImage;
    }

    dragSegment = (xPos: number) => {
        xPos = this.constrain(xPos, yPos, this.width);
        this.x = xPos;
        this.display();
    };

    display() {
        this.setImage(this.image, this.x, this.y, this.width, this.height);
    }
}
