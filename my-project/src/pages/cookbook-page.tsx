import React from "react";
import RecipeComponent from "../recipes-container/recipe-form";
import HeaderComponent from "../utils/header-page-component";
import Heading from "../utils/heading-component";
import { Recipe } from "../interfaces/recipe-interface";

const CookbookPage: React.FC = () => {
  const storedRecipesRaw = localStorage.getItem('items');
  const storedRecipes = storedRecipesRaw ? JSON.parse(storedRecipesRaw) : [];

  return (
    <>
      <HeaderComponent />
      <div className="cookbook-page-container">
        <Heading variant="h1">
          Welcome to the Cookbook. Here is a list of your potion recipes
        </Heading>
        <div className="recipes-container">
          {storedRecipes.map((recipe: Recipe) => (
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
