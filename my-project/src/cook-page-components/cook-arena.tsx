import { useEffect, useRef } from "react";
import { P5Drawer } from "./drawer";
import p5 from "p5";
import { CookArenaProps } from "../interfaces/cook-arena-interface";



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
			
			p5Drawer.setup(ingredients);
			p5Drawer.draw(
				pausedGame,
				triggerDiscoMode,
				isDiscoColor.current,
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
