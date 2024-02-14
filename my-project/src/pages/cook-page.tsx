import RecipeComponent from "../recipes-container/recipe-form";
import CookArena from "../cook-page-components/cook-arena";
import { useEffect, useState, useCallback } from "react";
import ModalComponent from "../modal-create-recipe/modal-component";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import p5 from "p5";

const CookPage = () => {
	const activeRecipeRaw = localStorage.getItem("activeRecipe");
	const activeRecipe = activeRecipeRaw ? JSON.parse(activeRecipeRaw) : null;

	const [open, setOpen] = useState(false);

	const handleOpen = useCallback(() => {
		setOpen(true);
	}, []);
	const handleClose = useCallback(() => {
		setOpen(false);
	}, []);

	const [recipe, setRecipe] = useState(activeRecipe);

	const onCatch = (id: string) => {
		const updatedRecipe = { ...recipe };

		for (let i = 0; i < updatedRecipe.ingredients.length; i++) {
			if (id === updatedRecipe.ingredients[i].id) {
				updatedRecipe.ingredients[i].quantity -= 1;
				setRecipe(updatedRecipe);

				break;
			}
		}

		const allIngredientsCatched = updatedRecipe.ingredients.every(
			(ingredient) => ingredient.quantity === 0
		);

		if (allIngredientsCatched) {
			handleOpen();
		}
	};

	useEffect(() => {}, [recipe]);

	const checkDiscoMode = (discoColor, p: p5) => {
		if (discoColor) {
			const randomColor = () =>
				"#" + Math.floor(Math.random() * 16777215).toString(16);
			p.background(randomColor());
			document
				.querySelector(".recipe-cook-page")
				?.setAttribute(
					"style",
					`background-color: ${randomColor()}; color: ${randomColor()} !important;`
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

	return (
		<div className="cook-page">
			<div className="cook-page-container">
				<CookArena
					ingredients={recipe.ingredients}
					onCatch={onCatch}
					checkDiscoMode={checkDiscoMode}
				/>
				<div className="recipe-side">
					<RecipeComponent
						recipe={recipe}
						hasButton={false}
						classNameCard="recipe-cook-page"
						classNameIngContent="recipe-content-cook-page"
					/>
					<div className="heart-lives">
						<div className="heart-lives">
								<FavoriteBorderRoundedIcon className="heart"/>
						</div>
					</div>
				</div>
			</div>
			<ModalComponent open={open} close={handleClose} hasForm={false} />
		</div>
	);
};

export default CookPage;
