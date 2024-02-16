import { useEffect, useState, useCallback, useRef } from "react";
import RecipeComponent from "../recipes-container/recipe-form";
import CookArena from "../cook-page-components/cook-arena";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import p5 from "p5";
import _ from 'lodash';
import CompleteRecipeModal from "../cook-page-components/complete-recipe-modal";

const maxHearts = 3;
const customColor = 255;
const opasity = 0;
const numberForRandomColor = 16777215;
const hexadecimalSystem = 16;

const CookPage = () => {
	const activeRecipeRaw = localStorage.getItem("activeRecipe");
	const activeRecipe = activeRecipeRaw ? JSON.parse(activeRecipeRaw) : null;
	const [open, setOpen] = useState(false);
	const [hearts, setHearts] = useState(maxHearts);
	const [recipe, setRecipe] = useState(activeRecipe);
	const allIngredientsCount = activeRecipe.ingredients.reduce((total, ingredient) => total + ingredient.quantity, 0);
	const ingredientsCount = useRef(allIngredientsCount);
	const [isWonGame, setIsWonGame] = useState(true);
	

	const handleOpenModal = useCallback(() => {
		setOpen(true);
	}, []);

	const handleCloseModal = useCallback(() => {
		setOpen(false);
	}, []);

	const setDefaultStyle = (p: p5) => {
		p.background(customColor, customColor, customColor, opasity);
			document
				.querySelector(".recipe-cook-page")
				?.setAttribute(
					"style",
					`background-color: #242633; color: 'white;`
				);
			document
				.querySelector(".recipe-side")
				?.setAttribute("style", `background-color: none;`);
	}

	const onCatch = (id, ingredientsCount) => {
		setRecipe(prevRecipe => {
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
	
	const triggerDiscoMode = (discoColor, p: p5) => {
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
					<CookArena
						ingredients={recipe.ingredients}
						onCatch={onCatch}
						triggerDiscoMode={triggerDiscoMode}
						onLifeLoss={onLifeLoss}
						hearts={hearts}
						ingredientsCount={ingredientsCount}
					/>
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
			{
				isWonGame ?
				<CompleteRecipeModal open={open} close={handleCloseModal} 
				text={"Congratulations you won!"} link={"/cookbook"} buttonText={"Back to cookbook"}/> :
				<CompleteRecipeModal open={open} close={handleCloseModal} 
				text={"Sorry! You lost!"} link={"/"} buttonText={"Back to home page"}/>
			}

		</div>
	);
};

export default CookPage;
