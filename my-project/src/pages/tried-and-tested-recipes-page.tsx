import HeaderComponent from "../common-components/header-page-component";
import Heading from "../common-components/heading-component";
import { Recipe } from "../interfaces/recipe-interface";
import RecipeComponent from "../recipe-card/recipe-form";

const TriedAndTestedRecipes = () => {
	const completedRecipesRaw = localStorage.getItem("completedRecipes");
	const completedRecipes = completedRecipesRaw ? JSON.parse(completedRecipesRaw) : [];

	return (
		<>
			<HeaderComponent />
			<div className="cookbook-page-container">
				<Heading variant="h1">
					Here are all the tried and tested recipes
				</Heading>
				<div className="recipes-container">
					{completedRecipes.map((recipe: Recipe) => (
						<div key={recipe.id} className="recipe-container">
							<RecipeComponent
								recipe={recipe}
								hasButton={true}
								classNameCard="recipe-card"
								classNameIngContent="content-card"
							/>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default TriedAndTestedRecipes;
