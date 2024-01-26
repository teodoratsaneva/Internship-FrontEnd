import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderComponent from "../utils/header-page-component";
import Button from "@mui/material/Button";
import Heading from "../utils/heading-component";
import ModalFormComponent from "../modal-create-recipe/modal-form";

const HomePage = () => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<HeaderComponent />
			<div className="home-page-container">
				<Heading variant="h1">
					Welcome to Ilvermorny School of Cookcraft & Gourmet Sorcery
				</Heading>
				<Button
					className="home-page-button"
					variant="contained"
					onClick={handleOpen}
				>
					Create a cooking spell
				</Button>
				<ModalFormComponent open={open} close={handleClose} />
				<Button
					className="home-page-button"
					variant="contained"
					component={Link}
					to="/cookbook"
				>
					Go to Cookbook
				</Button>
				<Button
					className="home-page-button"
					variant="contained"
					component={Link}
					to="/tried-and-tested"
				>
					View Tried & Tested recipes
				</Button>
			</div>
		</>
	);
};

export default HomePage;
