import React, { MouseEventHandler } from "react";
import TextField from "@mui/material/TextField";
import Heading from "../common-components/heading-component";
import { v4 as uuidv4 } from "uuid";
import { TextButtonProps } from "../interfaces/text-button-interface";
import Autocomplete from "@mui/material/Autocomplete";
import sampleIngredients from "../utils/list-ingredinets";
import AddIngredient from "../common-components/add-ingredient";

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

const styleTextFeldAmount = {
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
	defaultValueTitle,
	defaultValueAmount,
	onChangeName,
	onChangeAmount,
	onAddIngredient,
	onRemoveIngredient,
	parentId,
	children,
}) => {
	const autocompleteId = React.useRef(uuidv4());

	const renderInput = (params: any) => (
		<TextField
			{...params}
			label="Ingredients"
			onChange={({ target }) => onChangeName(target.value)}
		/>
	);

	const handleRemoveIngredient: MouseEventHandler<HTMLButtonElement> = (
		event: any
	) => {
		if (onRemoveIngredient) {
			onRemoveIngredient(event);
		}
	};

	return (
		<div className={` ${parentId ? "margin-left-20" : ""}`}>
			<div className="text-and-button-container">
				<button
					className="remove-icon-button"
					onClick={handleRemoveIngredient}
				>
					<img id="remove-icon" src="x-button.png" alt="removeIcon" />
				</button>
				<Heading variant="h5">Name</Heading>
				<Autocomplete
					ListboxProps={{
						sx: { height: 200 },
					}}
					disablePortal
					id={autocompleteId.current}
					className="combo-box-demo"
					options={sampleIngredients}
					value={sampleIngredients.find(option => option.label === defaultValueTitle)}
					sx={styleAutocomplete}
					getOptionLabel={(option) => option.label}
					renderInput={renderInput}
					onChange={(_, selectedOption) =>
						onChangeName(selectedOption!.label)
					}
				/>
				<TextField
					type="number"
					sx={styleTextFeldAmount}
					label="Amount"
					defaultValue={defaultValueAmount}
					inputProps={{ min: 1, max: 10 }}
					onChange={(e) =>
						onChangeAmount && onChangeAmount(Math.round(parseFloat(e.target.value)).toString())
					}
				/>
				{!parentId && (
					<AddIngredient
						onAddIngredient={() => onAddIngredient()}
						descriptionButton="Add Sub Ingredient"
					/>
				)}
			</div>
			{children}
		</div>
	);
};

export default IngredientRecipeComponent;
