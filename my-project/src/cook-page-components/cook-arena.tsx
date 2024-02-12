import p5 from "p5";
import { useEffect } from "react";
import { Pot } from "./pot-seg";
import { IngredientSeg } from "./ingredient-seg";
import { ingredientIconMap } from "../utils/ingredients-icons";
import { Recipe } from "../interfaces/recipe-interface";

const CookArena = (props: {recipe: Recipe, updateRecipe}) => {
	const { recipe, updateRecipe } = props;

	useEffect(() => {
		const cookArenaSketch = (p: p5) => {
			let pot: Pot;
			const ingredients: IngredientSeg[] = [];
	
			p.setup = () => {
				p.createCanvas(1330, 1035);
				p.strokeWeight(9);
				p.stroke(255, 100);
	
				const potImage = p.loadImage("./pot.png");
				pot = new Pot(p.width / 2, potImage, p);
	
				let countIngredients = 0;
	
				const spawnIngredient = () => {
					if (countIngredients < recipe.ingredients.length) {
						const valueOfIng = recipe.ingredients[countIngredients].title;
						const ingredientQuantity = parseInt(recipe.ingredients[countIngredients].quantity);
	
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
									recipe.ingredients[countIngredients]
								);
	
								ingredient.reset();
								ingredients.push(ingredient);
								countQuantity++;
	
								setTimeout(spawnSingleIngredient, 1000);
							} else {
								countIngredients++;
								setTimeout(spawnIngredient, 2000);
							}
						};
	
						spawnSingleIngredient();
					}
				};
	
				setTimeout(spawnIngredient, 3000);

			};
	
			p.draw = () => {
				p.clear();
				p.background(255, 255, 255, 0);
	
				pot.dragSegment(p.mouseX);
	
				ingredients.forEach((ingredient) => {
					if (
						!(ingredient.isVisible && ingredient.collidesWith(pot))
					) {
						ingredient.update();
						ingredient.display();
					}
				});

				updateRecipe(recipe);
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
