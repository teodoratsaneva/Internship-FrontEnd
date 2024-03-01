import { Ingredient } from "./ingredient-interface";

export interface IngredientsComponentProps {
    ingredients: Ingredient[];
    handleIngredientNameChange: (index: string, name: string) => void;
    handleIngredientAmountChange: (index: string, amount: number) => void;
    handleAddIngredient: (id: string) => void;
    handleRemoveIngredient: (id: string, parentId: string) => void;
}