import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Heading from "../commonComponents/heading-component";
import TitleRecipeComponent from "./title-recipe-component";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Ingredient } from "../interfaces/ingredient-interface";
import { Recipe } from "../interfaces/recipe-interface";
import IngredientRecipeComponent from "./ingredient-recipe-component";
import {saveToLocalStorage} from "../utils/local-storage-utils";
import FooterComponent from "../commonComponents/footer";

const styleBox = {
	position: "absolute",
	top: "60%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 900,
	height: 750,
	overflow: "auto",
	bgcolor: "#242633",
	p: "20px",
	borderRadius: "10px",
};

const ModalFormComponent = ({ open, close }) => {
	const [recipe, setRecipe] = useState<Recipe>({
		id: uuidv4(),
		title: "",
		ingredients: [],
	});

	useEffect(() => {
		if (!open) {
			setRecipe({
				id: uuidv4(),
				title: "",
				ingredients: [],
			});
		}
	}, [open]);

	const handleAddIngredient = (
		parentId?: string | null,
		selectedIngredientLabel?: string
	) => {
		const newIngredient: Ingredient = {
			id: uuidv4(),
			title: selectedIngredientLabel || "",
			quantity: "",
			subIngredients: [],
		};

		if (parentId) {
			const updatedIngredients = recipe.ingredients.map((ingredient) => {
				if (ingredient.id === parentId) {
					return {
						...ingredient,
						subIngredients: [
							...(ingredient.subIngredients || []),
							newIngredient,
						],
					};
				}

				return ingredient;
			});

			setRecipe({
				...recipe,
				ingredients: updatedIngredients,
			});
		} else {
			setRecipe({
				...recipe,
				ingredients: [...recipe.ingredients, newIngredient],
			});
		}
	};

	const handleIngredientNameChange = (id: string, value: string) => {
		const updatedIngredients = recipe.ingredients.map((ingredient) => {
			if (ingredient.id === id) {
				return { ...ingredient, title: value };
			} else if (ingredient.subIngredients) {
				return {
					...ingredient,
					subIngredients: ingredient.subIngredients.map(
						(subIngredient) => {
							if (subIngredient.id === id) {
								return { ...ingredient, title: value };
							}

							return subIngredient;
						}
					),
				};
			}

			return ingredient;
		});

		setRecipe({ ...recipe, ingredients: updatedIngredients });
	};

	const handleIngredientQuantityChange = (id: string, value: string) => {
		const updatedIngredients = recipe.ingredients.map((ingredient) => {
			if (ingredient.id === id) {
				return { ...ingredient, quantity: value };
			} else if (ingredient.subIngredients) {
				return {
					...ingredient,
					subIngredients: ingredient.subIngredients.map(
						(subIngredient) => {
							if (subIngredient.id === id) {
								return { ...ingredient, quantity: value };
							}

							return subIngredient;
						}
					),
				};
			}

			return ingredient;
		});

		setRecipe({ ...recipe, ingredients: updatedIngredients });
	};

	const handleSaveOnLocalStorage = () => {
		saveToLocalStorage(recipe);

		setRecipe({
			id: uuidv4(),
			title: "",
			ingredients: [],
		});
	};

	return (
		<>
			<Modal open={open} onClose={close}>
				<Box className="recipe-box" sx={styleBox}>
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
						{recipe.ingredients.map((ingredient) => (
							<IngredientRecipeComponent
								key={ingredient.id}
								value={ingredient.title}
								parentId={null}
								onChangeName={(value) =>
									handleIngredientNameChange(ingredient.id, value)
								}

								onChangeQuantity={(value) =>
									handleIngredientQuantityChange(ingredient.id, value)
								}

								onAddIngredient={() =>
									handleAddIngredient(ingredient.id)
								}
							>
								{ingredient.subIngredients &&
									ingredient.subIngredients.map(
										(subIngredient) => (
											<IngredientRecipeComponent
												key={subIngredient.id}
												value={subIngredient.title}
												parentId={ingredient.id}
												onChangeName={(value) =>
													handleIngredientNameChange(
														subIngredient.id,
														value
													)
												}

												onChangeQuantity={(value) =>
													handleIngredientQuantityChange(ingredient.id, value)
												}
												
												onAddIngredient={() =>
													handleAddIngredient(
														subIngredient.id
													)
												}
											/>
										)
									)}
							</IngredientRecipeComponent>
						))}
					</div>
					<FooterComponent
							className="create-recipe-button"
							buttonText={"Save changes"}
							onClick={handleSaveOnLocalStorage}
						/>
				</Box>
			</Modal>
		</>
	);
};

export default ModalFormComponent;
