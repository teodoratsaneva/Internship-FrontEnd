export interface Ingredient {
    id: string;
    quantity: string;
    title: string;
    subIngredients?: Ingredient[];
}