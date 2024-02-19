import { Link as MuiLink, Modal } from "@mui/material";
import {Box} from "@mui/material";
import Heading from "../common-components/heading-component";
import '../styles/main-pages-styles.less';
import { Link } from "react-router-dom";

const styleButton = {
	border:"none",
	bgcolor: "#242633",
	color: "white",
	textAlign: "center",
	textDecoration:"double",
	p:"25px",
	marginBottom: "5px",
	fontSize: "30px"
}

const styleModal = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	overflow: "auto",
	bgcolor: "#242633",
	p: "20px",
	borderRadius: "10px",
};

const CompleteRecipeModal = ({open, close, text, link, buttonText, handleCompleteRecipe}) => {
    return (
		<Modal className="modal" open={open} onClose={close}>
			<Box sx={styleModal}>
				<Heading variant={"h4"} children={text} />
				<MuiLink
					sx={styleButton}
					className="MuiLink-button home-page-button"
					to={link}
					component={Link}
					onClick={handleCompleteRecipe}
				>
					{buttonText}
				</MuiLink>
			</Box>
		</Modal>
	);
};

export default CompleteRecipeModal;