import ReactDOM from 'react-dom/client'
import HomePage from './home.tsx'
import './index.less'
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import CookbookPage from './cookbook-page.tsx'
import TriedAndTestedRecipes from './tried-and-tested-recipes-page.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <Routes>
      <Route path="/cookbook" element={<CookbookPage />} />
      <Route path="/tried-and-tested-page" element={<TriedAndTestedRecipes/>} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  </BrowserRouter>,
)
