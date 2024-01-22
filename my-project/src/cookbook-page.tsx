import { Link } from 'react-router-dom';

const CookbookPage = () => {
    return (
        <>
        <div className="header">
        <Link to="/">
        <img className="darkLogo" src="darkLogo.JPG" alt="darkLogo" />
        </Link>
        </div>
        <div className="cookbook-pade-container">
            <h1 className="cookbook-page-title">Welcome to the Cookbook. Here is a list of your cooking spells</h1>
        </div>
        </>
    )
}

export default CookbookPage;