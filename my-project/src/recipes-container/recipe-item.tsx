import Brightness1Icon from "@mui/icons-material/Brightness1";
import Brightness2Icon from "@mui/icons-material/Brightness2";

export interface Ingredient {
  id: string;
  text: string;
  subIngredients?: Ingredient[];
}

const IngredientItem = (props: {
  ingredient: Ingredient;
  subIcon?: React.ReactNode;
}) => {
  const { ingredient, subIcon } = props;

  return (
    <div key={ingredient.id}>
      {subIcon ? subIcon : <Brightness1Icon className="Brightness1Icon" />}
      <span className="ingredient-text">{ingredient.text}</span>
      {ingredient.subIngredients && (
        <div className="sub-ingredients">
          <ul>
          {ingredient.subIngredients.map((subIngredient, index) => (
            <li key={index}>
              <IngredientItem
                ingredient={subIngredient}
                subIcon={<Brightness2Icon className="Brightness2Icon" />}
              />
            </li>
          ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IngredientItem;
