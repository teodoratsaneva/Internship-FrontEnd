import React from "react";
import IngredientsListComponent from "./recipe-list";
import FooterComponent from "../common-components/footer";
import { RecipeComponentProps } from "../interfaces/recipe-component-interface";

const RecipeComponent: React.FC<RecipeComponentProps> = ({ recipe, hasButton, classNameCard, classNameIngContent}) => {
  const handleCookClick = () => {
    localStorage.setItem('activeRecipe', JSON.stringify(recipe));
  };

  return (
    <div className={classNameCard}>
      <h2 className="header-card">{recipe.title}</h2>
      <IngredientsListComponent ingredients={recipe.ingredients} className={classNameIngContent} />
      {hasButton && (
        <FooterComponent
          className="cook-button"
          buttonText="Cook"
          onClickButton1={handleCookClick}
          linkTo="/cook"
        />
      )}
    </div>
  );
};

export default RecipeComponent;
