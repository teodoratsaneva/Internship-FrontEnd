import { Ingredient } from "../interfaces/ingredient-interface";

export interface Recipe {
    id: string;
    title: string;
    ingredients: Ingredient[];
    date?: any;
}
