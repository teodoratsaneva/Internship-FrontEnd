import p5 from "p5";
import { DrawingLibrary } from "../interfaces/drawing-library-interface";
import { Ingredient } from "../interfaces/ingredient-interface";
import { IngredientSegment } from "./ingredient-seg";
import { Pot } from "./pot-seg";
import { ingredientIconMap } from "../utils/ingredients-icons";

const potYMultiplier = 1.25;

export class P5Drawer implements DrawingLibrary {
	p: p5;
	arenaElement = document.querySelector(".arena") as HTMLElement;
	canvasWidth = this.arenaElement.offsetWidth;
	canvasHeight = this.arenaElement.offsetHeight;

	potImage = this.loadImage("./pot.png");
	pot = new Pot(
		this.canvasWidth,
		this.canvasHeight / potYMultiplier,
		this.potImage,
		p5Drawer
	);
	ingredientsSeg: IngredientSegment[] = [];
	invalidIngredient: Ingredient = {
		id: "1",
		amount: 1,
		title: "Cat",
	};

	constructor(p: p5) {
		this.p = p;
	}

	createCanvas(width: number, height: number): void {
		this.p.createCanvas(width, height);
	}

	loadImage(path: string): any {
		return this.p.loadImage(path);
	}

	setImage(
		image: p5.Image,
		x: number,
		y: number,
		width: number,
		height: number
	): void {
		this.p.image(image, x, y, width, height);
	}

	getRandomNumber(min: number, max: number): number {
		return this.p.random(min, max);
	}

	constrain = (xin: number, yPos: number, width: number) => {
		return this.p.constrain(xin, yPos, this.p.width - width);
	};

	setBackground = (colorValue: string, opacity?: number) => {
		if (opacity !== undefined) {
			this.p.background(
				parseInt(colorValue),
				parseInt(colorValue),
				parseInt(colorValue),
				opacity
			);
		} else {
			this.p.background(colorValue);
		}
	};

	clear = () => {
		this.p.clear();
	};

	round = (number: number) => {
		return this.p.round(number);
	};

	get width(): number {
		return this.p.width;
	}

	setup(
		customColor: number,
		opasity: number,
		ingredients: Ingredient[],
		timeoutTimes: number,
		invalidIngredientsImages: any,
		x: number,
		y: number
	) {
		this.p.setup = () => {
			this.p.createCanvas(this.canvasWidth, this.canvasHeight);
			this.p.background(customColor, customColor, customColor, opasity);

			let countIngredients = 0;

			const spawnIngredient = () => {
				if (countIngredients <= ingredients.length) {
					const { title: valueOfIng, amount: ingredientAmount } =
						ingredients[countIngredients];

					let countAmount = 0;

					const spawnSingleIngredient = () => {
						if (countAmount < ingredientAmount) {
							const ingredient: Ingredient =
								ingredients[countIngredients];

							const ingredientSeg = new IngredientSegment(
								x,
								y,
								this.loadImage(ingredientIconMap[valueOfIng]),
								this,
								ingredient
							);

							ingredientSeg.reset(this.canvasWidth);
							this.ingredientsSeg.push(ingredientSeg);
							countAmount++;
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
					this.loadImage(
						invalidIngredientsImages[
							this.round(
								this.getRandomNumber(
									0,
									invalidIngredientsImages.length - 1
								)
							)
						]
					),
					this,
					this.invalidIngredient
				);

				invalidSeg.reset(this.canvasWidth);
				this.ingredientsSeg.push(invalidSeg);

				setTimeout(
					spawnInvalidIngredient,
					this.getRandomNumber(4000, 5000)
				);
			};

			spawnInvalidIngredient();
		};
	}

	draw = (
		pausedGame: { current: boolean },
		triggerDiscoMode: (drawer: P5Drawer, isDiscoColor: boolean) => void,
		isDiscoColor: boolean,
        timeoutTimes: number,
		caughtIngredientsCount: { current: number },
		onCatch: (id: string, count: number) => void,
		onLifeLoss: () => void,
        isWonGame: { current: boolean}
	) => {
		this.p.draw = () => {
			if (!pausedGame.current) {
				if (isWonGame.current === false) {
					pausedGame.current = true;
				}

				this.clear();
				triggerDiscoMode(this, isDiscoColor);

				this.pot.dragSegment(this.p.mouseX);

				this.ingredientsSeg.forEach((ingredientSeg) => {
					if (
						ingredientSeg.isVisible &&
						ingredientSeg.collidesWith(this.pot)
					) {
						if (
							ingredientSeg.ingredient === this.invalidIngredient &&
							ingredientSeg.collidesWith(this.pot)
						) {
							isDiscoColor = true;
							setTimeout(() => {
								isDiscoColor = false;
							}, timeoutTimes);

							onLifeLoss();
						} else {
							caughtIngredientsCount.current -= 1;

							onCatch(
								ingredientSeg.ingredient!.id,
								caughtIngredientsCount.current
							);

							if (caughtIngredientsCount.current === 0) {
								pausedGame.current = true;
							}
						}
					} else {
						ingredientSeg.updatePosition(this.canvasHeight, this.canvasWidth);
						ingredientSeg.display();
					}
				});
			}
		};
	};
}
