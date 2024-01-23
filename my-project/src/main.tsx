import ReactDOM from 'react-dom/client'
import HomePage from './home-page.tsx'
import './index.less'
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import CookbookPage from './cookbook-page.tsx'
import TriedAndTestedRecipes from './tried-and-tested-recipes-page.tsx';
import CookPage from './cook-page.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <Routes>
      <Route path="/cookbook" element={<CookbookPage />} />
      <Route path="/tried-and-tested" element={<TriedAndTestedRecipes/>} />
      <Route path="/cook" element={<CookPage/>} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  </BrowserRouter>,
)
