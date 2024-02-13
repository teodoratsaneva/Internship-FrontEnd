import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import HeaderComponent from "../common-components/header-page-component";
import Button from "@mui/material/Button";
import Heading from "../common-components/heading-component";
import ModalFormComponent from "../modal-create-recipe/modal-component";

const HomePage = () => {
	const [open, setOpen] = useState(false);

	const handleOpen = useCallback(() => {setOpen(true)}, []);
	const handleClose = useCallback(() => {setOpen(false)}, []);

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
				<ModalFormComponent open={open} close={handleClose} hasForm={true}/>
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