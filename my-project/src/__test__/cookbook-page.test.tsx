import "@testing-library/jest-dom";
import { render } from '@testing-library/react';
import CookbookPage from '../pages/cookbook-page';
import { BrowserRouter } from "react-router-dom";

test('Renders correctly cookbook page', () => {
    const tree = render(
        <BrowserRouter>
        <CookbookPage />
        </BrowserRouter>);
    expect(tree).toMatchSnapshot();
});

test('Renders correct title', () => {
    const { getByText } = render(
        <BrowserRouter>
        <CookbookPage />
        </BrowserRouter>);
    const titleElement = getByText(/Welcome to the Cookbook/i);
    expect(titleElement).toBeInTheDocument();
  });
