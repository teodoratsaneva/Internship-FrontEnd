import { useEffect, useRef } from "react";
import { P5Drawer } from "./drawer";
import p5 from "p5";
import { CookArenaProps } from "../interfaces/cook-arena-interface";

const x = 0;
const y = 0;
const timeoutTimes = 2000;
const customColor = 255;
const opasity = 0;

const invalidIngredientsImages = ["./cute-cat.png", "./cat.png"];

const CookArena: React.FC<CookArenaProps> = ({
	triggerDiscoMode,
	ingredients,
	onCatch,
	caughtIngredientsCount,
	onLifeLoss,
	isWonGame
}) => {
	const isDiscoColor = useRef(false);
	const pausedGame = useRef(false);

	useEffect(() => {
		const cookArenaSketch = (p: p5) => {
			const p5Drawer = new P5Drawer(p);
			
			p5Drawer.setup(
				customColor,
				opasity,
				ingredients,
				timeoutTimes,
				invalidIngredientsImages,
				x,
				y
			);

			p5Drawer.draw(
				pausedGame,
				triggerDiscoMode,
				isDiscoColor.current,
				timeoutTimes,
				caughtIngredientsCount,
				onCatch,
				onLifeLoss,
				isWonGame
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
