import React from 'react';
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';
import { Footer } from '../interfaces/footer-interface';

const FooterComponent:React.FC<Footer> = ({ className, buttonText, onClick, linkTo }) => {
  return (
    <div className="footer">
      <Button
        className={className}
        variant={linkTo ? "contained" : "text"}
        component={linkTo ? Link : 'button'}
        to={linkTo}
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default FooterComponent;