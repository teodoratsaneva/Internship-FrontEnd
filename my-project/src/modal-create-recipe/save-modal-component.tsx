import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Ingredient } from "../interfaces/ingredient-interface";
import { Recipe } from "../interfaces/recipe-interface";
import { saveRecipeToLocalStorage } from "../utils/local-storage-save";
import FormComponent from "./form";

const styleModal = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	overflow: "auto",
	bgcolor: "#242633",
	p: "2vh",
	borderRadius: "1vh",
};

const ModalComponent = ({ open, close}) => {
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
			quantity: 0,
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
								return { ...subIngredient, title: value };
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

	const handleRemoveIngredient = (id: string, parentId?: string | null) => {
		let updatedIngredients;

		if (parentId) {
			updatedIngredients = recipe.ingredients.map((ingredient) => {
				if (ingredient.id === parentId || ingredient.subIngredients) {
					return {
						...ingredient,
						subIngredients: (
							ingredient.subIngredients || []
						).filter((subIngredient) => subIngredient.id !== id),
					};
				}

				return ingredient;
			});
		} else {
			updatedIngredients = recipe.ingredients.filter(
				(ingredient) => ingredient.id !== id
			);
		}

		setRecipe({
			...recipe,
			ingredients: updatedIngredients,
		});
	};

	const handleIngredientQuantityChange = (id: string, value: string) => {
		const quantity = parseInt(value);

		const updatedIngredients = recipe.ingredients.map((ingredient) => {
			if (ingredient.id === id) {
				return { ...ingredient, quantity: quantity };
			} else if (ingredient.subIngredients) {
				return {
					...ingredient,
					subIngredients: ingredient.subIngredients.map(
						(subIngredient) => {
							if (subIngredient.id === id) {
								return { ...subIngredient, quantity: quantity };
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

	const handleSaveAndReset = () => {
		saveRecipeToLocalStorage(recipe, "items");

		setRecipe({
			id: uuidv4(),
			title: "",
			ingredients: [],
		});
	};

	const handleSaveAndExit = () => {
		saveRecipeToLocalStorage(recipe, "items");

		close();
	};

	return (
		<>
			<Modal className="modal" open={open} onClose={close}>
					<FormComponent
						recipe={recipe}
						setRecipe={setRecipe}
						handleAddIngredient={handleAddIngredient}
						handleIngredientQuantityChange={
							handleIngredientQuantityChange
						}
						handleIngredientNameChange={handleIngredientNameChange}
						handleSaveAndReset={handleSaveAndReset}
						handleSaveAndExit={handleSaveAndExit}
						handleRemoveIngredient={handleRemoveIngredient}
						style={styleModal}
					/>
			</Modal>
		</>
	);
};

export default ModalComponent;