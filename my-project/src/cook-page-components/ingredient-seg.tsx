import { Ingredient } from "../interfaces/ingredient-interface";
import { P5Drawer } from "./drawer";

const reduceHightWith = 100;
const reduceWidthWith = 20;

export class IngredientSegment {
    x: number;
    y: number;
    width: number = 100;
    height: number = 100;
    speedY: number = 4;
    isVisible: boolean = true;
    image: any;
    p: P5Drawer;
    ingredient?: Ingredient | null;
    
    constructor(
        x: number,
        y: number,
        image: any,
        p: P5Drawer,
        ingredient: Ingredient,
    ) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.p = p;
        this.ingredient = ingredient;
    }

    updateSegmentWhenIsNoCatched(canvasHeight: number, canvasWidth: number) {
        if (this.isVisible) {
            this.y += this.speedY;
            if (this.y > canvasHeight) {
                this.reset(canvasWidth);
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
        const currObjHeight = this.height - reduceHightWith;
        const currObjWidth = this.width - reduceWidthWith;

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

            return true;
        }

        return false;
    }

    reset(canvasWidth: number) {
        this.x = this.p.random(0, canvasWidth - this.width);
        this.y = 0;
    }
}