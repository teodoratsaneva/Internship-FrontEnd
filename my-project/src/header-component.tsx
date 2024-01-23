import { Link } from "react-router-dom";

const HeaderComponent = () => {
    return (
        <>
        <div className="header">
        <Link to="/">
          <img className="darkLogo" src="darkLogo.JPG" alt="darkLogo" />
        </Link>
      </div>
        </>
    )
}

export default HeaderComponent;