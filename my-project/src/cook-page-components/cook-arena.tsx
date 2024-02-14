import { useEffect, useRef } from "react";
import p5 from "p5";
import { Pot } from "./pot-seg";
import { IngredientSeg } from "./ingredient-seg";
import { ingredientIconMap } from "../utils/ingredients-icons";
import { Ingredient } from "../interfaces/ingredient-interface";

const CookArena = (props: {
	ingredients: Ingredient[];
	onCatch;
	checkDiscoMode;
	loseOneLive;
	hearts;
}) => {
	const { ingredients, onCatch, checkDiscoMode, loseOneLive, hearts } = props;
	const imgWidth = 100;
	const imgHeight = 100;
	const x = 0;
	const y = 0;
	const canvasHeight = 1035;
	const canvasWidth = 1330;
	const discoColor = useRef(false);
	const pausedGame = useRef(false);
	const allIngredientsCount = ingredients.reduce(
		(total, ingredient) => total + parseInt(ingredient.quantity),
		0
	);
	const ingredientsCount = useRef(allIngredientsCount);

	useEffect(() => {
		const cookArenaSketch = (p: p5) => {
			const potImage = p.loadImage("./pot.png");
			const pot = new Pot(p.width / 2, potImage, p);
			const ingredientsSeg: IngredientSeg[] = [];
			const invalidIngredient = {
				id: "1",
				quantity: "1",
				title: "Cat",
			};

			p.setup = () => {
				p.createCanvas(1330, 1035);
				p.strokeWeight(9);
				p.stroke(255, 100);
				p.background(255, 255, 255, 0);

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
					const catImage =
						p.round(p.random(1, 2)) === 1
							? "./cat.png"
							: "./cute-cat.png";

					const invalidSeg = new IngredientSeg(
						x,
						y,
						imgWidth,
						imgHeight,
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
				if (!pausedGame.current) {
					p.clear();
					checkDiscoMode(discoColor.current, p);

					pot.dragSegment(p.mouseX);
					ingredientsSeg.forEach((ingredient) => {
						if (
							!(
								ingredient.isVisible &&
								ingredient.collidesWith(pot)
							)
						) {
							ingredient.update();
							ingredient.display();
						} else if (
							ingredient.ingredient === invalidIngredient &&
							ingredient.collidesWith(pot)
						) {
							discoColor.current = true;
							setTimeout(() => {
								discoColor.current = false;
							}, 1000);

							if (hearts === 0) {
								pausedGame.current = true;
							}

                            loseOneLive();
						} else {
							ingredientsCount.current =
								ingredientsCount.current - 1;

                            if (ingredientsCount.current === 0) {
                                pausedGame.current = true;
                            }

							onCatch(
								ingredient.ingredient!.id,
								ingredientsCount.current
							);
						}
					});
				}
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
