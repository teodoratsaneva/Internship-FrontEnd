import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import HomePage from "../pages/home-page";
import { BrowserRouter } from "react-router-dom";

test("Renders correctly main pahe", () => {
    const tree = render(<BrowserRouter>
        <HomePage />
    </BrowserRouter>);
    expect(tree).toMatchSnapshot();
});