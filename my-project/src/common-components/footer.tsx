import Button from '@mui/material/Button';
import { Footer } from '../interfaces/footer-interface';
import React from 'react';

const FooterComponent: React.FC<Footer> = ({buttons, isFormEmpty}) => {
  return (
    <div className="footer">
      {!isFormEmpty && buttons.map((button, index: number) => (
        <Button
          key={index}
          className={button.className}
          data-testid={button.datatestid}
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

export default React.memo(FooterComponent);
