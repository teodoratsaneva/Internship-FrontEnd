import p5 from "p5";
import { useEffect } from "react";
import { Pot } from "./pot-seg";
import { IngredientSeg } from "./ingredient-seg";
import { ingredientIconMap } from "../utils/ingredients-icons";
import { Recipe } from "../interfaces/recipe-interface";

const CookArena = (props: {recipe: Recipe}) => {
	const {recipe} = props;

	useEffect(() => {
		const cookArenaSketch = (p: p5) => {
			let pot: Pot;
			const ingredients: IngredientSeg[] = [];

			p.setup = () => {
				p.createCanvas(1330, 1069);
				p.strokeWeight(9);
				p.stroke(255, 100);

				const potImage = p.loadImage("./pot.png");
				pot = new Pot(p.width / 2, potImage, p);
				let valueOfIng = recipe.ingredients[0].title;

				let ingredient: IngredientSeg = new IngredientSeg(
					0,
					0,
					90,
					90,
					1330,
					1069,
					p.loadImage(ingredientIconMap[valueOfIng]),
					p
				);

				ingredients.push(ingredient);

				let countIngredients = 1;

				setInterval(() => {
					valueOfIng = recipe.ingredients[countIngredients++].title;

					if (countIngredients !== recipe.ingredients.length + 1) {
						ingredient = new IngredientSeg(
							0,
							0,
							90,
							90,
							1330,
							1069,
							p.loadImage(ingredientIconMap[valueOfIng]),
							p
						);

						ingredient.reset();
						ingredients.push(ingredient);
					}
				}, 3000);
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
