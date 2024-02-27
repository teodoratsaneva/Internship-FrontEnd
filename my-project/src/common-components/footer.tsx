import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Footer } from '../interfaces/footer-interface';

const FooterComponent: React.FC<Footer> = ({buttons}) => {
  return (
    <div className="footer">
      {buttons.map((button, index: number) => (
        <Button
          key={index}
          className={button.className}
          variant={button.linkTo ? "contained" : "text"}
          component={button.linkTo ? Link : 'button'}
          to={button.linkTo}
          onClick={button.onClick}
        >
          {button.buttonText}
        </Button>
      ))}
    </div>
  );
};

export default FooterComponent;
