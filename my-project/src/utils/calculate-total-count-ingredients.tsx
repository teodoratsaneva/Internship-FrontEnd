import { Ingredient } from "../interfaces/ingredient-interface";

export const calculateTotalIngredientsCount = (ingredients: Ingredient[]): number => {
    let totalCount = 0;

    ingredients.forEach(ingredient => {
        totalCount += parseInt(ingredient.amount);

        if (ingredient.subIngredients && ingredient.subIngredients.length > 0) {
            totalCount += calculateTotalIngredientsCount(ingredient.subIngredients);
        }
    });

    return totalCount;
};