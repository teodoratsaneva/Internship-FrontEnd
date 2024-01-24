import { Link } from "react-router-dom";
import HeaderComponent from "../utils/header-page-component";
import Button from "@mui/material/Button";
import Heading from "../utils/heading-component";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from "react";

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
  };

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
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						
					</Box>
				</Modal>
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
