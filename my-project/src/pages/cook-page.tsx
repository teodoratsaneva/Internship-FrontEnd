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
import { getRecipeSaveDate } from "../utils/get-recipe-save-date";
import { calculateTotalIngredientsCount } from "../utils/calculate-total-count-ingredients";

const maxHearts = 3;

const EnhancedCookArena = withDiscoModeArena(CookArena);

const CookPage = () => {
    const activeRecipeRaw = localStorage.getItem("activeRecipe");
    const activeRecipe = activeRecipeRaw ? JSON.parse(activeRecipeRaw) : null;
    const [open, setOpen] = useState(false);
    const [recipe, setRecipe] = useState(activeRecipe);
    const allIngredientsCount = calculateTotalIngredientsCount(activeRecipe.ingredients);
    const caughtIngredientsCount = useRef(allIngredientsCount);
    const [hearts, setHearts] = useState(maxHearts);
    const isWonGame = useRef(true);

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

    const onCatch = (id: string, caughtIngredientsCount: number) => {
        setRecipe((prevRecipe: Recipe) => {
            const updatedRecipe = _.cloneDeep(prevRecipe);
            let i = 0;

            while (i < updatedRecipe.ingredients.length) {
                if (id === updatedRecipe.ingredients[i].id) {
                    updatedRecipe.ingredients[i].amount -= 1;
                    
                    break;
                }
                
                if(updatedRecipe.ingredients[i].subIngredients!.length > 0){
                    let j = 0;

                    while(j < updatedRecipe.ingredients[i].subIngredients!.length)
                    {
                        if (id === updatedRecipe.ingredients[i].subIngredients![j].id) {
                            updatedRecipe.ingredients[i].subIngredients![j].amount -= 1;
                            
                            break;
                        }

                        j++;
                    }
                }

                i++;
            }

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
			isWonGame.current = false;
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
					onLifeLoss={onLifeLoss}
                    isWonGame={isWonGame}
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
            {isWonGame.current ? (
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