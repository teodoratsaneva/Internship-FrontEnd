import RecipeComponent from "../recipes-container/recipe-form";
import CookArena from "../cook-page-components/cook-arena";
import { useState } from "react";

const CookPage = () => {
	const activeRecipeRaw = localStorage.getItem("activeRecipe");
	const [activeRecipe, setActiveRecipe] = useState(activeRecipeRaw ? JSON.parse(activeRecipeRaw) : null);

    const updateRecipe = (updatedRecipe) => {
        setActiveRecipe(updatedRecipe);
    };

	return (
		<div className="cook-page">
			<div className="cook-page-container">
        <CookArena recipe={activeRecipe} updateRecipe={updateRecipe} />
				<div className="recipe-side">
					<RecipeComponent
						recipe={activeRecipe}
						hasButton={false}
						classNameCard="recipe-cook-page"
						classNameIngContent="recipe-content-cook-page"
					/>
				</div>
			</div>
		</div>
	);
};

export default CookPage;
