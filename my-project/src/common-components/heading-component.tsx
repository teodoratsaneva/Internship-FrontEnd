import Typography from "@mui/material/Typography";
import { HeadingProps } from "../interfaces/heading-interface";

const Heading: React.FC<HeadingProps> = ({ variant, children }) => {
    return (
        <Typography variant={variant}>
            {children}
        </Typography>
    );
};

export default Heading;
