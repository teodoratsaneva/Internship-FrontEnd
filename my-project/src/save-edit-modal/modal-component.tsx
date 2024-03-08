import Modal from "@mui/material/Modal";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Ingredient } from "../interfaces/ingredient-interface";
import { Recipe } from "../interfaces/recipe-interface";
import { saveRecipeToLocalStorage } from "../utils/local-storage-save";
import FormComponent from "./form";
import { ModalComponentProps } from "../interfaces/modal-component-interface";

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

const ModalComponent: React.FC<ModalComponentProps> = ({ open, onClose, recipe, isRecipeForUpdate, handleSaveEditedRecipe}) => {
	
	const [editedRecipe, setRecipe] = useState<Recipe>(recipe ? recipe : {
		id: uuidv4(),
		title: "",
		ingredients: [],
	});

	useEffect(() => {
		if (!open) {
			setRecipe(recipe ? recipe : {
				id: uuidv4(),
				title: "",
				ingredients: [],
			});
		}
	}, [open, recipe]);

	const handleAddIngredient = (
		parentId?: string | null,
		selectedIngredientLabel?: string
	) => {
		const newIngredient: Ingredient = {
			id: uuidv4(),
			title: selectedIngredientLabel || "",
			amount: 0,
			subIngredients: [],
		};

		if (parentId) {
			const updatedIngredients = editedRecipe.ingredients.map((ingredient) => {
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
				...editedRecipe,
				ingredients: updatedIngredients,
			});
		} else {
			setRecipe({
				...editedRecipe,
				ingredients: [...editedRecipe.ingredients, newIngredient],
			});
		}
	};

	const handleIngredientNameChange = (id: string, value: string) => {
		const updatedIngredients = editedRecipe.ingredients.map((ingredient) => {
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
	
		const updatedRecipe = { ...editedRecipe, ingredients: updatedIngredients };
		setRecipe(updatedRecipe);
		return updatedRecipe;
	};	

	const handleRemoveIngredient = (id: string, parentId?: string | null) => {
		let updatedIngredients;

		if (parentId) {
			updatedIngredients = editedRecipe.ingredients.map((ingredient) => {
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
			updatedIngredients = editedRecipe.ingredients.filter(
				(ingredient) => ingredient.id !== id
			);
		}

		setRecipe({
			...editedRecipe,
			ingredients: updatedIngredients,
		});
	};

	const handleIngredientAmountChange = (id: string, amount: number) => {
		const updatedIngredients = editedRecipe.ingredients.map((ingredient) => {
			if (ingredient.id === id) {
				return { ...ingredient, amount: amount };
			} else if (ingredient.subIngredients) {
				return {
					...ingredient,
					subIngredients: ingredient.subIngredients.map(
						(subIngredient) => {
							if (subIngredient.id === id) {
								return { ...subIngredient, amount: amount };
							}
							return subIngredient;
						}
					),
				};
			}
			return ingredient;
		});
	
		const updatedRecipe = { ...editedRecipe, ingredients: updatedIngredients };
		setRecipe(updatedRecipe);
		return updatedRecipe;
	};
	

	const handleSaveAndReset = () => {
		saveRecipeToLocalStorage(editedRecipe, "items");

		setRecipe({
			id: uuidv4(),
			title: "",
			ingredients: [],
		});
	};

	const handleSaveAndExit = () => {
		saveRecipeToLocalStorage(editedRecipe, "items");

		onClose();
	};

	return (
		<>
			<Modal className="modal" data-testId={`modal-recipe-${recipe?.id}`} open={open} onClose={onClose}>
				<>
					<FormComponent
						recipe={editedRecipe}
						setRecipe={setRecipe}
						handleAddIngredient={handleAddIngredient}
						handleIngredientAmountChange={handleIngredientAmountChange}
						handleIngredientNameChange={handleIngredientNameChange}
						handleSaveAndReset={handleSaveAndReset}
						handleSaveAndExit={handleSaveAndExit}
						handleSaveEditedRecipe={handleSaveEditedRecipe}
						handleRemoveIngredient={handleRemoveIngredient}
						isRecipeForUpdate={isRecipeForUpdate}
						style={styleModal}
					/>
				</>
			</Modal>
		</>
	);
};

export default ModalComponent;