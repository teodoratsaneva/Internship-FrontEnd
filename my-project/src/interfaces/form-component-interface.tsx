import { Ingredient } from "./ingredient-interface";
import { Recipe } from "./recipe-interface";

export interface FormComponentProps {
    recipe: Recipe;
    setRecipe: (recipe: { id: string; title: string; ingredients: Ingredient[] }) => void;
    handleAddIngredient: () => void;
    handleIngredientNameChange: (id: string, name: string) => void;
    handleIngredientAmountChange: (id: string, amount: number) => void;
    handleSaveAndReset?: () => void;
    handleSaveAndExit?: () => void;
    handleSaveEditedRecipe?: (recipe: Recipe) => void;
    handleRemoveIngredient: (id: string, parentId?: string | null) => void;
    style?: any;
    isRecipeForUpdate: boolean;
  }