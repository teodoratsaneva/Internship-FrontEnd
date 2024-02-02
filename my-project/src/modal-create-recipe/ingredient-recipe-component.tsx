import React from "react";
import TextField from "@mui/material/TextField";
import Heading from "../commonComponents/heading-component";
import { v4 as uuidv4 } from "uuid";
import { TextButtonProps } from "../interfaces/text-button-props";
import Autocomplete from "@mui/material/Autocomplete";
import sampleIngredients from "../utils/list-ingredinets";
import AddIngredient from "../commonComponents/add-ingredient";

const styleAutocomplete = {
	width: "300px",
	".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
		color: "white",
	},
	".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
		borderColor: "white",
	},
	".css-i4bv87-MuiSvgIcon-root": {
		color: "white",
	},
};

const styleTextFeldQuantity = {
	".MuiInputBase-input": {
		color: "white",
		width: "60px",
		height: "25px",
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

const IngredientRecipeComponent: React.FC<TextButtonProps> = ({
	onChangeName,
	onChangeQuantity,
	onAddIngredient,
	parentId,
	children,
}) => {
	const autocompleteId = React.useRef(uuidv4());

	const renderInput = (params) => (
		<TextField
			{...params}
			label="Ingredients"
			onChange={({ target }) => onChangeName(target.value)}
		/>
	);

	return (
		<div style={{ marginLeft: parentId ? "20px" : "0" }}>
			<div className="text-and-button-container">
				<Heading variant="h5">Name</Heading>
				<Autocomplete
					disablePortal
					id={autocompleteId.current}
					className="combo-box-demo"
					options={sampleIngredients}
					sx={styleAutocomplete}
					getOptionLabel={(option) => option.label}
					renderInput={renderInput}
					onChange={(_, selectedOption) =>
						onChangeName(selectedOption!.label)
					}
				/>
				<TextField
					type="number"
					sx={styleTextFeldQuantity}
					label="Quantity"
					onChange={(e) =>
						onChangeQuantity && onChangeQuantity(e.target.value)
					}
				/>
				{!parentId && (
					<AddIngredient onAddIngredient={() => onAddIngredient()} />
				)}
			</div>
			{children}
		</div>
	);
};

export default IngredientRecipeComponent;
