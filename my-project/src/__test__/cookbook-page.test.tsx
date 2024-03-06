import { fireEvent, render, screen } from "@testing-library/react";
import CookbookPage from "../pages/cookbook-page";
import { BrowserRouter } from "react-router-dom";
import { mockLocalStorage } from "./test-utils/mockLocalStorage";
import React from "react";

describe("CookbookPage", () => {
	mockLocalStorage();

	it("renders correctly Cookbook page", () => {
		const tree = render(
			<BrowserRouter>
				<CookbookPage />
			</BrowserRouter>
		);

		expect(tree).toMatchSnapshot();
	});

	it("should render a list of recipe component from local storage", () => {
		const recipes = [
			{ id: "1", title: "Recipe 1", ingredients: [] },
			{ id: "2", title: "Recipe 2", ingredients: [] },
			{ id: "3", title: "Recipe 3", ingredients: [] },
		];

		render(
			<BrowserRouter>
				<CookbookPage />
			</BrowserRouter>
		);

		const recipesContainers = document.querySelectorAll('[data-testid^="recipe-container"]');
		expect(recipesContainers).toHaveLength(recipes.length);
	});

	it("should remove a recipe from the list", () => {
		const recipes = [
			{ id: "1", title: "Recipe 1", ingredients: [] },
			{ id: "2", title: "Recipe 2", ingredients: [] },
			{ id: "3", title: "Recipe 3", ingredients: [] },
		];

		const { getByTestId } = render(
			<BrowserRouter>
				<CookbookPage />
			</BrowserRouter>
		);

		const recipeToRemove = recipes[0];
		const removeButton = getByTestId(`remove-button-${recipeToRemove.id}`);
		fireEvent.click(removeButton);

		const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeToRemove.id);

		const updatedRecipesContainers = document.querySelectorAll('[data-testid^="recipe-container"]');
		expect(updatedRecipesContainers).toHaveLength(updatedRecipes.length);
	});

    it('should open modal when edit button have been called', () => {
        const setStateMock = jest.fn();
		const useStateMock: any = (useState: any) => [useState, setStateMock];
		jest.spyOn(React, "useState").mockImplementation(useStateMock);
        
        const recipes = [
          { id: '1', title: 'Recipe 1', ingredients: [] },
          { id: '2', title: 'Recipe 2', ingredients: [] },
          { id: '3', title: 'Recipe 3', ingredients: [] },
        ];
  
        const { getByTestId } = render(
          <BrowserRouter>
            <CookbookPage />
          </BrowserRouter>
        );
  
        const recipeToEdit = recipes[0];
        const editButton = getByTestId(`edit-button-${recipeToEdit.id}`);
        fireEvent.click(editButton);
  
        expect(setStateMock).toHaveBeenCalled();
    });

    it('should open and close modal for edit recipe when edit buttn is clicked', () => {
        //const setStateMock = jest.fn();
		// const useStateMock: any =jest
        // .fn()
        // .mockImplementationOnce(x => [x, setStateMock])
		// jest.spyOn(React, "useState").mockImplementation(useStateMock);


        const recipes = [
            { id: '1', title: 'Recipe 1', ingredients: [] },
            { id: '2', title: 'Recipe 2', ingredients: [] },
            { id: '3', title: 'Recipe 3', ingredients: [] },
        ];
    
        localStorage.setItem("items", JSON.stringify(recipes));
    
        render(
            <BrowserRouter>
                <CookbookPage />
            </BrowserRouter>
        );
    
        recipes.forEach((recipe) => {
            //const recipeContainer = getByTestId(`recipe-container-${recipe.id}`);
            const openButton = screen.getByTestId(`edit-button-${recipe.id}`);
        
            fireEvent.click(openButton);

        
            //expect(setStateMock).toHaveBeenCalled();

            // act(() => {
            //   fireEvent.click(document);
            // });
        
            // expect(recipeContainer.classList.contains('open')).toBe(false);

          });
          
          expect(screen.getByTestId("header-form")).toBeInTheDocument();
    });
    
});
