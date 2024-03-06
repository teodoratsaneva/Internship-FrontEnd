import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import CookbookPage from "../pages/cookbook-page";
import { BrowserRouter } from "react-router-dom";
import { mockLocalStorage } from "./test-utils/mockLocalStorage";
import React from "react";

describe("CookbookPage", () => {
  const { setItemMock } = mockLocalStorage([
    { id: '1', title: 'Recipe 1', ingredients: [] },
    { id: '2', title: 'Recipe 2', ingredients: [] },
    { id: '3', title: 'Recipe 3', ingredients: [] },
  ]);
  

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

    it('should save the recipe to local storage and redirect to "/cook" when "Cook" button is clicked', () => {      
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
  
      const recipeToCook = recipes[0];
      const cookButton = getByTestId(`cook-button-${recipeToCook.id}`);
      fireEvent.click(cookButton);

      expect(setItemMock).toHaveBeenCalledWith(
        'activeRecipe',
        JSON.stringify({ id: '1', title: 'Recipe 1', ingredients: [] })
      );
      expect(window.location.pathname).toBe("/cook");
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

  // // Clicking on the 'Edit Recipe' button opens a modal with the recipe form pre-filled with the recipe information.
  // it('should open a modal with pre-filled recipe form when "Edit Recipe" button is clicked', () => {
  //   // Initialize CookbookPage
  //   const wrapper = shallow(<CookbookPage />);

  //   // Mock the handleOpen function
  //   const mockHandleOpen = jest.fn();
  //   const handleOpenSpy = jest.spyOn(React, 'useState');
  //   handleOpenSpy.mockReturnValue([{}, mockHandleOpen]);

  //   // Find the 'Edit Recipe' button and simulate a click event
  //   wrapper.find('.cook-button').at(0).simulate('click');

  //   // Assert that the handleOpen function is called with the correct argument
  //   expect(mockHandleOpen).toHaveBeenCalledWith(recipe.id);
  // });
});
