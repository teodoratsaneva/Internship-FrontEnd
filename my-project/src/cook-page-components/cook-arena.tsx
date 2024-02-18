import { useEffect, useRef } from "react";
import p5 from "p5";
import { Pot } from "./pot-seg";
import { IngredientSegment } from "./ingredient-seg";
import { ingredientIconMap } from "../utils/ingredients-icons";
import { Ingredient } from "../interfaces/ingredient-interface";

const x = 0;
const y = 0;
const canvasHeight = 1035;
const canvasWidth = 1330;
const timeoutTimes = 2000;
const customColor = 255;
const opasity = 0;
const invalidIngredientsImages = [
    "./cute-cat.png",
    "./cat.png"
];
const invalidIngredient = {
	id: "1",
	quantity: "1",
	title: "Cat",
};

const CookArena = (props: {
	ingredients: Ingredient[],
	onCatch,
	triggerDiscoMode,
	onLifeLoss,
	hearts,
	ingredientsCount
}) => {
	const { ingredients, onCatch, triggerDiscoMode, onLifeLoss, hearts, ingredientsCount } = props;
	const discoColor = useRef(false);
	const pausedGame = useRef(false);

	useEffect(() => {
		const cookArenaSketch = (p: p5) => {
			const potImage = p.loadImage("./pot.png");
			const pot = new Pot(p.width / 2, potImage, p);
			const ingredientsSeg: IngredientSegment[] = [];

			p.setup = () => {
				p.createCanvas(canvasWidth, canvasHeight);
				p.background(customColor, customColor, customColor, opasity);

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
									p.loadImage(ingredientIconMap[valueOfIng]),
									p,
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
						p.loadImage(invalidIngredientsImages[p.round(p.random(0, invalidIngredientsImages.length - 1))]),
						p,
						invalidIngredient
					);
				
					invalidSeg.reset(canvasWidth);
					ingredientsSeg.push(invalidSeg);
				
					setTimeout(spawnInvalidIngredient, p.random(4000, 5000));
				};

				spawnInvalidIngredient();
			};

			p.draw = () => {
				if(!pausedGame.current){
					p.clear();
					triggerDiscoMode(discoColor.current, p);

					pot.dragSegment(p.mouseX);
					ingredientsSeg.forEach((ingredient) => {
						if (ingredient.isVisible && ingredient.collidesWith(pot)) {
							if (ingredient.ingredient === invalidIngredient && ingredient.collidesWith(pot)) {
								//discoColor.current = true;
								//setTimeout(() => {discoColor.current = false;}, timeoutTimes);

								onLifeLoss();

								if (hearts.current === 0) {
									pausedGame.current = true;
								}
							} else {
								ingredientsCount.current -= 1;

								onCatch(
									ingredient.ingredient!.id,
									ingredientsCount.current, 
									p
								);

								if(ingredientsCount.current === 0)
								{
									pausedGame.current = true;
								}
							}
						} else {
							ingredient.updateSegmentWhenIsNoCatched(canvasHeight, canvasWidth);
							ingredient.display();
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
