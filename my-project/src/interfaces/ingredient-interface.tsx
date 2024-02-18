export interface Ingredient {
    id: string;
    quantity: number;
    title: string;
    subIngredients?: Ingredient[];
}