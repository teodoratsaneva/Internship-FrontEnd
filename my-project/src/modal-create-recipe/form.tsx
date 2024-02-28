import Heading from "../common-components/heading-component";
import TitleRecipeComponent from "./title-recipe-component";
import IngredientRecipeComponent from "./ingredient-recipe-component";
import FooterComponent from "../common-components/footer";
import { FormControl } from "@mui/material";
import { Ingredient } from "../interfaces/ingredient-interface";
import React, { useMemo } from "react";
import { IngredientsComponentProps } from "../interfaces/ingredient-component-interface";
import { FormComponentProps } from "../interfaces/form-component-interface";

const IngredientsComponent: React.FC<IngredientsComponentProps> = ({
	ingredients,
	handleIngredientNameChange,
	handleIngredientAmountChange,
	handleAddIngredient,
	handleRemoveIngredient,
}) => {
	return useMemo(() => {
		const renderIngredients = (
			ingredientList: Ingredient[],
			parentId?: string | null
		) => (
			<>
				{ingredientList.map((ingredient: Ingredient) => (
					<IngredientRecipeComponent
						key={ingredient.id}
						value={ingredient.title}
						parentId={parentId}
						onChangeName={(value) =>
							handleIngredientNameChange(ingredient.id, value)
						}
						onChangeAmount={(value) =>
							handleIngredientAmountChange(ingredient.id, value)
						}
						onAddIngredient={() =>
							handleAddIngredient(ingredient.id)
						}
						onRemoveIngredient={(e) => {
							e.preventDefault();
							handleRemoveIngredient(ingredient.id, parentId!);
						}}
					>
						{ingredient.subIngredients &&
							renderIngredients(
								ingredient.subIngredients,
								ingredient.id
							)}
					</IngredientRecipeComponent>
				))}
			</>
		);

		return renderIngredients(ingredients);
	}, [ingredients]);
};

const FormComponent: React.FC<FormComponentProps> = ({
	recipe,
	setRecipe,
	handleAddIngredient,
	handleIngredientNameChange,
	handleIngredientAmountChange,
	handleSaveAndReset,
	handleSaveAndExit,
	handleRemoveIngredient,
	style
}) => {
	return (
		<FormControl className="recipe-form" sx={style}>
			<div className="header-form">
				<Heading variant="h4">Create new potion recipe</Heading>
				<TitleRecipeComponent
					value={recipe.title}
					onChangeName={(value) =>
						setRecipe({ ...recipe, title: value })
					}
					onAddIngredient={() => handleAddIngredient()}
				/>
			</div>
			<div className="contend-form">
				<IngredientsComponent
					ingredients={recipe.ingredients}
					handleIngredientNameChange={handleIngredientNameChange}
					handleIngredientAmountChange={handleIngredientAmountChange}
					handleAddIngredient={handleAddIngredient}
					handleRemoveIngredient={handleRemoveIngredient}
				/>
			</div>
			<FooterComponent
				buttons={[
					{
						className: "create-recipe-button",
						buttonText: "Save and continue",
						onClick: handleSaveAndExit
					},
					{
						className: "create-recipe-button",
						buttonText: "Save and reset",
						onClick: handleSaveAndReset
					}
				]}
			/>
		</FormControl>
	);
};

export default FormComponent;