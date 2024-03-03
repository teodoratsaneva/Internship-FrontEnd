import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import HomePage from "../pages/home-page";
import { BrowserRouter } from "react-router-dom";

test("renders correctly main page", () => {
    const tree = render(
        <BrowserRouter>
        <HomePage />
        </BrowserRouter>);
    expect(tree).toMatchSnapshot();
});

test('renders correct title text', () => {
    const { getByText } = render(
        <BrowserRouter>
        <HomePage />
        </BrowserRouter>);
    const titleElement = getByText(/Welcome to Ilvermorny School of Cookcraft & Gourmet Sorcery/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("render correct all buttons", () => {
    const { getByText } = render(
        <BrowserRouter>
        <HomePage />
        </BrowserRouter>);
    expect(getByText('Create a potion recipe')).toBeInTheDocument();
    expect(getByText('Go to Cookbook')).toBeInTheDocument();
    expect(getByText('View Tried & Tested recipes')).toBeInTheDocument();
});

  test('redirects to "Cookbook" page', () => {
    render(
        <BrowserRouter>
        <HomePage />
        </BrowserRouter>
    );
    const cookbookLink = screen.getByText('Go to Cookbook');
    fireEvent.click(cookbookLink);
    expect(window.location.pathname).toBe('/cookbook');
  });
  
  test('redirects to "Tried & Tested recipes" page', () => {
    render(
        <BrowserRouter>
        <HomePage />
        </BrowserRouter>
    );
    const triedAndTestedLink = screen.getByText('View Tried & Tested recipes');
    fireEvent.click(triedAndTestedLink);
    expect(window.location.pathname).toBe('/tried-and-tested');
  });

test('call function handleOpen when "Create a potion recipe" is clicked', () => {
    const handleOpen = jest.fn();

    const { getByText } = render(
        <BrowserRouter>
        <HomePage />
        </BrowserRouter>);

    fireEvent.click(getByText('Create a potion recipe'));
    expect(handleOpen).toHaveBeenCalledTimes(1);
  });