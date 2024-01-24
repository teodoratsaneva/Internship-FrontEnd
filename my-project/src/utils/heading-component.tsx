import Typography from "@mui/material/Typography";

const Heading = ({ variant, children }) => {
    return (
        <Typography variant={variant}>
            {children}
        </Typography>
    );
};

export default Heading;
