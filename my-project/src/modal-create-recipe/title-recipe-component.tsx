import React from "react";
import TextField from "@mui/material/TextField";
import Heading from "../common-components/heading-component";
import { TextButtonProps } from "../interfaces/text-button-props";
import AddIngredient from "../common-components/add-ingredient";

const TitleRecipeComponent: React.FC<TextButtonProps> = ({
	value,
	onChangeName,
	onAddIngredient,
	children,
	style
}) => {
	return (
		<div>
			<div className="text-and-button-container">
				<Heading variant="h5">Title</Heading>
				<TextField
					sx={style}
					value={value}
					onChange={(e) => onChangeName(e.target.value)}
				/>
				<AddIngredient onAddIngredient={onAddIngredient} />
			</div>
			{children}
		</div>
	);
};

export default TitleRecipeComponent;