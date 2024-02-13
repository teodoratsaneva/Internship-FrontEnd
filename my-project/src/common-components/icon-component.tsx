import Brightness1Icon from "@mui/icons-material/Brightness1";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';

const iconMap = {
    brightness1: <Brightness1Icon className="Brightness1Icon" />,
    brightness2: <Brightness2Icon className="Brightness2Icon" />,
    check: <CheckCircleSharpIcon className="CheckCircleSharpIcon" />
}

const Icon = ({ type }) => {
    return iconMap[type] || null;
  };

export default Icon;