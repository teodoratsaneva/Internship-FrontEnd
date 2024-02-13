import p5 from "p5";
import { useEffect } from "react";
import { Pot } from "./pot-seg";
import { IngredientSeg } from "./ingredient-seg";
import { ingredientIconMap } from "../utils/ingredients-icons";
import { Ingredient } from "../interfaces/ingredient-interface";

const CookArena = (props: { ingredients: Ingredient[]; onCatch }) => {
	const { ingredients, onCatch } = props;
    const imgWidth = 90;
    const imgHeight = 90;
    const x = 0;
    const y = 0;
    const canvasHeight = 1035;
    const canvasWidth = 1330;

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
						const ingredientQuantity = parseInt(
							ingredients[countIngredients].quantity
						);

						let countQuantity = 0;

						const spawnSingleIngredient = () => {
							if (countQuantity < ingredientQuantity) {
								const ingredient: Ingredient =
									ingredients[countIngredients];

								const ingredientSeg = new IngredientSeg(
									x,
									y,
									imgWidth,
									imgHeight,
									canvasWidth,
									canvasHeight,
									p.loadImage(ingredientIconMap[valueOfIng]),
									p,
									ingredient
								);

								ingredientSeg.reset();
								ingredientsSeg.push(ingredientSeg);
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

				const spawnInvalidIngredient = () => {
                    const invalidIngredient = {
                        id: "1",
                        quantity: "1",
                        title: "Cat",
                    };
                
                    const catImage = p.round(p.random(1, 2)) === 1 ? "./cat.png" : "./cutecat.png";
                    const invalImgHeight = catImage === "./cat.png" ? 130 : 90;
                
                    const invalidSeg = new IngredientSeg(
                        x,
                        y,
                        imgWidth,
                        invalImgHeight,
                        canvasWidth,
                        canvasHeight,
                        p.loadImage(catImage),
                        p,
                        invalidIngredient
                    );
                
                    invalidSeg.reset();
                    ingredientsSeg.push(invalidSeg);
                
                    setTimeout(spawnInvalidIngredient, p.random(5000, 6000));
                };
                
                spawnInvalidIngredient();
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
					} else {
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
