export const mockLocalStorage = () => {
    const setItemMock = jest.fn();
    const getItemMock = () => (JSON.stringify([
      { id: '1', title: 'Recipe 1', ingredients: [] },
      { id: '2', title: 'Recipe 2', ingredients: [] },
      { id: '3', title: 'Recipe 3', ingredients: [] },
    ]));
  
    beforeEach(() => {
      Storage.prototype.setItem = setItemMock;
      Storage.prototype.getItem = getItemMock;
    });
  
    afterEach(() => {
      setItemMock.mockRestore();
    });
  
    return { setItemMock, getItemMock };
  };