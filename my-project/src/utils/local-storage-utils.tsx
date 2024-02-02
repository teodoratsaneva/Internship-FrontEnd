export const recipeToLocalStorage = (recipe) => {
  const existingRecipes = localStorage.getItem("items");
  const storedRecipes = existingRecipes ? JSON.parse(existingRecipes) : [];
  const updatedRecipes = [...storedRecipes, recipe];
  localStorage.setItem("items", JSON.stringify(updatedRecipes));
};