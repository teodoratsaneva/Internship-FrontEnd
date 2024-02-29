import { IngredientSegment } from "./ingredient-seg";
import { Ingredient } from "../interfaces/ingredient-interface";
import { DrawingLibrary } from "../interfaces/drawing-library-interface";

const invalidIngredientsImages = [
    "./cute-cat.png",
    "./cat.png"
];

const spawnInvalidIngredient = (
    drawer: DrawingLibrary, 
    x: number,
    y: number,
    canvasWidth: number,
    ingredientsSeg: IngredientSegment[],
    invalidIngredient: Ingredient) => {

    const invalidSeg = new IngredientSegment(
        x,
        y,
        drawer.loadImage(invalidIngredientsImages[Math.round(drawer.getRandomNumber(0, invalidIngredientsImages.length - 1))]),
        drawer,
        invalidIngredient
    );

    invalidSeg.reset(canvasWidth);
    ingredientsSeg.push(invalidSeg);

    setTimeout(spawnInvalidIngredient, drawer.getRandomNumber(2000, 3000));
};

export default spawnInvalidIngredient;