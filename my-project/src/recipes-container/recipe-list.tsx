import IngredientComponent, { Ingredient } from "./recipe-item";

const IngredientsListComponent = (props: { ingredients: Ingredient[] }) => {
  const { ingredients } = props;

  return (
    <ul>
      {ingredients.map((ingredient: Ingredient) => (
        <li key={ingredient.id}>
          <IngredientComponent ingredient={ingredient} />
        </li>
      ))}
    </ul>
  );
};

export default IngredientsListComponent;
