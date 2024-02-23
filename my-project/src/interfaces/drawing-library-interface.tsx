export interface DrawingLibrary {
    loadImage(path: string): any;
    createCanvas(width: number, height: number): any;
    clear(): void;
    width: number;
    background(r: number, g: number, b: number, a: number): void;
    image(img: any, x: number, y: number, width: number, height: number): void;
    constrain(value: number, min: number, max: number): number;
    setup(canvasWidth: number,
        canvasHeight: number,
        customColor: number,
        opasity: number,
        ingredients,
        ingredientIconMap,
        ingredientsSeg,
        timeoutTimes,
        invalidIngredientsImages,
        x,
        y,
        invalidIngredient): void;
    draw(pausedGame,
        triggerDiscoMode,
        pot,
        ingredientsSeg,
        discoColor,
        invalidIngredient,
        timeoutTimes,
        onLifeLoss,
        hearts,
        ingredientsCount,
        onCatch,
        canvasHeight,
        canvasWidth): void;
}
