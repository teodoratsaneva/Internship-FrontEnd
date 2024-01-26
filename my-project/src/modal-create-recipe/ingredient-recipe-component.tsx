import React, { ReactNode } from "react";
import TextField from "@mui/material/TextField";
import Heading from "../utils/heading-component";
import { v4 as uuidv4 } from "uuid";
import { TextButtonProps } from "../interfaces/text-button-props";
import Autocomplete from "@mui/material/Autocomplete";

const styleAutocomplete = {
    width: "300px",
    ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
        color: "white"
    },
    ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
    },
    ".css-i4bv87-MuiSvgIcon-root": {
        color: "white"
    }
};

const sampleIngredients = [
    { label: "Butter"},
    { label: "Eggs"},
    { label: "Yogurt"},
    { label: "Oil"},
    { label: "Sheets filo pastry"},
    { label: "Sirene"}
];

const IngredientRecipeComponent: React.FC<TextButtonProps> = ({
    onChange,
    onAddIngredient,
    parentId,
    children,
}) => {
    const initialLabel = sampleIngredients.find((ingredient) => ingredient.label === onChange);

    return (
        <div style={{ marginLeft: parentId ? "20px" : "0" }}>
            <div className="text-and-button-container">
                <Heading variant="h5">Name</Heading>
                <Autocomplete
                    disablePortal
                    id={uuidv4()}
                    className="combo-box-demo"
                    options={sampleIngredients}
                    sx={styleAutocomplete}
                    value={initialLabel || null}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                        <TextField {...params} label="Ingredients" onChange={({target}) => onChange(target.value)}/>
                    )}
                />
                {!parentId && (
                    <>
                        <button
                            className="plus-icon-button"
                            onClick={onAddIngredient}
                        >
                            <img
                                id="add-icon"
                                src="image 4.png"
                                alt="plusIcon"
                            />
                        </button>
                        <Heading variant="h5">Add sub Ingredient</Heading>
                    </>
                )}
            </div>
            {children}
        </div>
    );
};

export default IngredientRecipeComponent;
