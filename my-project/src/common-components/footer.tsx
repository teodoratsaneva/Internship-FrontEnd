import Button from '@mui/material/Button';
import { Footer } from '../interfaces/footer-interface';

const FooterComponent: React.FC<Footer> = ({buttons}) => {
  return (
    <div className="footer">
      {buttons.map((button, index: number) => (
        <Button
          key={index}
          className={button.className}
          variant={button.variant}
          component={button.component}
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
