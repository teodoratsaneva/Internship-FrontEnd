import { Recipe } from "./recipe-interface"

export interface RecipeComponentProps {
    recipe: Recipe,
    hasButton: boolean,
    classNameCard: string,
    classNameIngContent: string,
    handleRemoveRecipe: (id: string) => void,
    handleEditRecipe: () => void
}