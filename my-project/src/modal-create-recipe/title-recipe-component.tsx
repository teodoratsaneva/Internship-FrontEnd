import React from "react";
import TextField from "@mui/material/TextField";
import Heading from "../common-components/heading-component";
import { TextButtonProps } from "../interfaces/text-button-interface";
import AddIngredient from "../common-components/add-ingredient";

const styleTextFeld = {
	".MuiInputBase-input": {
		color: "white",
		width: "450px",
		height: "10px",
	},
	".MuiFormLabel-root": {
		color: "white",
	},
	".MuiFormControl-root": {
		borderColor: "white",
	},
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			borderColor: "white",
			color: "white",
		},
		"&:hover fieldset": {
			borderColor: "white",
		},
		"&.Mui-focused fieldset": {
			borderColor: "white",
		},
	},
};

const TitleRecipeComponent: React.FC<TextButtonProps> = ({
	value,
	onChangeName,
	onAddIngredient,
	children,
}) => {
	return (
		<div>
			<div className="text-and-button-container">
				<Heading variant="h5">Title</Heading>
				<TextField
					sx={styleTextFeld}
					value={value}
					onChange={(e) => onChangeName(e.target.value)}
				/>
				<AddIngredient onAddIngredient={onAddIngredient} descriptionButton="Add Ingredient"/>
			</div>
			{children}
		</div>
	);
};

export default TitleRecipeComponent;