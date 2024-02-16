import p5 from "p5";
import { IngredientSegment } from "./ingredient-seg";

const invalidIngredientsImages = [
    "./cute-cat.png",
    "./cat.png"
];
const invalidIngredient = {
	id: "1",
	quantity: "1",
	title: "Cat",
};

const spawnInvalidIngredient = (p: p5, x, y, canvasWidth, ingredientsSeg) => {

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