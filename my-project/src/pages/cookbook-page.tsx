import React from "react";
import RecipeComponent from "../recipes-container/recipe-form";
import recipes from "../recipes-container/data-recipes";
import HeaderComponent from "../utils/header-page-component";
import Heading from "../utils/heading-component";

const CookbookPage: React.FC = () => {
	return (
		<>
			<HeaderComponent />
			<div className="cookbook-page-container">
				<Heading variant="h1">
					Welcome to the Cookbook. Here is a list of your cooking
					spells
				</Heading>
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
