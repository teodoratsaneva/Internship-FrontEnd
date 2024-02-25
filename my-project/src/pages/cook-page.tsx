import { useEffect, useState, useCallback, useRef } from "react";
import RecipeComponent from "../recipes-container/recipe-form";
import CookArena from "../cook-page-components/cook-arena";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import _ from "lodash";
import CompleteRecipeModal from "../cook-page-components/complete-recipe-modal";
import { saveRecipeToLocalStorage } from "../utils/local-storage-save";
import { Recipe } from "../interfaces/recipe-interface";
import { v4 as uuidv4 } from "uuid";
import { P5Drawer } from "../cook-page-components/drawer";
import withDiscoModeArena from "../cook-page-components/with-disco-mode-arena";

const maxHearts = 3;
const customColor = 255;
const opasity = 0;
const numberForRandomColor = 16777215;
const hexadecimalSystem = 16;
const EnhancedCookArena = withDiscoModeArena(CookArena);

const CookPage = () => {
	const activeRecipeRaw = localStorage.getItem("activeRecipe");
	const activeRecipe = activeRecipeRaw ? JSON.parse(activeRecipeRaw) : null;
	const [open, setOpen] = useState(false);
	const [hearts, setHearts] = useState(maxHearts);
	const [recipe, setRecipe] = useState(activeRecipe);
	const allIngredientsCount = activeRecipe.ingredients.reduce(
		(total, ingredient) => total + parseInt(ingredient.quantity),
		0
	);
	const ingredientsCount = useRef(allIngredientsCount);
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
		return `${month}/${date}/${year}`;
	}

	const handleCompleteRecipe = () => {
		const completedRecipe: Recipe = {
			id: uuidv4(),
			title: activeRecipe.title,
			ingredients: activeRecipe.ingredients,
			date: getDate()
		}
		saveRecipeToLocalStorage(completedRecipe, "completedRecipes");
		localStorage.removeItem("activeRecipe");
	};

	const setDefaultStyle = (p: P5Drawer) => {
		p.background(customColor, opasity);
		document.querySelector(".recipe-cook-page")?.setAttribute("style", `background-color: #242633; color: 'white;`);
		document.querySelector(".recipe-side")?.setAttribute("style", `background-color: none;`);
	};

	const onCatch = (id, ingredientsCount) => {
		setRecipe((prevRecipe) => {
			const updatedRecipe = _.cloneDeep(prevRecipe);
			let i = 0;

			while (i < updatedRecipe.ingredients.length) {
				if (id === updatedRecipe.ingredients[i].id) {
					updatedRecipe.ingredients[i].quantity -= 1;

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

	const triggerDiscoMode = (discoColor, p: P5Drawer) => {
		if (discoColor) {
			const randomColor = () =>
				"#" + Math.floor(Math.random() * numberForRandomColor).toString(hexadecimalSystem);

			p.background(randomColor());
			document
				.querySelector(".recipe-cook-page")
				?.setAttribute(
					"style",
					`background-color: ${randomColor()}; color: ${randomColor()};`
				);
			document
				.querySelector(".recipe-side")
				?.setAttribute("style", `background-color: ${randomColor()};`);
		} else {
			setDefaultStyle(p);
		}
	};

	const onLifeLoss = () => {
		setHearts((oldHearts) => {
			return oldHearts - 1;
		});
	};

	useEffect(() => {
		if (hearts === 0) {
			handleOpenModal();
			setIsWonGame(false);
		}

	}, [hearts]);

	return (
		<div className="cook-page">
			<div className="cook-page-container">
				<EnhancedCookArena
					ingredients={recipe.ingredients}
					onCatch={onCatch}
					triggerDiscoMode={triggerDiscoMode}
					onLifeLoss={onLifeLoss}
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
						{[...Array(hearts)].map((_, index) => (
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
					close={handleCloseModal}
					text={"Congratulations you won!"}
					link={"/cookbook"}
					buttonText={"Back to cookbook"}
					handleCompleteRecipe={handleCompleteRecipe}
				/>
			) : (
				<CompleteRecipeModal
					open={open}
					close={handleCloseModal}
					text={"Sorry! You lost!"}
					link={"/"}
					buttonText={"Back to home page"}
				/>
			)}
		</div>
	);
};

export default CookPage;
