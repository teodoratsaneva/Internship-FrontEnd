import p5 from "p5";
import { DrawingLibrary } from "../interfaces/drawing-library-interface";
import { Ingredient } from "../interfaces/ingredient-interface";
import { IngredientSegment } from "./ingredient-seg";
import { Pot } from "./pot-seg";
import { ingredientIconMap } from "../utils/ingredients-icons";

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

    setImage(
        image: p5.Image,
        x: number,
        y: number,
        width: number,
        height: number
    ): void {
        this.p.image(image, x, y, width, height);
    }

    getRandomNumber(min: number, max: number): number {
        return this.p.random(min, max);
    }

    constrain = (xin: number, yPos: number, width: number) => {
        return this.p.constrain(xin, yPos, this.p.width - width);
    };

    setBackground = (colorValue: string, opacity?: number) => {
        if (opacity !== undefined) {
            this.p.background(parseInt(colorValue), parseInt(colorValue), parseInt(colorValue), opacity);
        } else {
            this.p.background(colorValue);
        }
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
        ingredients: Ingredient[],
        ingredientsSeg: IngredientSegment[],
        timeoutTimes: number,
        invalidIngredientsImages: any,
        x: number,
        y: number,
        invalidIngredient: Ingredient
    ) {
        this.p.setup = () => {
            this.p.createCanvas(canvasWidth, canvasHeight);
            this.p.background(customColor, customColor, customColor, opasity);

            let countIngredients = 0;

            const spawnIngredient = () => {
                if (countIngredients <= ingredients.length) {
                    const { title: valueOfIng, amount: ingredientAmount } = ingredients[countIngredients];

                    let countAmount = 0;

                    const spawnSingleIngredient = () => {
                        if (countAmount < ingredientAmount) {
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
                            countAmount++;
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
                    this.loadImage(invalidIngredientsImages[this.round(this.getRandomNumber(0, invalidIngredientsImages.length - 1))]),
                    this,
                    invalidIngredient
                );

                invalidSeg.reset(canvasWidth);
                ingredientsSeg.push(invalidSeg);

                setTimeout(spawnInvalidIngredient, this.getRandomNumber(4000, 5000));
            };

            spawnInvalidIngredient();
        };
    }

    draw = (
        pausedGame: { current: boolean },
        triggerDiscoMode: (drawer: P5Drawer, discoColor: boolean) =>  void,
        pot: Pot,
        ingredientsSeg: IngredientSegment[],
        discoColor: boolean,
        invalidIngredient: Ingredient,
        timeoutTimes: number,
        hearts: number,
        caughtIngredientsCount: { current: number },
        onCatch: (id: string, count: number) => void,
        canvasHeight: number,
        canvasWidth: number,
        onLifeLoss: () => void
    ) => {
        this.p.draw = () => {
            if (!pausedGame.current) {
                this.clear();
                triggerDiscoMode(this, discoColor);

                pot.dragSegment(this.p.mouseX);

                ingredientsSeg.forEach((ingredientSeg) => {
                    if (ingredientSeg.isVisible && ingredientSeg.collidesWith(pot)) {
                        if (ingredientSeg.ingredient === invalidIngredient && ingredientSeg.collidesWith(pot)) {
                            discoColor = true;
                            setTimeout(() => { discoColor = false; }, timeoutTimes);

                            hearts -= 1;
                            onLifeLoss(hearts);

                            if (hearts === 0) {
                                pausedGame.current = true;
                            }
                        } else {
                            caughtIngredientsCount.current -= 1;

                            onCatch(
                                ingredientSeg.ingredient!.id,
                                caughtIngredientsCount.current
                            );

                            if (caughtIngredientsCount.current === 0) {
                                pausedGame.current = true;
                            }
                        }
                    } else {
                        ingredientSeg.updatePosition(canvasHeight, canvasWidth);
                        ingredientSeg.display();
                    }
                });
            }
        };
    };
}
