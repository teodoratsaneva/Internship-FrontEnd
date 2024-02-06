import IngredientComponent from "./recipe-item";
import { Ingredient } from "../interfaces/ingredient-interface";

const IngredientsListComponent = (props: { ingredients: Ingredient[], className: string }) => {
    const { ingredients, className } = props;

    return (
        <ul className={className}>
            {ingredients.map((ingredient: Ingredient) => (
                <li key={ingredient.id}>
                    <IngredientComponent ingredient={ingredient} />
                </li>
            ))}
        </ul>
    );
};

export default IngredientsListComponent;
