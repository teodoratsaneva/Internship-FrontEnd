import { Recipe } from "./recipe-form";

const recipes: Recipe[] = [
  {
    id: "1",
    title: "Spicy Lentils",
    ingredientList: [
        { id: "1", text: "1/4 olive oil"},
        { id: "2", text: "1 white onion"},
        { id: "3", text: "2 carrots, peeled and chopped"},
        { id: "4", text: "4 garlic cloves"},
        { id: "5", text: "1 teaspoon curry powder"},
        { id: "6", text: "1 cup brown or green lentils"},
        { id: "7", text: "pinch of red pepper flakes"},
        { id: "8", text: "1 tablespoon salt"}
    ]
  },
  {
    id: "2",
    title: "Mish-Mash",
    ingredientList: [
        { id: "9", text: "2 tablespoon oil", subIngredients: [
            {id: "1", text: "vegetable oil"}
        ]},
        { id: "10", text: "2 red bell peppers"},
        { id: "11", text: "2 green bell peppers"},
        { id: "12", text: "3 tomatoes"},
        { id: "13", text: "1 onion"},
        { id: "14", text: "2 cloves garlic"},
        { id: "15", text: "11b sirene feta"},
        { id: "16", text: "salt, pepper"},
        { id: "17", text: "2 tablespoons chopped parsley"}
    ]
  },
  {
    id: "3",
    title: "Spaghetti Bolognese",
    ingredientList: [
      { id: "18", text: "4 rashers smoked streaky bacon, finely chopped" },
      { id: "19", text: "2 medium onions, finely chopped" },
      { id: "20", text: "2 carrots, trimmed and finely chopped" },
      { id: "21", text: "2 x 400g tins plum tomatoes" },
      { id: "22", text: "2 garlic cloves finely chopped" },
      {
        id: "23",
        text: "1 tbsp oil",
        subIngredients: [{ id: "23-1", text: "olive oil" }],
      },
      { id: "24", text: "2-3 sprigs rosemary leaves picked and finely chopped"},
      { id: "25", text: "500g beef mince"},
      { id: "26", text: "75g parmesan grated"},
      { id: "27", text: "400g spaghetti"}
    ],
  },
  {
    id: "4",
    title: "Musaka",
    ingredientList: [
      { id: "28", text: "1 onion, finely chopped"},
      { id: "29", text: "2 fat garlic cloves"},
      { id: "30", text: "1 large egg plus 1 yolk, lightly beaten"},
      { id: "31", text: "400g can chopped tomatoes"},
      { id: "32", text: "800g lamb mince"},
      { id: "33", text: "550g Maris Piper potatoes, peeled and sliced into 5mm rounds"},
      {
        id: "34",
        text: "1 tbsp oil",
        subIngredients: [{ id: "23-1", text: "olive oil" }],
      },
      { id: "35", text: "3 medium aubergines, cut into 5mm rounds"}
    ]
  }
];

export default recipes;
