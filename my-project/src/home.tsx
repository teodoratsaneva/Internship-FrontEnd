import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <div className="header">
        <Link to="/">
        <img className="darkLogo" src="darkLogo.JPG" alt="darkLogo" />
        </Link>
      </div>
      <div className="home-page-container">
          <h1>Welcome to Ilvermorny School of Cookcraft & Gourmet Sorcery</h1>
        <Link to="/cookbook">
          <input type="button" value="Go to Cookbook" />
        </Link>
        <Link to="/tried-and-tested-page">
          <input type="button" value="View Tried & Tested recipes" />
        </Link>
      </div>
    </>
  );
};

export default HomePage;
