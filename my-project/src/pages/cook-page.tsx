import RecipeComponent from "../recipes-container/recipe-form";
import CookArena from "../cook-page-components/cook-arena";
import { useEffect, useState, useCallback } from "react";
import ModalComponent from "../modal-create-recipe/modal-component";

const styleModal = {
	position: "absolute",
	top: "60%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	height: 250,
	bgcolor: "#242633",
	p: "20px",
	borderRadius: "10px",
};

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

		const allIngredientsZero = updatedRecipe.ingredients.every(
			(ingredient) => ingredient.quantity === 0
		);

		if (allIngredientsZero) {
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
			<ModalComponent open={open} close={handleClose} hasForm={false} sx={styleModal}/>
		</div>
	);
};

export default CookPage;
