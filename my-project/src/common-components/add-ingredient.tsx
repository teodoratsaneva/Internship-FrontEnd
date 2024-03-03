import Heading from "./heading-component";
import { AddIngredientProps } from "../interfaces/add-ingredient-interface";

const AddIngredient: React.FC<AddIngredientProps> = ({ onAddIngredient, descriptionButton }) => {
	return (
		<>
			<button className="plus-icon-button" onClick={onAddIngredient}>
				<img id="add-icon" src="image 4.png" alt="plusIcon" />
			</button>
			<Heading variant="h5">{descriptionButton}</Heading>
		</>
	);
};

export default AddIngredient;