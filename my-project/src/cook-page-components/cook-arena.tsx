import p5 from "p5";
import { useEffect } from "react";
import { Pot } from "./pot-seg";
import { IngredientSeg } from "./ingredient-seg";

const CookArena = () => {
	useEffect(() => {
		const cookArenaSketch = (p: p5) => {
			let pot: Pot;
			const ingredients: IngredientSeg[] = [];
			const ingredientsImages = [
				p.loadImage("./carrot.svg"),
				p.loadImage("./cheese.svg"),
				p.loadImage("./butter.svg"),
				p.loadImage("./egg.svg"),
			];

			p.setup = () => {
				p.createCanvas(1330, 1069);
				p.strokeWeight(9);
				p.stroke(255, 100);

				const potImage = p.loadImage("./pot.png");
				pot = new Pot(p.width / 2, potImage, p);

				let ingredient: IngredientSeg = new IngredientSeg(
					0,
					0,
					90,
					90,
					1330,
					1069,
					ingredientsImages[0],
					p
				);

				ingredients.push(ingredient);

				let countIngredients = 1;

				const igradedintsInterval = setInterval(() => {
					if (countIngredients !== 4) {
						ingredient = new IngredientSeg(
							0,
							0,
							90,
							90,
							1330,
							1069,
							ingredientsImages[countIngredients++],
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
