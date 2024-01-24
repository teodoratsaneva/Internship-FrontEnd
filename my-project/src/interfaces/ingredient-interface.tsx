export interface Ingredient {
    id: string;
    title: string;
    subIngredients?: Ingredient[];
}
