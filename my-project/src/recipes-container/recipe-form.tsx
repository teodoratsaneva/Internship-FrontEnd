import React from "react";
import IngredientsListComponent from "./recipe-list";
import FooterComponent from "../common-components/footer";
import { RecipeComponentProps } from "../interfaces/recipe-component-interface";
import { saveRecipeToLocalStorage } from "../utils/local-storage-save";

const RecipeComponent: React.FC<RecipeComponentProps> = ({ recipe, hasButton, classNameCard, classNameIngContent}) => {
  const handleCookClick = () => {
    saveRecipeToLocalStorage(recipe, "activeRecipe");
  };

  return (
    <div className={classNameCard}>
      <h2 className="header-card">{recipe.title}</h2>
      {recipe.date &&
        <h4 className="header-card">{recipe.date}</h4>}
      <IngredientsListComponent ingredients={recipe.ingredients} className={classNameIngContent} />
      {hasButton && !recipe.date && (
        <FooterComponent
        buttons={[
          {
            className: "cook-button",
            buttonText: "Cook",
            onClick: handleCookClick,
            linkTo: "/cook"
          }
        ]}
      />
      )}
    </div>
  );
};

export default RecipeComponent;
