import { Ingredient } from "../interfaces/ingredient-interface";
import IconConponent  from "../utils/icon-component"

const IngredientItem = (props: {
    ingredient: Ingredient;
    subIcon?: React.ReactNode;
}) => {
    const { ingredient, subIcon } = props;

    return (
        <div key={ingredient.id}>
          <div className="ingredient-container">
            {subIcon ? (
                subIcon
            ) : (
                <IconConponent type="brightness1" />
            )}
            <span className="ingredient-title">{ingredient.quantity}</span>
            <span className="ingredient-title">{ingredient.title}</span>
            </div>
            {ingredient.subIngredients && (
                <ul>
                    {ingredient.subIngredients.map((subIngredient, index) => (
                        <li key={index}>
                          <div className="ingredient-container">
                            <IngredientItem
                                ingredient={subIngredient}
                                subIcon={
                                    <IconConponent type="brightness2" />
                                }
                            />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default IngredientItem;
