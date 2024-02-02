import Brightness1Icon from "@mui/icons-material/Brightness1";
import Brightness2Icon from "@mui/icons-material/Brightness2";

const iconMap = {
    brightness1: <Brightness1Icon className="Brightness1Icon" />,
    brightness2: <Brightness2Icon className="Brightness2Icon" />,
}

const IconConponent = ({ type }) => {
    return iconMap[type] || null;
  };

export default IconConponent;
  