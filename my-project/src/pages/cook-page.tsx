import { useEffect, useState } from "react";
import HeaderComponent from "../common-components/header-page-component";
import RecipeComponent from "../recipes-container/recipe-form";

const CookPage = () => {
  const [activeRecipe, setActiveRecipe] = useState(null);

  useEffect(() => {
    const activeRecipeRaw = localStorage.getItem('activeRecipe');
    const parsedActiveRecipe = activeRecipeRaw ? JSON.parse(activeRecipeRaw) : null;
    setActiveRecipe(parsedActiveRecipe);
  }, []);

  return (
    <>
      <HeaderComponent />
      <div className="cook-page-container">
        {activeRecipe ? (
          <RecipeComponent recipe={activeRecipe} hasButton={false} />
        ) : (
          <p>No active recipe found. Please go back and select a recipe.</p>
        )}
      </div>
    </>
  );
};

export default CookPage;
