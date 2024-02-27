import { IngredientSegment } from "../cook-page-components/ingredient-seg";
import { Pot } from "../cook-page-components/pot-seg";
import { Ingredient } from "./ingredient-interface";

export interface DrawingLibrary {
    loadImage(path: string): any;
    createCanvas(width: number, height: number): any;
    clear(): void;
    width: number;
    background(colorValue: string, opacity?: number): void;
    image(img: any, x: number, y: number, width: number, height: number): void;
    constrain(value: number, min: number, max: number): number;
    setup(canvasWidth: number,
        canvasHeight: number,
        customColor: number,
        opasity: number,
        ingredients: Ingredient[],
        ingredientIconMap: any,
        ingredientsSeg: IngredientSegment[],
        timeoutTimes: number,
        invalidIngredientsImages: any,
        x: number,
        y: number,
        invalidIngredient: Ingredient
        ): void;
    draw(pausedGame: { current: boolean },
        triggerDiscoMode: (p: DrawingLibrary, discoColor: boolean) =>  void,
        pot: Pot,
        ingredientsSeg: IngredientSegment[],
        discoColor: boolean,
        invalidIngredient: Ingredient,
        timeoutTimes: number,
        hearts: { current: number },
        ingredientsCount: { current: number },
        onCatch: (id: string, count: number, p: DrawingLibrary) => void,
        canvasHeight: number,
        canvasWidth: number
        ): void;
}
