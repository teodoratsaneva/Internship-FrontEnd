import Heading from "../common-components/heading-component";
import TitleRecipeComponent from "./title-recipe-component";
import IngredientRecipeComponent from "./ingredient-recipe-component";
import FooterComponent from "../common-components/footer";
import { FormControl} from "@mui/material";
import { Ingredient } from "../interfaces/ingredient-interface";
import { useMemo } from "react";

const styleForm = {
	position: "absolute",
	top: "60%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 900,
	height: 650,
	overflow: "auto",
	bgcolor: "#242633",
	p: "20px",
	borderRadius: "10px",
};

const RecursiveIngredientComponent = ({
  ingredients,
  handleIngredientNameChange,
  handleIngredientQuantityChange,
  handleAddIngredient,
}) => {
  return useMemo(() => {
    const renderIngredients = (ingredientList, parentId = null) => (
      <>
        {ingredientList.map((ingredient:Ingredient) => (
          <IngredientRecipeComponent
            key={ingredient.id}
            value={ingredient.title}
            parentId={parentId}
            onChangeName={(value) => handleIngredientNameChange(ingredient.id, value)}
            onChangeQuantity={(value) => handleIngredientQuantityChange(ingredient.id, value)}
            onAddIngredient={() => handleAddIngredient(ingredient.id)}
          >
            {ingredient.subIngredients && renderIngredients(ingredient.subIngredients, ingredient.id)}
          </IngredientRecipeComponent>
        ))}
      </>
    );

    return renderIngredients(ingredients);
  }, [ingredients, handleIngredientNameChange, handleIngredientQuantityChange, handleAddIngredient]);
};

const FormComponent = ({
  recipe,
  setRecipe,
  handleAddIngredient,
  handleIngredientNameChange,
  handleIngredientQuantityChange,
  handleSaveAndReset,
  handleSaveAndExit
}) => {
  return (
    <FormControl className="recipe-form"  sx={styleForm}>
      <div className="header-form">
        <Heading variant="h4">Create new potion recipe</Heading>
        <TitleRecipeComponent
          value={recipe.title}
          onChangeName={(value) => setRecipe({ ...recipe, title: value })}
          onAddIngredient={() => handleAddIngredient()}
        />
      </div>
      <div className="contend-form">
      <RecursiveIngredientComponent
        ingredients={recipe.ingredients}
        handleIngredientNameChange={handleIngredientNameChange}
        handleIngredientQuantityChange={handleIngredientQuantityChange}
        handleAddIngredient={handleAddIngredient}
      />
      </div>
      <FooterComponent
        className="create-recipe-button"
        buttonText="Save and continue"
        onClickButtonSaveAndExit={handleSaveAndExit}
        onClickButtonSavaAndReset={handleSaveAndReset}
        buttonText2="Save and reset"
      />
    </FormControl>
  );
};

export default FormComponent;
