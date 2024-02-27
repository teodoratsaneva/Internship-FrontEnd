import { IngredientSegment } from "./ingredient-seg";
import { P5Drawer } from "./drawer";
import { Ingredient } from "../interfaces/ingredient-interface";

const invalidIngredientsImages = [
    "./cute-cat.png",
    "./cat.png"
];
const invalidIngredient: Ingredient = {
	id: "1",
	amount: 1,
	title: "Cat",
};

const spawnInvalidIngredient = (
    p: P5Drawer, 
    x: number,
    y: number,
    canvasWidth: number,
    ingredientsSeg: IngredientSegment[]) => {

    const invalidSeg = new IngredientSegment(
        x,
        y,
        p.loadImage(invalidIngredientsImages[p.round(p.random(0, invalidIngredientsImages.length - 1))]),
        p,
        invalidIngredient
    );

    invalidSeg.reset(canvasWidth);
    ingredientsSeg.push(invalidSeg);

    setTimeout(spawnInvalidIngredient, p.random(2000, 3000));
};

export default spawnInvalidIngredient;