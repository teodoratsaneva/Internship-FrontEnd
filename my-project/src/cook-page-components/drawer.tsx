import p5 from "p5";
import { DrawingLibrary } from "../interfaces/drawing-library-interface";
import { Ingredient } from "../interfaces/ingredient-interface";
import { IngredientSegment } from "./ingredient-seg";

export class P5Drawer implements DrawingLibrary {
    p: p5;

    constructor(p: p5) {
        this.p = p;
    }

    createCanvas(width: number, height: number): void {
        this.p.createCanvas(width, height);
    }

    loadImage(path: string): any {
        return this.p.loadImage(path);
    }

    image(
        image: p5.Image,
        x: number,
        y: number,
        width: number,
        height: number
    ): void {
        this.p.image(image, x, y, width, height);
    }

    random(min: number, max: number): number {
        return this.p.random(min, max);
    }

    constrain = (xin: number, yPos: number, width: number) => {
        return this.p.constrain(xin, yPos, this.p.width - width);
    };

    background = (customColor: number | string, opacity?: number) => {
        this.p.background(customColor, customColor, customColor, opacity);
    };

    clear = () => {
        this.p.clear();
    };

    round = (number: number) => {
        return this.p.round(number);
    };

    get width(): number {
        return this.p.width;
    }

    setup(
        canvasWidth: number,
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
        invalidIngredient
    ) {
        this.p.setup = () => {
            this.p.createCanvas(canvasWidth, canvasHeight);
            this.p.background(customColor, customColor, customColor, opasity);

            let countIngredients = 0;

            const spawnIngredient = () => {
                if (countIngredients <= ingredients.length) {
                    const valueOfIng = ingredients[countIngredients].title;
                    const ingredientQuantity = ingredients[countIngredients].quantity;

                    let countQuantity = 0;

                    const spawnSingleIngredient = () => {
                        if (countQuantity < ingredientQuantity) {
                            const ingredient: Ingredient = ingredients[countIngredients];

                            const ingredientSeg = new IngredientSegment(
                                x,
                                y,
                                this.loadImage(ingredientIconMap[valueOfIng]),
                                this,
                                ingredient
                            );

                            ingredientSeg.reset(canvasWidth);
                            ingredientsSeg.push(ingredientSeg);
                            countQuantity++;
                            setTimeout(spawnSingleIngredient, timeoutTimes);
                        } else {
                            countIngredients++;
                            setTimeout(spawnIngredient, timeoutTimes);
                        }
                    };

                    spawnSingleIngredient();
                }
            };

            setTimeout(spawnIngredient, timeoutTimes);

            const spawnInvalidIngredient = () => {

                const invalidSeg = new IngredientSegment(
                    x,
                    y,
                    this.loadImage(invalidIngredientsImages[this.p.round(this.p.random(0, invalidIngredientsImages.length - 1))]),
                    this,
                    invalidIngredient
                );

                invalidSeg.reset(canvasWidth);
                ingredientsSeg.push(invalidSeg);

                setTimeout(spawnInvalidIngredient, this.p.random(4000, 5000));
            };

            spawnInvalidIngredient();
        };
    }

    draw = (
        pausedGame,
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
        canvasWidth
    ) => {
        this.p.draw = () => {
            if (!pausedGame.current) {
                this.clear();
                triggerDiscoMode(discoColor.current, this);

                pot.dragSegment(this.p.mouseX);

                ingredientsSeg.forEach((ingredientSeg) => {
                    if (ingredientSeg.isVisible && ingredientSeg.collidesWith(pot)) {
                        if (ingredientSeg.ingredient === invalidIngredient && ingredientSeg.collidesWith(pot)) {
                            discoColor.current = true;
                            setTimeout(() => { discoColor.current = false; }, timeoutTimes);

                            onLifeLoss();

                            if (hearts.current === 0) {
                                pausedGame.current = true;
                            }
                        } else {
                            ingredientsCount.current -= 1;

                            onCatch(
                                ingredientSeg.ingredient!.id,
                                ingredientsCount.current,
                                this
                            );

                            if (ingredientsCount.current === 0) {
                                pausedGame.current = true;
                            }
                        }
                    } else {
                        ingredientSeg.updateSegmentWhenIsNoCatched(canvasHeight, canvasWidth);
                        ingredientSeg.display();
                    }
                });
            }
        };
    };
};
