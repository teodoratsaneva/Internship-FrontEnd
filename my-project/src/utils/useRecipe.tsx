import { useEffect, useState } from "react";
import { Recipe } from "../interfaces/recipe-interface";
import { Ingredient } from "../interfaces/ingredient-interface";
import { saveRecipesToLocalStorage } from "../utils/local-storage-save";

const useRecipe = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const storedRecipesRaw = localStorage.getItem("items");
        if (storedRecipesRaw) {
            setRecipes(JSON.parse(storedRecipesRaw));
        }
    }, []);

    const saveRecipes = (updatedRecipes: Recipe[]) => {
        setRecipes(updatedRecipes);
        saveRecipesToLocalStorage(updatedRecipes, "items");
    };

    const removeRecipe = (id: string) => {
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

        saveRecipes(updatedRecipes);
    };

    const saveEditedRecipe = (editedRecipe: Recipe) => {
        const updatedRecipes = recipes.map((recipe: Recipe) => {
            if (recipe.id === editedRecipe.id) {
                return editedRecipe;
            }
            return recipe;
        });

        saveRecipes(updatedRecipes);
    };

    return { recipes, saveRecipes, removeRecipe, saveEditedRecipe };
};

export default useRecipe;
