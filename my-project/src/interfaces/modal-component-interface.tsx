import { Recipe } from "./recipe-interface";

export interface ModalComponentProps {
    open: boolean;
    onClose: () => void;
    recipe?: Recipe;
    isRecipeForUpdate: boolean;
    handleSaveEditedRecipe?: (recipe: Recipe) => void;
}