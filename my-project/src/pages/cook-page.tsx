import { useEffect, useRef } from "react";
import RecipeComponent from "../recipes-container/recipe-form";

const CookPage = () => {
	const activeRecipeRaw = localStorage.getItem("activeRecipe");
	const activeRecipe = activeRecipeRaw ? JSON.parse(activeRecipeRaw) : null;

	return (
		<div className="cook-page">
			<div className="cook-page-container">
        <div className="area"></div>
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
