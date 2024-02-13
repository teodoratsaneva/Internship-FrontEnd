import RecipeComponent from "../recipes-container/recipe-form";
import CookArena from "../cook-page-components/cook-arena";
import { useEffect, useState } from "react";

const CookPage = () => {
	const activeRecipeRaw = localStorage.getItem("activeRecipe");
	const activeRecipe = activeRecipeRaw ? JSON.parse(activeRecipeRaw) : null;

	const [recipe, setRecipe] = useState(activeRecipe);

	const onCatch = (id: string) => {
		const updatedRecipe = { ...recipe };

		for (let i = 0; i < updatedRecipe.ingredients.length; i++) {
			if (id === updatedRecipe.ingredients[i].id) {
				updatedRecipe.ingredients[i].quantity -= 1;
				setRecipe(updatedRecipe);

				break;
			}
		}
	};

	useEffect(() => {

	}, [recipe]);

	return (
		<div className="cook-page">
			<div className="cook-page-container">
				<CookArena ingredients={recipe.ingredients}
					onCatch={onCatch}
				/>
				<div className="recipe-side">
					<RecipeComponent
						recipe={recipe}
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