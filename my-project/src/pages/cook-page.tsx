import { useEffect, useState, useCallback, useRef } from "react";
import RecipeComponent from "../recipes-container/recipe-form";
import CookArena from "../cook-page-components/cook-arena";
import ModalComponent from "../modal-create-recipe/modal-component";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import p5 from "p5";

const CookPage = () => {
	const activeRecipeRaw = localStorage.getItem("activeRecipe");
	const activeRecipe = activeRecipeRaw ? JSON.parse(activeRecipeRaw) : null;
	const [open, setOpen] = useState(false);
	const maxHearts = 3;
	const [hearts, setHearts] = useState(maxHearts);
	const [recipe, setRecipe] = useState(activeRecipe);

	const handleOpen = useCallback(() => {
		setOpen(true);
	}, []);

	const handleClose = useCallback(() => {
		setOpen(false);
	}, []);

	const onCatch = (id, ingredientsCount) => {
		const updatedRecipe = { ...recipe };

		let i = 0;
while (i < updatedRecipe.ingredients.length) {
    if (id === updatedRecipe.ingredients[i].id) {
        updatedRecipe.ingredients[i].quantity -= 1;
        setRecipe(updatedRecipe);
        break;
    }
    i++;
}


		if (ingredientsCount === 0) {
			handleOpen();
		}
	};

	const checkDiscoMode = (discoColor, p: p5) => {
		if (discoColor) {
			const randomColor = () =>
				"#" + Math.floor(Math.random() * 16777215).toString(16);
			p.background(randomColor());
			document
				.querySelector(".recipe-cook-page")
				?.setAttribute(
					"style",
					`background-color: ${randomColor()}; color: ${randomColor()};`
				);
			document
				.querySelector(".recipe-side")
				?.setAttribute("style", `background-color: ${randomColor()};`);
		} else {
			p.background(255, 255, 255, 0);
			document
				.querySelector(".recipe-cook-page")
				?.setAttribute(
					"style",
					`background-color: #242633; color: 'white;`
				);
			document
				.querySelector(".recipe-side")
				?.setAttribute("style", `background-color: none;`);
		}
	};

	const loseOneLive = () => {
		setHearts(
			(oldHearts) => {
				return oldHearts - 1;
			}
		);
	};

	useEffect(() => {
		if (hearts === 0) {
			handleOpen();
		}
	}, [hearts])

	useEffect(() => {}, [recipe, hearts]);

	return (
		<div className="cook-page">
			<div className="cook-page-container">
				<CookArena
					ingredients={recipe.ingredients}
					onCatch={onCatch}
					checkDiscoMode={checkDiscoMode}
					loseOneLive={loseOneLive}
					hearts={hearts}
				/>
				<div className="recipe-side">
					<RecipeComponent
						recipe={recipe}
						hasButton={false}
						classNameCard="recipe-cook-page"
						classNameIngContent="recipe-content-cook-page"
					/>
					<div className="heart-lives">
						{hearts > 0 && [...Array(hearts)].map((_, index) => (
							<FavoriteBorderRoundedIcon
								key={index}
								className="heart"
							/>
						))}
					</div>
				</div>
			</div>
			<ModalComponent open={open} close={handleClose} hasForm={false} />
		</div>
	);
};

export default CookPage;
