import React from "react";
import IngredientsListComponent from "./recipe-list";
import FooterComponent from "../common-components/footer";
import { RecipeComponentProps } from "../interfaces/recipe-component-interface";
import { saveRecipeToLocalStorage } from "../utils/local-storage-save";
import { Link } from "react-router-dom";

const RecipeComponent: React.FC<RecipeComponentProps> = ({
	recipe,
	hasButton,
	classNameCard,
	classNameIngContent,
	handleRemoveRecipe,
	handleEditRecipe,
}) => {
	const handleCookClick = () => {
		saveRecipeToLocalStorage(recipe, "activeRecipe");
	};

	const buttons=[
		{
			className: "cook-button",
			buttonText: "Edit Recipe",
			datatestid: `edit-button-${recipe.id}`,
			onClick: handleEditRecipe
				? () => handleEditRecipe()
				: () => {},
			variant: "text",
			component: "button"
		},
		{
			className: "cook-button",
			buttonText: "Cook",
			datatestid: `cook-button-${recipe.id}`,
			onClick: handleCookClick,
			linkTo: "/cook",
			variant: "contained",
			component: Link
		},
		{
			className: "cook-button",
			datatestid: `remove-button-${recipe.id}`,
			buttonText: "Remove Recipe",
			onClick: handleRemoveRecipe
				? () => handleRemoveRecipe(recipe.id)
				: () => {},
			variant: "text",
			component: "button"
		},
	];

	return (
		<div className={classNameCard}>
			<h2 className="header-card">{recipe.title}</h2>
			{recipe.date && <h4 className="header-card">{recipe.date}</h4>}
			<IngredientsListComponent
				ingredients={recipe.ingredients}
				className={classNameIngContent}
			/>
			{hasButton && !recipe.date && (
				<FooterComponent
					buttons={buttons}
				/>
			)}
		</div>
	);
};

export default RecipeComponent;
