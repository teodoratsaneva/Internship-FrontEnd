import { useEffect, useRef } from "react";
import { Pot } from "./pot-seg";
import { IngredientSegment } from "./ingredient-seg";
import { Ingredient } from "../interfaces/ingredient-interface";
import { P5Drawer } from "./drawer";
import p5 from "p5";
import { CookArenaProps } from "../interfaces/cook-arena-interface";

const x = 0;
const y = 0;
const timeoutTimes = 2000;
const customColor = 255;
const opasity = 0;
const potYMultiplier = 1.25;

const invalidIngredientsImages = ["./cute-cat.png", "./cat.png"];
const invalidIngredient: Ingredient = {
	id: "1",
	amount: 1,
	title: "Cat",
};

const CookArena: React.FC<CookArenaProps> = ({
	triggerDiscoMode,
	ingredients,
	onCatch,
	hearts,
	caughtIngredientsCount,
	onLifeLoss
}) => {
	const discoColor = useRef(false);
	const pausedGame = useRef(false);

	useEffect(() => {
		const cookArenaSketch = (p: p5) => {
			const p5Drawer = new P5Drawer(p);

			const arenaElement = document.querySelector(".arena") as HTMLElement;
			const canvasWidth = arenaElement.offsetWidth;
			const canvasHeight = arenaElement.offsetHeight;

			const potImage = p5Drawer.loadImage("./pot.png");
			const pot = new Pot(
				canvasWidth,
				canvasHeight / potYMultiplier,
				potImage,
				p5Drawer
			);
			const ingredientsSeg: IngredientSegment[] = [];

			p5Drawer.setup(
				canvasWidth,
				canvasHeight,
				customColor,
				opasity,
				ingredients,
				ingredientsSeg,
				timeoutTimes,
				invalidIngredientsImages,
				x,
				y,
				invalidIngredient
			);

			p5Drawer.draw(
				pausedGame,
				triggerDiscoMode,
				pot,
				ingredientsSeg,
				discoColor.current,
				invalidIngredient,
				timeoutTimes,
				hearts,
				caughtIngredientsCount,
				onCatch,
				canvasHeight,
				canvasWidth,
				onLifeLoss
			);
		};

		const p5Instance = new p5(
			cookArenaSketch,
			document.querySelector(".arena") as HTMLElement
		);

		return () => {
			p5Instance.remove();
		};
	}, []);

	return <div className="arena"></div>;
};

export default CookArena;
