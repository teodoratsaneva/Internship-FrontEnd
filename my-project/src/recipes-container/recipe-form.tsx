import IngredientsListComponent from "./recipe-list";
import { Recipe } from "../interfaces/recipe-interface";
import FooterComponent from "../common-components/footer";

const RecipeComponent = (props: { recipe: Recipe }) => {
	const { recipe } = props;

	return (
		<div className="recipe-card">
			<h2 className="header-card">{recipe.title}</h2>
			<IngredientsListComponent ingredients={recipe.ingredients} />
			<FooterComponent 
				className="cook-button"
				buttonText="Cook"
				linkTo="/cook"
				/>
			</div>
	);
};

export default RecipeComponent;
