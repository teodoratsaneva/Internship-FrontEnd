import p5 from "p5";
import { useEffect } from "react";
import { Segment } from "../interfaces/segment-interface";

const CookArena = () => {
	useEffect(() => {
		const cookArenaSketch = (p: p5) => {
			let pot: Pot;
			const ingredients: Ingredient[] = [];
			const segLength = 18;

			class Pot implements Segment {
				x: number;
				y: number;
				width: number;
				height: number;
				image: p5.Image;

				constructor(x: number, image: p5.Image) {
					this.x = x;
					this.y = 850;
					this.width = 200;
					this.height = 200;
					this.image = image;
				}

				dragSegment = (xin: number) => {
					xin = p.constrain(xin, 0, p.width - 200);
					this.x = xin;
					this.display();
				};

				display() {
					p.image(this.image, this.x, this.y, this.width, 200);
				}
			}

			class Ingredient implements Segment {
				x: number;
				y: number;
				width: number;
				height: number;
				speedY: number;
				isVisible: boolean;
				image: p5.Image;

				constructor(x: number, y: number, image: p5.Image) {
					this.x = x;
					this.y = y;
					this.width = 90;
					this.height = 90;
					this.speedY = 4;
					this.isVisible = true;
					this.image = image;
				}

				update() {
					if (this.isVisible) {
						this.y += this.speedY;
						if (this.y > p.height) {
							this.reset();
						}
					}
				}

				display() {
					if (this.isVisible) {
						p.image(
							this.image,
							this.x,
							this.y,
							this.width,
							this.height
						);
					}
				}

				collidesWith(otherObject: {
					x: number;
					y: number;
					width: number;
					height: number;
				}) {
                    const currObjHeight = this.height - 100;

					if (
						(otherObject.x < this.x + this.width &&
							otherObject.x + otherObject.width > this.x + this.width &&
							otherObject.y + otherObject.height > this.y + currObjHeight &&
							otherObject.y < this.y + currObjHeight) ||
						(otherObject.x < this.x &&
							otherObject.x + otherObject.width > this.x &&
							otherObject.y + otherObject.height > this.y + currObjHeight &&
							otherObject.y < this.y + currObjHeight) ||
						(otherObject.x < this.x + this.width &&
							otherObject.x + otherObject.width > this.x + this.width &&
							otherObject.y < this.y &&
							otherObject.y + otherObject.height > this.y) ||
						(otherObject.x < this.x &&
							otherObject.x + otherObject.width > this.x &&
							otherObject.y > this.y &&
							otherObject.y + otherObject.height < this.y)
					) {
						this.isVisible = false;

						return true;
					} else {
						return false;
					}
				}

				reset() {
					let isValidPosition = false;
					while (!isValidPosition) {
						this.x = p.random(0, p.width);
						this.y = 0;
						isValidPosition = true;

						for (const otherIngredient of ingredients) {
							if (this.collidesWith(otherIngredient)) {
								isValidPosition = false;
								break;
							}
						}
					}
				}
			}

			p.setup = () => {
				p.createCanvas(1330, 1069);
				p.strokeWeight(9);
				p.stroke(255, 100);

				const potImage = p.loadImage("./pot.png");
				pot = new Pot(p.width / 2, potImage);

				const ingredientsImages = [
					p.loadImage("./carrot-svgrepo-com.svg"),
					p.loadImage("./cheese-1-svgrepo-com.svg"),
					p.loadImage("./butter-svgrepo-com.svg"),
					p.loadImage("./egg-svgrepo-com.svg"),
				];

				for (let i = 0; i < ingredientsImages.length; i++) {
					const ingredient = new Ingredient(
						0,
						0,
						ingredientsImages[i]
					);
					ingredient.reset();
					ingredients.push(ingredient);
				}
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
