import { IngredientSegment } from "../cook-page-components/ingredient-seg";
import { Pot } from "../cook-page-components/pot-seg";
import { Ingredient } from "./ingredient-interface";

export interface DrawingLibrary {
    loadImage(path: string): any;
    createCanvas(width: number, height: number): any;
    clear(): void;
    width: number;
    round (number: number): void;
    setBackground(colorValue: string, opacity?: number): void;
    setImage(img: any, x: number, y: number, width: number, height: number): void;
    getRandomNumber(min: number, max: number): number;
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
        triggerDiscoMode: (drawer: DrawingLibrary, discoColor: boolean) => void,
        pot: Pot,
        ingredientsSeg: IngredientSegment[],
        discoColor: boolean,
        invalidIngredient: Ingredient,
        timeoutTimes: number,
        hearts: { current: number },
        ingredientsCount: { current: number },
        onCatch: (id: string, count: number, drawer: DrawingLibrary) => void,
        canvasHeight: number,
        canvasWidth: number
    ): void;
}
