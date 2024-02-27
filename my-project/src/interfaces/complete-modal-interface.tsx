export interface completeRecipeModal {
    open: boolean;
    onClose: () => void;
    text: string;
    link: string;
    buttonText: string;
    handleCompleteRecipe?: () => void;
}