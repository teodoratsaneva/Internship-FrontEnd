import "@testing-library/jest-dom";
import HomePage from "../pages/home-page";
import { screen, fireEvent, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import React from "react";

describe("HomePage", () => {
	it("renders correctly main page", () => {
		const tree = render(
			<BrowserRouter>
				<HomePage />
			</BrowserRouter>
		);
		expect(tree).toMatchSnapshot();
	});

	it("render correct title text", () => {
		render(
			<BrowserRouter>
				<HomePage />
			</BrowserRouter>
		);
		expect(
			screen.getByText(
				"Welcome to Ilvermorny School of Cookcraft & Gourmet Sorcery"
			)
		).toBeInTheDocument();
	});

	it('should render HeaderComponent and div with class "home-page-container"', () => {
		render(
			<BrowserRouter>
				<HomePage />
			</BrowserRouter>
		);
		expect(
			screen.getByRole("heading", {
				name: /Welcome to Ilvermorny School of Cookcraft & Gourmet Sorcery/i,
			})
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /Create a potion recipe/i })
		).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: /Go to Cookbook/i })
		).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: /View Tried & Tested recipes/i })
		).toBeInTheDocument();
	});

	it('redirects to "Cookbook" page', () => {
		render(
			<BrowserRouter>
				<HomePage />
			</BrowserRouter>
		);
		const cookbookLink = screen.getByText("Go to Cookbook");
		fireEvent.click(cookbookLink);
		expect(window.location.pathname).toBe("/cookbook");
	});

	it('redirects to "Tried & Tested recipes" page', () => {
		render(
			<BrowserRouter>
				<HomePage />
			</BrowserRouter>
		);
		const triedAndTestedLink = screen.getByText(
			"View Tried & Tested recipes"
		);
		fireEvent.click(triedAndTestedLink);
		expect(window.location.pathname).toBe("/tried-and-tested");
	});

	it("should render ModalFormComponent when open state is true", () => {
		const setStateMock = jest.fn();
		const useStateMock: any = (useState: any) => [useState, setStateMock];
		jest.spyOn(React, "useState").mockImplementation(useStateMock);

		render(
			<BrowserRouter>
				<HomePage />
			</BrowserRouter>
		);
		const button = screen.getByText("Create a potion recipe");
		fireEvent.click(button);
		expect(setStateMock).toHaveBeenCalled();
	});

  it('should close the modal when clicking close button or outside the modal', () => {
    const setStateMock = jest.fn();
		const useStateMock: any = (useState: any) => [useState, setStateMock];
		jest.spyOn(React, "useState").mockImplementation(useStateMock);

    render(<BrowserRouter>
      <HomePage />
      </BrowserRouter>);

    fireEvent.click(screen.getByRole('button', { name: /Create a potion recipe/i }));
    expect(setStateMock).toHaveBeenCalled();

    fireEvent.click(document);
    expect(setStateMock).toHaveBeenCalledTimes(2);
  });
});
