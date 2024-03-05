import { render } from "@testing-library/react";
import CookbookPage from "../pages/cookbook-page";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import HeaderComponent from "../common-components/header-page-component";
import RecipeComponent from "../recipe-card/recipe-form";
import { shallow } from "enzyme";

describe ('CookbookPage', () => {
    it('renders correctly Cookbook page', () => {
        const tree = render(
			<BrowserRouter>
				<CookbookPage />
			</BrowserRouter>
		);

        expect(tree).toMatchSnapshot();
    });

    it('should handle the case where there are no recipes in local storage', () => {
        localStorage.removeItem('items');
        const { queryAllByTestId } = render(
            <BrowserRouter>
                <CookbookPage />
            </BrowserRouter>
        );
    
        const recipesContainers = queryAllByTestId('recipes-container');
        expect(recipesContainers).toHaveLength(0);
    });

    it('should render a list of recipe components', () => {
        const setStateMock = jest.fn();
		const useStateMock: any = (useState: any) => [useState, setStateMock];
		jest.spyOn(React, "useState").mockImplementation(useStateMock);

        const recipes = [
          { id: '1', title: 'Recipe 1', ingredients: [] },
          { id: '2', title: 'Recipe 2', ingredients: [] },
          { id: '3', title: 'Recipe 3', ingredients: [] },
        ];
    
        const localStorageMock = {
          getItem: jest.fn(),
          setItem: jest.fn(),
          removeItem: jest.fn(),
        };
        global.localStorage = localStorageMock as any;
    
        localStorageMock.setItem.mockReturnValue(JSON.stringify(recipes));
    
        const wrapper = shallow(
          <BrowserRouter>
            <CookbookPage />
          </BrowserRouter>
        );
    
        expect(wrapper.find(HeaderComponent)).toHaveLength(1);
        expect(wrapper.find(RecipeComponent)).toHaveLength(2);
      });
})