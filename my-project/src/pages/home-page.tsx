import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderComponent from "../commonComponents/header-page-component";
import Button from "@mui/material/Button";
import Heading from "../commonComponents/heading-component";
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
					Create a potion recipe
				</Button>
				<ModalFormComponent open={open} close={handleClose} />
				<Link
					className="MuiLink-button home-page-button"
					to="/cookbook"
				>
					Go to Cookbook
				</Link>
				<Link
					className="MuiLink-button home-page-button"
					to="/tried-and-tested"
				>
					View Tried & Tested recipes
				</Link>
			</div>
		</>
	);
};

export default HomePage;
