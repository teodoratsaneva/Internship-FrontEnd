export interface Ingredient {
    id: string;
    amount: number;
    title: string;
    subIngredients?: Ingredient[];
}