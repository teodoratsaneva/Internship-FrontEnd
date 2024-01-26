import React from "react";
import RecipeComponent from "../recipes-container/recipe-form";
import recipes from "../recipes-container/data-recipes";
import HeaderComponent from "../utils/header-page-component";
import Heading from "../utils/heading-component";
import { Recipe } from "../interfaces/recipe-interface";

const CookbookPage: React.FC = () => {
	const storedIngredientsRaw = localStorage.getItem('items');
	const storedIngredients = storedIngredientsRaw ? JSON.parse(storedIngredientsRaw) : [];

	if (!storedIngredients) console.log('Local storage is empty');
	console.log(storedIngredients);

	const recipesToShow = Array.isArray(storedIngredients) ? storedIngredients : [];

	return (
		<>
			<HeaderComponent />
			<div className="cookbook-page-container">
				<Heading variant="h1">
					Welcome to the Cookbook. Here is a list of your cooking
					spells
				</Heading>
				<div className="recipes-container">
					{recipesToShow.map((recipe:Recipe) => (
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
