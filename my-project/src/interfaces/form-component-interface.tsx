import { Ingredient } from "./ingredient-interface";
import { Recipe } from "./recipe-interface";

export interface FormComponentProps {
    recipe: Recipe;
    setRecipe: (recipe: { id: string; title: string; ingredients: Ingredient[] }) => void;
    handleAddIngredient: () => void;
    handleIngredientNameChange: (id: string, name: string) => void;
    handleIngredientQuantityChange: (id: string, value: string) => void;
    handleSaveAndReset: () => void;
    handleSaveAndExit: () => void;
    handleRemoveIngredient: (id: string, parentId?: string | null) => void;
    style?: any;
  }