export interface completeRecipeModal{
    open: void;
    close: void;
    text: string;
    link: string;
    buttonText: string;
    handleCompleteRecipe?: () => void;
}