import IngredientsListComponent from "./recipe-list";
import { Ingredient } from "./recipe-item";
import { Link } from "react-router-dom";

export interface Recipe {
  id: string;
  title: string;
  ingredientList: Ingredient[];
}

const RecipeComponent = (props: { recipe: Recipe }) => {
  const { recipe } = props;

  return (
    <div className="recipe-card">
      <h2 className="header-card">{recipe.title}</h2>
        <IngredientsListComponent ingredients={recipe.ingredientList} />
      <div className="footer-card">
        <Link to="/cook">
          <input type="cook-button" value="Cook" />
        </Link>
      </div>
    </div>
  );
};

export default RecipeComponent;
