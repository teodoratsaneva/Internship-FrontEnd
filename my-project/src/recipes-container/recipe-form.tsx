import IngredientsListComponent from "./recipe-list";
import { Link } from "react-router-dom";
import { Recipe } from "../interfaces/recipe-interface";
import Button from "@mui/material/Button";

const RecipeComponent = (props: { recipe: Recipe }) => {
	const { recipe } = props;

	return (
		<div className="recipe-card">
			<h2 className="header-card">{recipe.title}</h2>
			<IngredientsListComponent ingredients={recipe.ingredients} />
			<div className="footer-card">
				<Button
					key={recipe.id}
					className="cook-button"
					variant="contained"
					component={Link}
					to="/cook"
				>
					Cook
				</Button>
			</div>
		</div>
	);
};

export default RecipeComponent;
