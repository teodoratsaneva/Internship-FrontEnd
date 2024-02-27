import { Ingredient } from "./ingredient-interface";

export interface IngredientsComponentProps {
    ingredients: Ingredient[];
    handleIngredientNameChange: (index: string, name: string) => void;
    handleIngredientQuantityChange: (index: string, quantity: string) => void;
    handleAddIngredient: (id: string) => void;
    handleRemoveIngredient: (id: string, parentId: string) => void;
}