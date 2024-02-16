import Heading from "../common-components/heading-component";
import TitleRecipeComponent from "./title-recipe-component";
import IngredientRecipeComponent from "./ingredient-recipe-component";
import FooterComponent from "../common-components/footer";
import { FormControl } from "@mui/material";
import { Ingredient } from "../interfaces/ingredient-interface";
import { useMemo } from "react";

const styleTextFeld = {
	".MuiInputBase-input": {
		color: "white",
		width: "450px",
		height: "10px",
	},
	".MuiFormLabel-root": {
		color: "white",
	},
	".MuiFormControl-root": {
		borderColor: "white",
	},
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			borderColor: "white",
			color: "white",
		},
		"&:hover fieldset": {
			borderColor: "white",
		},
		"&.Mui-focused fieldset": {
			borderColor: "white",
		},
	},
};

const IngredientsComponent = ({
	ingredients,
	handleIngredientNameChange,
	handleIngredientQuantityChange,
	handleAddIngredient,
	handleRemoveIngredient,
}) => {
	return useMemo(() => {
		const renderIngredients = (
			ingredientList,
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
						onChangeQuantity={(value) =>
							handleIngredientQuantityChange(ingredient.id, value)
						}
						onAddIngredient={() =>
							handleAddIngredient(ingredient.id)
						}
						onRemoveIngredient={(e) => {
							e.preventDefault()
							handleRemoveIngredient(ingredient.id, parentId)
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

const FormComponent = ({
	recipe,
	setRecipe,
	handleAddIngredient,
	handleIngredientNameChange,
	handleIngredientQuantityChange,
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
					style={styleTextFeld}
				/>
			</div>
			<div className="contend-form">
				<IngredientsComponent
					ingredients={recipe.ingredients}
					handleIngredientNameChange={handleIngredientNameChange}
					handleIngredientQuantityChange={
						handleIngredientQuantityChange
					}
					handleAddIngredient={handleAddIngredient}
					handleRemoveIngredient={handleRemoveIngredient}
				/>
			</div>
			<FooterComponent
				className="create-recipe-button"
				buttonText="Save and continue"
				onClickButton1={handleSaveAndExit}
				onClickButton2={handleSaveAndReset}
				buttonText2="Save and reset"
			/>
		</FormControl>
	);
};

export default FormComponent;
