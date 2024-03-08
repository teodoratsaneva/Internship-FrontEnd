import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import CookbookPage from "../pages/cookbook-page";
import { BrowserRouter } from "react-router-dom";
import { mockLocalStorage } from "./test-utils/mockLocalStorage";
import useRecipe from "../utils/useRecipe";

jest.mock("./useRecipe");

describe("CookbookPage", () => {
  const { setItemMock } = mockLocalStorage([
    { id: "1", title: "Recipe 1", ingredients: [] },
    { id: "2", title: "Recipe 2", ingredients: [] },
    { id: "3", title: "Recipe 3", ingredients: [] },
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

    const recipesContainers = document.querySelectorAll(
      '[data-testid^="recipe-container"]'
    );
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

    const updatedRecipes = recipes.filter(
      (recipe) => recipe.id !== recipeToRemove.id
    );

    const updatedRecipesContainers = document.querySelectorAll(
      '[data-testid^="recipe-container"]'
    );
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
      "activeRecipe",
      JSON.stringify({ id: "1", title: "Recipe 1", ingredients: [] })
    );
    expect(window.location.pathname).toBe("/cook");
  });

  it("should called handleOpen correct with recipe when edit button is clicked", () => {
    const mockRecipe = {
      id: "1",
      title: "Test Recipe",
      ingredients: []
    };

    const mockUseRecipe = useRecipe as jest.MockedFunction<typeof useRecipe>;
    mockUseRecipe.mockReturnValue({
      recipes: [mockRecipe],
      removeRecipe: jest.fn(),
      saveEditedRecipe: jest.fn(),
      saveRecipes: jest.fn(),
    });

    const { getByTestId } = render(<CookbookPage />);

    const editButton = getByTestId(`edit-button-${mockRecipe.id}`);
    fireEvent.click(editButton);

    expect(mockUseRecipe).toHaveBeenCalled();
  })
});
