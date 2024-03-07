import Heading from "../common-components/heading-component";
import TitleRecipeComponent from "./title-recipe-component";
import IngredientRecipeComponent from "./ingredient-recipe-component";
import FooterComponent from "../common-components/footer";
import { FormControl } from "@mui/material";
import { Ingredient } from "../interfaces/ingredient-interface";
import React, { useEffect, useMemo, useState } from "react";
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
						defaultValueTitle={ingredient.title}
						defaultValueAmount={ingredient.amount}
						parentId={parentId}
						onChangeName={(value) =>
							handleIngredientNameChange(ingredient.id, value)
						}
						onChangeAmount={(value) =>
							handleIngredientAmountChange(ingredient.id, parseInt(value))
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
	handleSaveEditedRecipe,
	handleRemoveIngredient,
	isRecipeForUpdate,
	style,
}) => {
	const [isFormEmpty, setIsFormEmpty] = useState(true);

	const buttons = useMemo(() => {
		return isRecipeForUpdate
			? [
					{
						className: "button-recipe-form",
						datatestid: 'save-edited-button',
						buttonText: "Save edited recipe",
						onClick: () =>
							handleSaveEditedRecipe &&
							handleSaveEditedRecipe(recipe),
						variant: "text",
						component: "button",
					},
			]
			: [
					{
						className: "button-recipe-form",
						datatestid: 'save-and-continue-button',
						buttonText: "Save and continue",
						onClick: () => handleSaveAndExit && handleSaveAndExit(),
						variant: "text",
						component: "button",
					},
					{
						className: "button-recipe-form",
						datatestid: 'save-and-reset-button',
						buttonText: "Save and reset",
						onClick: () =>
							handleSaveAndReset && handleSaveAndReset(),
						variant: "text",
						component: "button",
					},
			];
	}, [
		isRecipeForUpdate,
		handleSaveEditedRecipe,
		handleSaveAndExit,
		handleSaveAndReset,
		recipe,
	]);

	useEffect(() => {
		const isAtLeastOneIngredientCreated = recipe.ingredients.length > 0;
		const allFieldsEmpty = !isAtLeastOneIngredientCreated ||
			recipe.title.trim() === "" ||
			recipe.ingredients.some(
				(ingredient) =>
					ingredient.title.trim() === "" || ingredient.amount < 1 || Number.isNaN(ingredient.amount) ||
					(ingredient.subIngredients && ingredient.subIngredients.some(
						(subIngredient) => subIngredient.title.trim() === "" || subIngredient.amount < 1 || Number.isNaN(subIngredient.amount)
					))
			);

		setIsFormEmpty(allFieldsEmpty);
	}, [recipe]);

	return (
		<FormControl className="recipe-form" data-testId={`recipe-form-${recipe.id}`} sx={style}>
			<div className="header-form">
				<Heading variant="h4">Create new potion recipe</Heading>
				<TitleRecipeComponent
					value={recipe.title}
					defaultValueTitle={recipe.title}
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
			<FooterComponent buttons={buttons} isFormEmpty={isFormEmpty} />
		</FormControl>
	);
};

export default React.memo(FormComponent);
