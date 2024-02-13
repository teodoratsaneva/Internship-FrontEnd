import RecipeComponent from "../recipes-container/recipe-form";
import CookArena from "../cook-page-components/cook-arena";
import { useEffect, useState, useCallback } from "react";
import ModalComponent from "../modal-create-recipe/modal-component";

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

	return (
		<div className="cook-page">
			<div className="cook-page-container">
				<CookArena ingredients={recipe.ingredients} onCatch={onCatch} />
				<div className="recipe-side">
					<RecipeComponent
						recipe={recipe}
						hasButton={false}
						classNameCard="recipe-cook-page"
						classNameIngContent="recipe-content-cook-page"
					/>
				</div>
			</div>
			<ModalComponent open={open} close={handleClose} hasForm={false}/>
		</div>
	);
};

export default CookPage;
