import { Recipe } from "../../interfaces/recipe-interface";

export const mockLocalStorage = (itemsToReturn: Recipe[]) => {
  const setItemMock = jest.fn();
  const getItemMock = () => JSON.stringify(itemsToReturn);
  
  beforeEach(() => {
    Storage.prototype.setItem = setItemMock;
    Storage.prototype.getItem = getItemMock;
  });
  
  afterEach(() => {
    setItemMock.mockRestore();
  });
  
  return { setItemMock, getItemMock };
};
