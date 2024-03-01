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
import { getRecipeSaveDate } from "../utils/get-recipe-save-date";

const maxHearts = 3;

const EnhancedCookArena = withDiscoModeArena(CookArena);

const CookPage = () => {
    const activeRecipeRaw = localStorage.getItem("activeRecipe");
    const activeRecipe = activeRecipeRaw ? JSON.parse(activeRecipeRaw) : null;
    const [open, setOpen] = useState(false);
    const [recipe, setRecipe] = useState(activeRecipe);
    const allIngredientsCount = activeRecipe.ingredients.reduce((total: number, ingredient: Ingredient) => total + ingredient.amount, 0);
    const [caughtIngredientsCount, setIngredientsCount] = useState(allIngredientsCount);
    const [hearts, setHearts] = useState(maxHearts);
    const [isWonGame, setIsWonGame] = useState(true);

    const handleModal = useCallback((open: boolean) => {
        setOpen(open);
    }, []);

    const handleCompleteRecipe = () => {
        const completedRecipe: Recipe = {
            id: uuidv4(),
            title: activeRecipe.title,
            ingredients: activeRecipe.ingredients,
            date: getRecipeSaveDate()
        };

        saveRecipeToLocalStorage(completedRecipe, "completedRecipes");
        localStorage.removeItem("activeRecipe");
    };

    const onCatch = (id: string, caughtIngredientsCount: number, hearts: number) => {
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

			setIngredientsCount(caughtIngredientsCount);
			setHearts(hearts);

            if (caughtIngredientsCount === 0) {
                handleModal(true);
            }

            return updatedRecipe;
        });
    };

	const onLifeLoss = () =>{
		setHearts(prevHearts => prevHearts - 1);
	}

	useEffect(() => {
		if (hearts === 0) {
			handleModal(true);
			setIsWonGame(false);
		}
	}, [hearts]);

    return (
        <div className="cook-page">
            <div className="cook-page-container">
                <EnhancedCookArena
                    ingredients={recipe.ingredients}
                    onCatch={onCatch}
                    hearts={hearts}
                    caughtIngredientsCount={caughtIngredientsCount} 
					onLifeLoss={onLifeLoss}/>
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
                    onClose={() => handleModal(false)}
                    text={"Congratulations you won!"}
                    link={"/cookbook"}
                    buttonText={"Back to cookbook"}
                    handleCompleteRecipe={handleCompleteRecipe}
                />
            ) : (
                <CompleteRecipeModal
                    open={open}
                    onClose={() => handleModal(false)}
                    text={"Sorry! You lost!"}
                    link={"/"}
                    buttonText={"Back to home page"}
                />
            )}
        </div>
    );
};

export default CookPage;