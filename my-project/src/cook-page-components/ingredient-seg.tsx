import { Segment } from "../interfaces/segment-interface";
import p5 from "p5";
import { Ingredient } from "../interfaces/ingredient-interface";

export class IngredientSeg implements Segment {
    x: number;
    y: number;
    width: number;
    height: number;
    speedY: number;
    isVisible: boolean;
    image: p5.Image;
    canvasWidth: number;
    canvasHeight: number;
    p: p5;
    ingredient: Ingredient;

    constructor(x: number, y: number, width: number, height: number, canvasWidth: number, canvasHeight: number, image: p5.Image, p: p5, ingredient: Ingredient) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speedY = 4;
        this.isVisible = true;
        this.image = image;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.p = p;
        this.ingredient = ingredient;
    }

    update() {
        if (this.isVisible) {
            this.y += this.speedY;
            if (this.y > this.canvasHeight) {
                this.reset();
            }
        }
    }

    display() {
        if (this.isVisible) {
            this.p.image(
                this.image,
                this.x,
                this.y,
                this.width,
                this.height
            );
        }
    }

    collidesWith(otherObject: {
        x: number;
        y: number;
        width: number;
        height: number;
    }) {
        const currObjHeight = this.height - 100;
        const currObjWidth = this.width - 20;

        if (
            (otherObject.x < this.x + currObjWidth &&
                otherObject.x + otherObject.width > this.x + currObjWidth &&
                otherObject.y + otherObject.height > this.y + currObjHeight &&
                otherObject.y < this.y + currObjHeight) ||
            (otherObject.x < this.x &&
                otherObject.x + otherObject.width > this.x &&
                otherObject.y + otherObject.height > this.y + currObjHeight &&
                otherObject.y < this.y + currObjHeight) ||
            (otherObject.x < this.x + currObjWidth &&
                otherObject.x + otherObject.width > this.x + currObjWidth &&
                otherObject.y < this.y &&
                otherObject.y + otherObject.height > this.y) ||
            (otherObject.x < this.x &&
                otherObject.x + otherObject.width > this.x &&
                otherObject.y > this.y &&
                otherObject.y + otherObject.height < this.y)
        ) {
            this.isVisible = false;
            const currQuantity = parseInt(this.ingredient.quantity) - 1;
            this.ingredient.quantity = currQuantity.toString();

            return true;
        } else {
            return false;
        }
    }

    reset() {    
        this.x = this.p.random(0, this.canvasWidth - this.width);
        this.y = 0;
    }
}
