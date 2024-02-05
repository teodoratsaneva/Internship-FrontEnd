import { useEffect, useState } from "react";
import HeaderComponent from "../common-components/header-page-component";
import RecipeComponent from "../recipes-container/recipe-form";

const CookPage = () => {
  const activeRecipeRaw = localStorage.getItem('activeRecipe');
  const activeRecipe = activeRecipeRaw ? JSON.parse(activeRecipeRaw) : null;

  console.log(activeRecipe);

  return (
    <>
      <HeaderComponent />
      <div className="cook-page-container">
          <RecipeComponent recipe={activeRecipe} hasButton={false} />
      </div>
    </>
  );
};

export default CookPage;
