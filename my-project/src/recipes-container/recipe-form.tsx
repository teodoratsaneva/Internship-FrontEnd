import React from "react";
import IngredientsListComponent from "./recipe-list";
import FooterComponent from "../common-components/footer";
import { Recipe } from "../interfaces/recipe-interface";

interface RecipeComponentProps {
  recipe: Recipe;
  hasButton: boolean;
}

const RecipeComponent: React.FC<RecipeComponentProps> = ({ recipe, hasButton }) => {
  const handleCookClick = () => {
    localStorage.setItem('activeRecipe', JSON.stringify(recipe));
  };

  return (
    <div className="recipe-card">
      <h2 className="header-card">{recipe.title}</h2>
      <IngredientsListComponent ingredients={recipe.ingredients} />
      {hasButton && (
        <FooterComponent
          className="cook-button"
          buttonText="Cook"
          linkTo="/cook"
          onClick={handleCookClick}
        />
      )}
    </div>
  );
};

export default RecipeComponent;
