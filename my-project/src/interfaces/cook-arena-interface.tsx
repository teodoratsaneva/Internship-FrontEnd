import { Ingredient } from "./ingredient-interface";

export interface CookArenaProps {
    triggerDiscoMode: () => void;
    ingredients: Ingredient[];
    onCatch: () => void;
    hearts: {current: number};
    ingredientsCount: {current: number};
}