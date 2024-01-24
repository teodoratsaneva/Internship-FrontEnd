import Brightness1Icon from "@mui/icons-material/Brightness1";
import Brightness2Icon from "@mui/icons-material/Brightness2";

const IconConponent = ({ type }) => {
    switch (type) {
        case "brightness1":
            return <Brightness1Icon className="Brightness1Icon" />;
        case "brightness2":
            return <Brightness2Icon className="Brightness2Icon" />;
        default:
            return null;
    }
  };

  export default IconConponent;