import React from 'react';
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';
import { Footer } from '../interfaces/footer-interface';

const FooterComponent: React.FC<Footer> = ({
  className,
  buttonText,
  onClickButtonSaveAndExit,
  onClickButtonSavaAndReset,
  linkTo,
  buttonText2,
}) => {
  return (
    <div className="footer">
      <Button
        className={className}
        variant={linkTo ? "contained" : "text"}
        component={linkTo ? Link : 'button'}
        to={linkTo}
        onClick={onClickButtonSaveAndExit}
      >
        {buttonText}
      </Button>

      {onClickButtonSavaAndReset && (
        <Button
          className={className}
          variant={linkTo ? "contained" : "text"}
          component={linkTo ? Link : 'button'}
          to={linkTo}
          onClick={onClickButtonSavaAndReset}
        >
          {buttonText2}
        </Button>
      )}
    </div>
  );
};

export default FooterComponent;
