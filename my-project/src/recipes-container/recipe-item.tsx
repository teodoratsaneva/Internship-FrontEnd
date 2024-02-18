import { Ingredient } from "../interfaces/ingredient-interface";
import Icon  from "../common-components/icon-component"

const IngredientComponent = (props: {
    ingredient: Ingredient;
    icon?: React.ReactNode;
}) => {
    const { ingredient, icon } = props;

    return (
        <div key={ingredient.id}>
          <div className="ingredient-container">
            { ingredient.quantity === 0 ?
                <Icon type="check" />
             : icon ? (
                icon
            ) : (
                <Icon type="brightness1" />
            )}
            {ingredient.quantity !== 0 && 
            <span className="ingredient-title">{ingredient.quantity}</span>}
            <span className="ingredient-title">{ingredient.title}</span>
            </div>
            {ingredient.subIngredients && (
                <ul>
                    {ingredient.subIngredients.map((subIngredient) => (
                        <li key={`list_item_${subIngredient.id}`}>
                          <div className="ingredient-container">
                            <IngredientComponent
                                ingredient={subIngredient}
                                icon={
                                    <Icon type="brightness2" />
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

export default IngredientComponent;