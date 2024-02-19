export const saveRecipeToLocalStorage = (recipe, string) => {
	if (string === "activeRecipe") {
		localStorage.setItem(string, JSON.stringify(recipe));
	} else {
		const existingRecipes = localStorage.getItem(string);
		const storedRecipes = existingRecipes
			? JSON.parse(existingRecipes)
			: [];
		const updatedRecipes = [...storedRecipes, recipe];
		localStorage.setItem(string, JSON.stringify(updatedRecipes));
	}
};
