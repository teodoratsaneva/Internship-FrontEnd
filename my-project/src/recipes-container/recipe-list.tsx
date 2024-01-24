import IngredientComponent from "./recipe-item";
import { Ingredient } from "../interfaces/ingredient-interface";

const IngredientsListComponent = (props: { ingredients: Ingredient[] }) => {
    const { ingredients } = props;

    return (
        <ul className="content-card">
            {ingredients.map((ingredient: Ingredient) => (
                <li key={ingredient.id}>
                    <IngredientComponent ingredient={ingredient} />
                </li>
            ))}
        </ul>
    );
};

export default IngredientsListComponent;
