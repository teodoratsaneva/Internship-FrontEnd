import { Ingredient } from "./ingredient-interface";

export interface CookArenaProps {
    triggerDiscoMode: () => void;
    ingredients: Ingredient[];
    onCatch: () => void;
    caughtIngredientsCount: { current: number };
    onLifeLoss: () => void;
    isWonGame: { current: boolean};
}