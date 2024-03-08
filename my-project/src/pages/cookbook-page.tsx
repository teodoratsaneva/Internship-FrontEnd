import RecipeComponent from "../recipe-card/recipe-form";
import HeaderComponent from "../common-components/header-page-component";
import Heading from "../common-components/heading-component";
import { Recipe } from "../interfaces/recipe-interface";
import { useCallback, useState } from "react";
import ModalFormComponent from "../save-edit-modal/modal-component";
import useRecipe from "../utils/useRecipe";

const CookbookPage = () => {
	const { recipes, removeRecipe, saveEditedRecipe } = useRecipe();
	const [openStates, setOpenStates] = useState<{ [key: string]: boolean }>(
		{}
	);

	const handleOpen = useCallback((recipeId: string) => {
		setOpenStates({ [recipeId]: true });
	}, []);

	const handleClose = useCallback((recipeId: string) => {
		setOpenStates({ [recipeId]: false });
	}, []);

	return (
		<>
			<HeaderComponent />
			<div className="cookbook-page-container">
				<Heading variant="h1">
					Welcome to the Cookbook. Here is a list of your potion
					recipes
				</Heading>
				<div id="recipes-container">
					{recipes.map((recipe: Recipe) => (
						<div
							key={recipe.id}
							id="recipe-container"
							data-testid={`recipe-container-${recipe.id}`}
						>
							<RecipeComponent
								recipe={recipe}
								hasButton={true}
								classNameCard="recipe-card"
								classNameIngContent="content-card"
								handleRemoveRecipe={removeRecipe}
								handleEditRecipe={() => handleOpen(recipe.id)}
							/>
							<ModalFormComponent
								open={openStates[recipe.id] || false}
								onClose={() => handleClose(recipe.id)}
								recipe={recipe}
								handleSaveEditedRecipe={saveEditedRecipe}
								isRecipeForUpdate={true}
							/>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default CookbookPage;
