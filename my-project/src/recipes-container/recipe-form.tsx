import IngredientsListComponent from "./recipe-list";
import { Link } from "react-router-dom";
import { Recipe } from "../interfaces/recipe-interface";

const RecipeComponent = (props: { recipe: Recipe }) => {
    const { recipe } = props;

    return (
        <div className="recipe-card">
            <h2 className="header-card">{recipe.title}</h2>
            <IngredientsListComponent ingredients={recipe.ingredients} />
            <div className="footer-card">
                <Link to="/cook">
                    <button key={recipe.id} className="cook-button">
                        Cook
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default RecipeComponent;
