import Heading from "../common-components/heading-component";
import TitleRecipeComponent from "./title-recipe-component";
import IngredientRecipeComponent from "./ingredient-recipe-component";
import FooterComponent from "../common-components/footer";
import { FormControl} from "@mui/material";

const styleForm = {
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
        {recipe.ingredients.map((ingredient) => (
          <IngredientRecipeComponent
            key={ingredient.id}
            value={ingredient.title}
            parentId={null}
            onChangeName={(value) => handleIngredientNameChange(ingredient.id, value)}
            onChangeQuantity={(value) => handleIngredientQuantityChange(ingredient.id, value)}
            onAddIngredient={() => handleAddIngredient(ingredient.id)}
          >
            {ingredient.subIngredients &&
              ingredient.subIngredients.map((subIngredient) => (
                <IngredientRecipeComponent
                  key={subIngredient.id}
                  value={subIngredient.title}
                  parentId={ingredient.id}
                  onChangeName={(value) => handleIngredientNameChange(subIngredient.id, value)}
                  onChangeQuantity={(value) => handleIngredientQuantityChange(subIngredient.id, value)}
                  onAddIngredient={() => handleAddIngredient(subIngredient.id)}
                />
              ))}
          </IngredientRecipeComponent>
        ))}
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
