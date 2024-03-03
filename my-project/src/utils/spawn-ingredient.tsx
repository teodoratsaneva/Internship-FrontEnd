import { P5Drawer } from "../cook-page-components/drawer";
import { IngredientSegment } from "../cook-page-components/ingredient-seg";
import { DrawingLibrary } from "../interfaces/drawing-library-interface";
import { Ingredient } from "../interfaces/ingredient-interface";
import { ingredientIconMap } from "./ingredients-icons";

const invalidIngredientsImages = ["./cute-cat.png", "./cat.png"];

export const spawnIngredient = (ingredients: Ingredient[],
    drawer: P5Drawer,
    timeoutTimes: number,
    x: number,
    y: number,
    canvasWidth: number,
    ingredientsSeg: IngredientSegment[],
    countIngredients: number = 0) => {
    if (countIngredients < ingredients.length) {
        const { title: valueOfIng, amount: ingredientAmount } = ingredients[countIngredients];
        let countAmount = 0;

        const spawnSingleIngredient = () => {
            if (countAmount < ingredientAmount) {
                const ingredient: Ingredient = ingredients[countIngredients];
                const ingredientSeg = new IngredientSegment(
                    x,
                    y,
                    drawer.loadImage(ingredientIconMap[valueOfIng]),
                    drawer,
                    ingredient
                );

                ingredientSeg.reset(canvasWidth);
                ingredientsSeg.push(ingredientSeg);

                if (ingredient.subIngredients?.length! && countAmount === ingredientAmount - 1) {
                    spawnIngredient(ingredient.subIngredients!, drawer, timeoutTimes, x, y, canvasWidth, ingredientsSeg);
                }

                countAmount++;
                setTimeout(spawnSingleIngredient, timeoutTimes);
            }
            else {
                if (countIngredients + 1 < ingredients.length) {
                    setTimeout(() => spawnIngredient(ingredients, drawer, timeoutTimes, x, y, canvasWidth, ingredientsSeg, countIngredients + 1), timeoutTimes);
                }
            }
        };

        spawnSingleIngredient();
    }
};