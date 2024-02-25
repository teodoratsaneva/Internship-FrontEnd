import { useEffect, useRef } from "react";
import { Pot } from "./pot-seg";
import { IngredientSegment } from "./ingredient-seg";
import { ingredientIconMap } from "../utils/ingredients-icons";
import { Ingredient } from "../interfaces/ingredient-interface";
import { P5Drawer } from "./drawer";
import p5 from "p5";

const x = 0;
const y = 0;
const timeoutTimes = 2000;
const customColor = 255;
const opasity = 0;
const potYMultiplier = 1.4;

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
	hearts,
	ingredientsCount
}) => {
	const { ingredients, onCatch, triggerDiscoMode, hearts, ingredientsCount } = props;
	const discoColor = useRef(false);
	const pausedGame = useRef(false);

	useEffect(() => {
		const cookArenaSketch = (p: p5) => {
    		const p5Drawer = new P5Drawer(p);

			const arenaElement = document.querySelector(".arena") as HTMLElement;
        	const canvasWidth = arenaElement.offsetWidth;
        	const canvasHeight = arenaElement.offsetHeight;

			const potImage = p5Drawer.loadImage("./pot.png");
			const pot = new Pot(canvasWidth, canvasHeight / potYMultiplier, potImage, p5Drawer);
			const ingredientsSeg: IngredientSegment[] = [];

			p5Drawer.setup( 
				canvasWidth,
				canvasHeight,
				customColor,
				opasity,
				ingredients,
				ingredientIconMap,
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
				discoColor,
				invalidIngredient,
				timeoutTimes,
				hearts,
				ingredientsCount,
				onCatch,
				canvasHeight,
				canvasWidth
			);
		};

		const p5Instance = new p5(cookArenaSketch, document.querySelector(".arena") as HTMLElement);

		return () => {
			p5Instance.remove();
		  };
	}, []);

	return <div className="arena"></div>;
};

export default CookArena;
