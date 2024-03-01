import { Ingredient } from "./ingredient-interface";

export interface CookArenaProps {
    triggerDiscoMode: () => void;
    ingredients: Ingredient[];
    onCatch: () => void;
    hearts:  number;
    caughtIngredientsCount: { current: number };
    onLifeLoss: () => void;
}