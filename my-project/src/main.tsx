import ReactDOM from "react-dom/client";
import HomePage from "./pages/home-page.tsx";
import "./styles/scrollbar-style.less"
import "./styles/recipe-container-styles.less"
import "./styles/modal-create-styles.less"
import './styles/main-pages-styles.less'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CookbookPage from "./pages/cookbook-page.tsx";
import TriedAndTestedRecipes from "./pages/tried-and-tested-recipes-page.tsx";
import CookPage from "./pages/cook-page.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/cookbook" element={<CookbookPage />} />
            <Route
                path="/tried-and-tested"
                element={<TriedAndTestedRecipes />}
            />
            <Route path="/cook" element={<CookPage />} />
            <Route path="/" element={<HomePage />} />
        </Routes>
    </BrowserRouter>
);
