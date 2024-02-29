import { useEffect, useState, useCallback, useRef } from "react";
import RecipeComponent from "../recipe-card/recipe-form";
import CookArena from "../cook-page-components/cook-arena";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import _ from "lodash";
import CompleteRecipeModal from "../cook-page-components/complete-recipe-modal";
import { saveRecipeToLocalStorage } from "../utils/local-storage-save";
import { Recipe } from "../interfaces/recipe-interface";
import { v4 as uuidv4 } from "uuid";
import withDiscoModeArena from "../cook-page-components/with-disco-mode-arena";
import { Ingredient } from "../interfaces/ingredient-interface";

const maxHearts = 3;

const EnhancedCookArena = withDiscoModeArena(CookArena);

const CookPage = () => {
	const activeRecipeRaw = localStorage.getItem("activeRecipe");
	const activeRecipe = activeRecipeRaw ? JSON.parse(activeRecipeRaw) : null;
	const [open, setOpen] = useState(false);
	const [recipe, setRecipe] = useState(activeRecipe);
	const allIngredientsCount = activeRecipe.ingredients.reduce((total: number, ingredient: Ingredient) => total + ingredient.amount,0);
	const ingredientsCount = useRef(allIngredientsCount);
	const hearts = useRef(maxHearts);
	const [isWonGame, setIsWonGame] = useState(true);

	const handleOpenModal = useCallback(() => {
		setOpen(true);
	}, []);

	const handleCloseModal = useCallback(() => {
		setOpen(false);
	}, []);

	const getDate = () => {
		const today = new Date();
		const year = today.getFullYear();
		const month = today.getMonth() + 1;
		const date = today.getDate();
		return `${date}/${month}/${year}`;
	}

	const handleCompleteRecipe = () => {
		const completedRecipe: Recipe = {
			id: uuidv4(),
			title: activeRecipe.title,
			ingredients: activeRecipe.ingredients,
			date: getDate()
		};

		saveRecipeToLocalStorage(completedRecipe, "completedRecipes");
		localStorage.removeItem("activeRecipe");
	};

	const onCatch = (id: string, ingredientsCount: number) => {
		setRecipe((prevRecipe: Recipe) => {
			const updatedRecipe = _.cloneDeep(prevRecipe);
			let i = 0;

			while (i < updatedRecipe.ingredients.length) {
				if (id === updatedRecipe.ingredients[i].id) {
					updatedRecipe.ingredients[i].amount -= 1;

					break;
				}

				i++;
			}

			if (ingredientsCount === 0) {
				handleOpenModal();
			}

			return updatedRecipe;
		});
	};

	useEffect(() => {
		if (hearts.current === 0) {
			handleOpenModal();
			setIsWonGame(false);
		}
	}, [hearts.current]);
	

	return (
		<div className="cook-page">
			<div className="cook-page-container">
				<EnhancedCookArena
					ingredients={recipe.ingredients}
					onCatch={onCatch}
					hearts={hearts}
					ingredientsCount={ingredientsCount} />
				<div className="recipe-side">
					<RecipeComponent
						recipe={recipe}
						hasButton={false}
						classNameCard="recipe-cook-page"
						classNameIngContent="recipe-content-cook-page"
					/>
					<div className="heart-lives">
						{[...Array(hearts.current)].map((_, index) => (
							<FavoriteBorderRoundedIcon
								key={index}
								className="heart"
							/>
						))}
					</div>
				</div>
			</div>
			{isWonGame ? (
				<CompleteRecipeModal
					open={open}
					onClose={handleCloseModal}
					text={"Congratulations you won!"}
					link={"/cookbook"}
					buttonText={"Back to cookbook"}
					handleCompleteRecipe={handleCompleteRecipe}
				/>
			) : (
				<CompleteRecipeModal
					open={open}
					onClose={handleCloseModal}
					text={"Sorry! You lost!"}
					link={"/"}
					buttonText={"Back to home page"}
				/>
			)}
		</div>
	);
};

export default CookPage;
