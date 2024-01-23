import React from "react";
import { Link } from "react-router-dom";
import RecipeComponent, { Recipe } from "./recipes-container/recipe-form";
import recipes from "./recipes-container/data-recipes";
import HeaderComponent from "./header-component";

const CookbookPage: React.FC = () => {
  return (
    <>
      <HeaderComponent />
      <div className="cookbook-page-container">
        <h1 className="cookbook-page-title">
          Welcome to the Cookbook. Here is a list of your cooking spells
        </h1>
      <div className="recipes-container">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-container">
            <RecipeComponent recipe={recipe} />
          </div>
        ))}
      </div>
      </div>
    </>
  );
};

export default CookbookPage;
