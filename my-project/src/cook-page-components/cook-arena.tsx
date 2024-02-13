import p5 from "p5";
import { useEffect } from "react";
import { Pot } from "./pot-seg";
import { IngredientSeg } from "./ingredient-seg";
import { ingredientIconMap } from "../utils/ingredients-icons";
import { Ingredient } from "../interfaces/ingredient-interface";

const CookArena = (props: {
    ingredients: Ingredient[], onCatch
}) => {
    const { ingredients, onCatch } = props;

    useEffect(() => {
        const cookArenaSketch = (p: p5) => {
            let pot: Pot;
            const ingredientsSeg: IngredientSeg[] = [];

            p.setup = () => {
                p.createCanvas(1330, 1035);
                p.strokeWeight(9);
                p.stroke(255, 100);

                const potImage = p.loadImage("./pot.png");
                pot = new Pot(p.width / 2, potImage, p);

                let countIngredients = 0;

                const spawnIngredient = () => {
                    if (countIngredients < ingredients.length + 1) {
                        const valueOfIng = ingredients[countIngredients].title;
                        const ingredientQuantity = parseInt(ingredients[countIngredients].quantity);

                        let countQuantity = 0;

                        const spawnSingleIngredient = () => {
                            if (countQuantity < ingredientQuantity) {
                                const ingredient = new IngredientSeg(
                                    0,
                                    0,
                                    90,
                                    90,
                                    1330,
                                    1035,
                                    p.loadImage(ingredientIconMap[valueOfIng]),
                                    p,
                                    ingredients[countIngredients]
                                );

                                ingredient.reset();
                                ingredientsSeg.push(ingredient);
                                countQuantity++;

                                setTimeout(spawnSingleIngredient, 2000);
                            } else {
                                countIngredients++;

                                setTimeout(spawnIngredient, 2000);
                            }
                        };

                        spawnSingleIngredient();
                    }
                };

                setTimeout(spawnIngredient, 2000);
            };

            p.draw = () => {
                p.clear();
                p.background(255, 255, 255, 0);

                pot.dragSegment(p.mouseX);

                ingredientsSeg.forEach((ingredient) => {
                    if (
                        !(ingredient.isVisible && ingredient.collidesWith(pot))
                    ) {
                        ingredient.update();
                        ingredient.display();
                    }
                    else
                    {
                        onCatch(ingredient.ingredient.id);
                    }
                });
            };
        };

        new p5(
            cookArenaSketch,
            document.querySelector(".arena") as HTMLElement
        );
    }, []);

    return <div className="arena"></div>;
};

export default CookArena;