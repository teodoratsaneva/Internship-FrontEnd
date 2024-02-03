import Heading from "./heading-component";

const AddIngredient = ({onAddIngredient}) => {
	return (
		<>
			<button className="plus-icon-button" onClick={onAddIngredient}>
				<img id="add-icon" src="image 4.png" alt="plusIcon" />
			</button>
			<Heading variant="h5">Add sub Ingredient</Heading>
		</>
	);
};

export default AddIngredient;