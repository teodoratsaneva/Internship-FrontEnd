import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CookPage from "../pages/cook-page";
import { BrowserRouter } from "react-router-dom";
import { mockLocalStorage } from "./test-utils/mockLocalStorage";

describe("<CookPage/>", () => {
	const { setItemMock } = mockLocalStorage([
		{ id: "1", title: "Recipe 1", ingredients: [] },
		{ id: "2", title: "Recipe 2", ingredients: [] },
		{ id: "3", title: "Recipe 3", ingredients: [] },
	]);

	it("should display the active recipe in the CookArena component", () => {
		const activeRecipe = {
			id: "1",
			title: "Recipe 1",
			ingredients: [
				{ id: "1", name: "Ingredient 1", amount: 2 },
				{ id: "2", name: "Ingredient 2", amount: 3 },
			],
		};
        
		//localStorage.setItem("activeRecipe", JSON.stringify(activeRecipe));
        setItemMock("activeRecipe", JSON.stringify(activeRecipe));

		render(
			<BrowserRouter>
				<CookPage />
			</BrowserRouter>
		);

		expect(setItemMock).toHaveBeenCalledWith(
			"activeRecipe",
			JSON.stringify({ id: "1", title: "Recipe 1", ingredients: [] })
		);

		expect(screen.getByText("Recipe 1")).toBeInTheDocument();
		expect(screen.getByText("Ingredient 1")).toBeInTheDocument();
		expect(screen.getByText("Ingredient 2")).toBeInTheDocument();
	});
});
