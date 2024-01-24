import { Link } from "react-router-dom";

const HeaderComponent = () => {
    return (
        <>
            <header>
                <Link to="/">
                    <img
                        className="darkLogo"
                        src="darkLogo.JPG"
                        alt="darkLogo"
                    />
                </Link>
            </header>
        </>
    );
};

export default HeaderComponent;
