import { Ingredient } from "./ingredient-interface";

export interface DrawingLibrary {
    loadImage(path: string): any;
    createCanvas(width: number, height: number): any;
    clear(): void;
    width: number;
    round (number: number): number;
    setBackground(colorValue: string, opacity?: number): void;
    setImage(img: any, x: number, y: number, width: number, height: number): void;
    getRandomNumber(min: number, max: number): number;
    constrain(value: number, min: number, max: number): number;
    setup(ingredients: Ingredient[]): void;
    draw(pausedGame: { current: boolean },
		triggerDiscoMode: (drawer: any, isDiscoColor: boolean) => void,
		isDiscoColor: boolean,
		caughtIngredientsCount: { current: number },
		onCatch: (id: string, count: number) => void,
		onLifeLoss: () => void,
        isWonGame: { current: boolean}
    ): void;
}
