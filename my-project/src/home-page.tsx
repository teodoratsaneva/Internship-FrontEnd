import { Link } from "react-router-dom";
import HeaderComponent from "./header-page-component";

const HomePage = () => {
  return (
    <>
      <HeaderComponent />
      <div className="home-page-container">
        <h1>Welcome to Ilvermorny School of Cookcraft & Gourmet Sorcery</h1>
        <Link to="/cookbook">
          <input type="button" value="Go to Cookbook" />
        </Link>
        <Link to="/tried-and-tested">
          <input type="button" value="View Tried & Tested recipes" />
        </Link>
      </div>
    </>
  );
};

export default HomePage;
