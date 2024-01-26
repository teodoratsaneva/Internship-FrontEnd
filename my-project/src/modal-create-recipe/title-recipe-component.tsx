import React from "react";
import TextField from "@mui/material/TextField";
import Heading from "../utils/heading-component";
import { v4 as uuidv4 } from "uuid";
import { TextButtonProps } from "../interfaces/text-button-props";

const styleTextFeld = {
  ".MuiInputBase-input": {
    color: "white",
    width: "450px",
    height: "10px"
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
  onChange,
  onAddIngredient,
  parentId,
  children,
}) => {
  return (
    <div style={{ marginLeft: parentId ? "20px" : "0" }}>
      <div className="text-and-button-container">
        <Heading variant="h5">Title</Heading>
        <TextField
          sx={styleTextFeld}
          id={uuidv4()}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        { !parentId && (
          <>
            <button className="plus-icon-button" onClick={onAddIngredient}>
              <img id="add-icon" src="image 4.png" alt="plusIcon" />
            </button>
            <Heading variant="h5">Add Ingredient</Heading>
          </>
        )}
      </div>
      {children}
    </div>
  );
};

export default TitleRecipeComponent;
