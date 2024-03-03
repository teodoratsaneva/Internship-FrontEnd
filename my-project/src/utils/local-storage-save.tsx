import { Recipe } from "../interfaces/recipe-interface";

export const saveRecipeToLocalStorage = (recipe: Recipe, key: string) => {
	if (key === "activeRecipe") {
		localStorage.setItem(key, JSON.stringify(recipe));
	} else {
		const existingRecipes = localStorage.getItem(key);
		const storedRecipes = existingRecipes
			? JSON.parse(existingRecipes)
			: [];
		const updatedRecipes = [...storedRecipes, recipe];
		localStorage.setItem(key, JSON.stringify(updatedRecipes));
	}
};

export const saveRecipesToLocalStorage = (recipes: Recipe[], key: string) => {
	localStorage.setItem(key, JSON.stringify(recipes));
}
