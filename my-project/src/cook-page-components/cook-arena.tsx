import p5 from "p5";
import { useEffect } from "react";

const CookArena = () => {
    useEffect(() => {
        const setup = (p) => {
            let potImg;
            let carrotImg;
            const segLength = 18;
            let ingredient;

            p.setup = () => {
                p.createCanvas(1330, 1069);
                p.strokeWeight(9);
                p.stroke(255, 100);
                potImg = {
                    image: p.loadImage("./pot.png"),
                    xPos: 0 // Starting position, can be adjusted
                };
                carrotImg = p.loadImage("./carrot-svgrepo-com.svg");
                ingredient = new fallSegment();
            };

            p.draw = () => {
                p.clear();
                p.background(255, 255, 255, 0);
                p.dragSegment(0, p.mouseX);
                ingredient.update();
                ingredient.display();

                if (ingredient.isVisible && ingredient.collidesWithPot(potImg)) {
                    console.log("Collision detected!");
                } else {
                    ingredient.update();
                    ingredient.display();
                }
            };

            p.dragSegment = (i, xin) => {
                xin = p.constrain(xin, 0, p.width - 200);
                const dx = xin - p.width / 2;
                const angle = p.atan2(0, dx);
                potImg.xPos = xin - p.cos(angle) * segLength;
                p.segment(potImg.xPos, 850); // Using potImg.xPos as the x position
            };

            p.segment = (x, y) => {
                p.image(potImg.image, x, y, 200, 200);
            };

            const fallSegment = function () {
                this.posX = p.random(0, p.width);
                this.posY = p.random(-50, 0);
                this.speedY = 2;
                this.isVisible = true;

                this.update = function () {
                    if (this.isVisible) {
                        this.posY += this.speedY;
                        if (this.posY > p.height) {
                            this.posY = p.random(-50, 0);
                            this.posX = p.random(0, p.width);
                        }
                    }
                };

                this.display = function () {
                    if (this.isVisible) {
                        p.image(carrotImg, this.posX, this.posY, 90, 90);
                    }
                };

                this.collidesWithPot = function (potImg) {
                    const potBox = {
                        x: potImg.xPos,
                        y: 850,
                        width: 200,
                        height: 200
                    };
                    const carrotBox = {
                        x: this.posX,
                        y: this.posY,
                        width: 90,
                        height: 90
                    };

                    if (
                        potBox.x < carrotBox.x &&
                        potBox.x + potBox.width > carrotBox.x &&
                        potBox.y < carrotBox.y + carrotBox.height &&
                        potBox.x + potBox.width > carrotBox.x ||
                        (potBox.x < carrotBox.x + carrotBox.width &&
                            potBox.x + potBox.width > carrotBox.x + carrotBox.width &&
                            potBox.y > carrotBox.y + carrotBox.height &&
                            potBox.y + potBox.height < carrotBox.y + carrotBox.height)
                    ) {
                        this.isVisible = false;
                        return true;
                    } else {
                        return false;
                    }
                };
            };
        };

        new p5(setup, document.getElementsByClassName("arena")[0] as HTMLElement);
    }, []);

    return <div className="arena"></div>;
};

export default CookArena;
