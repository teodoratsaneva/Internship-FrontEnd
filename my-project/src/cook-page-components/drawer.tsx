import p5 from "p5";
import { DrawingLibrary } from "../interfaces/drawing-library-interface";
import { Ingredient } from "../interfaces/ingredient-interface";
import { IngredientSegment } from "./ingredient-seg";
import { Pot } from "./pot-seg";
import { spawnIngredient } from "../utils/spawn-ingredient";

const potYMultiplier = 1.25;
const timeoutIngredient = 2000;
const minTimeoutInvalidIngredient = 3000;
const maxTimeoutInvalidIngredient = 4000;
const x = 0;
const y = 0;
const invalidIngredientsImages = ["./cute-cat.png", "./cat.png"];
const customColor = 255;
const opasity = 0;

export class P5Drawer implements DrawingLibrary {
	p: p5;
	arenaElement = document.querySelector(".arena") as HTMLElement;
	canvasWidth = this.arenaElement.offsetWidth;
	canvasHeight = this.arenaElement.offsetHeight;

	potImage: any;
	pot: Pot;
	ingredientsSeg: IngredientSegment[];
	invalidIngredient: Ingredient;

	constructor(p: p5) {
		this.p = p;
		this.potImage = this.loadImage("./pot.png");
		this.setImage = this.setImage.bind(this);
		this.constrain = this.constrain.bind(this);
		this.pot = new Pot(
			this.canvasWidth,
			this.canvasHeight / potYMultiplier,
			this.potImage,
			this.constrain,
			this.setImage
		);
		this.ingredientsSeg= [];
		this.invalidIngredient = {
			id: "1",
			amount: 1,
			title: "Cat",
		};

	}

	createCanvas(width: number, height: number): void {
		this.p.createCanvas(width, height);
	}

	loadImage(path: string): any {
		return this.p.loadImage(path);
	}

	setImage(
		image: any,
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

	round = (number: number): number => {
		return this.p.round(number);
	};

	get width(): number {
		return this.p.width;
	}

	setup(ingredients: Ingredient[]) {
		this.p.setup = () => {
			this.p.createCanvas(this.canvasWidth, this.canvasHeight);
			this.p.background(customColor, customColor, customColor, opasity);

			setTimeout(() => spawnIngredient(ingredients, this, timeoutIngredient, x, y, this.canvasWidth, this.ingredientsSeg), timeoutIngredient);

			const spawnInvalidIngredient = () => {
			
				const invalidSeg = new IngredientSegment(
					x,
					y,
					this.loadImage(
						invalidIngredientsImages[this.round(this.getRandomNumber(0, invalidIngredientsImages.length - 1))]
					),
					this,
					this.invalidIngredient
				);
			
				invalidSeg.reset(this.canvasWidth);
				this.ingredientsSeg.push(invalidSeg);

				setTimeout(spawnInvalidIngredient, this.getRandomNumber(minTimeoutInvalidIngredient, maxTimeoutInvalidIngredient));
			};

			spawnInvalidIngredient();
		};
	}

	draw = (
		pausedGame: { current: boolean },
		triggerDiscoMode: (drawer: P5Drawer, isDiscoColor: boolean) => void,
		isDiscoColor: boolean,
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
							}, timeoutIngredient);

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
