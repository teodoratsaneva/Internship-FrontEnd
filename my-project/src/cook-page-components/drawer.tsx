import p5 from "p5";
import { DrawingLibrary } from "../interfaces/drawing-library-interface";
import { spawnIngredient } from "../utils/spawn-ingredient";
import spawnInvalidIngredient from "./spawn-invalid-ingredient";

export class P5Drawer implements DrawingLibrary {
    p: p5;

    constructor(p: p5) {
        this.p = p;
    }

    createCanvas(width: number, height: number): void {
        this.p.createCanvas(width, height);
    }

    loadImage(path: string): Image {
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

    background = (customColor: number, opacity: number) => {
        this.p.background(customColor, customColor, customColor, opacity);
    };

    clear = () => {
        this.p.clear();
    };

    round = (number: number) => {
        return this.p.round(number);
    };

    width = () => {
        this.p.width;
    };

    setup(canvasWidth: number, canvasHeight: number, customColor: number, opacity: number, timeoutTimes: number) {
        this.p.setup = () => {
            this.createCanvas(canvasWidth, canvasHeight);
            this.background(customColor, opacity);

            setTimeout(spawnIngredient, timeoutTimes);

            setTimeout(spawnInvalidIngredient, this.random(4000, 5000));
        };
    }

    draw = (
        //pausedGame,
        triggerDiscoMode,
        pot,
        ingredientsSeg,
        invalidIngredient,
        onLifeLoss,
        discoColor,
        hearts,
        onCatch,
        ingredientsCount,
        canvasHeight,
        canvasWidth
    ) => {
        this.p.draw = () => {
            //if (!pausedGame.current) {
                this.clear();
                triggerDiscoMode(discoColor.current, this.p);

                pot.dragSegment(this.p.mouseX);
                ingredientsSeg.forEach((ingredient) => {
                    if (ingredient.isVisible && ingredient.collidesWith(pot)) {
                        if (
                            ingredient.ingredient === invalidIngredient &&
                            ingredient.collidesWith(pot)
                        ) {
                            onLifeLoss();

                            if (hearts.current === 0) {
                                pausedGame.current = true;
                            }
                        } else {
                            ingredientsCount.current -= 1;

                            onCatch(
                                ingredient.ingredient!.id,
                                ingredientsCount.current
                            );

                            if (ingredientsCount.current === 0) {
                                pausedGame.current = true;
                            }
                        }
                    } else {
                        ingredient.updateSegmentWhenIsNoCatched(
                            canvasHeight,
                            canvasWidth
                        );
                        ingredient.display();
                    }
                });
            //}
        };
    };
}