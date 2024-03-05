import RecipeComponent from "../recipe-card/recipe-form";
import HeaderComponent from "../common-components/header-page-component";
import Heading from "../common-components/heading-component";
import { Recipe } from "../interfaces/recipe-interface";
import { useEffect, useState } from "react";
import { Ingredient } from "../interfaces/ingredient-interface";
import { saveRecipesToLocalStorage } from "../utils/local-storage-save";
import ModalFormComponent from "../save-edit-modal/modal-component";

const CookbookPage = () => {
	const [openStates, setOpenStates] = useState<{ [key: string]: boolean }>(
		{}
	);

	const handleOpen = (recipeId: string) => {
		setOpenStates((prevStates) => ({
			...prevStates,
			[recipeId]: true,
		}));
	};

	const handleClose = (recipeId: string) => {
		setOpenStates((prevStates) => ({
			...prevStates,
			[recipeId]: false,
		}));
	};

	const storedRecipesRaw = localStorage.getItem("items");
	const [recipes, setRecipes] = useState(
		storedRecipesRaw ? JSON.parse(storedRecipesRaw) : []
	);

	const handleRemoveRecipe = (id: string) => {
		const recipeToRemove = recipes.find(
			(recipe: Recipe) => recipe.id === id
		);

		if (!recipeToRemove) {
			return;
		}

		const updatedRecipes = recipes
			.map((recipe: Recipe) => {
				if (recipe.id === id) {
					const updatedIngredients = recipe.ingredients.map(
						(ingredient: Ingredient) => {
							if (ingredient.subIngredients) {
								ingredient.subIngredients = [];
							}
							return ingredient;
						}
					);

					recipe.ingredients = [];

					return { ...recipe, ingredients: updatedIngredients };
				}
				return recipe;
			})
			.filter((recipe: Recipe) => recipe.id !== id);

		setRecipes(updatedRecipes);
		localStorage.removeItem("items");
		saveRecipesToLocalStorage(updatedRecipes, "items");
	};

	const handleSaveEditedRecipe = (editedRecipe: Recipe) => {
		const updatedRecipes = recipes.map((recipe: Recipe) => {
			if (recipe.id === editedRecipe.id) {
				return editedRecipe;
			}
			return recipe;
		});

		setRecipes(updatedRecipes);
		saveRecipesToLocalStorage(updatedRecipes, "items");
		handleClose(editedRecipe.id);
	};

	useEffect(() => {}, [recipes]);

	return (
		<>
			<HeaderComponent />
			<div className="cookbook-page-container">
				<Heading variant="h1">
					Welcome to the Cookbook. Here is a list of your potion
					recipes
				</Heading>
				<div className="recipes-container">
					{recipes.map((recipe: Recipe) => (
						<div key={recipe.id} className="recipe-container">
							<RecipeComponent
								recipe={recipe}
								hasButton={true}
								classNameCard="recipe-card"
								classNameIngContent="content-card"
								handleRemoveRecipe={handleRemoveRecipe}
								handleEditRecipe={() =>
									handleOpen(recipe.id)
								}
							/>
							<ModalFormComponent
								open={openStates[recipe.id] || false}
								onClose={() => handleClose(recipe.id)}
								recipe={recipe}
								handleSaveEditedRecipe={handleSaveEditedRecipe}
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
