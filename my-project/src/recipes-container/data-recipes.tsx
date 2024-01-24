import { Recipe } from "../interfaces/recipe-interface";

const recipes: Recipe[] = [
    {
        id: "1",
        title: "Spicy Lentils",
        ingredients: [
            { id: "1", title: "1/4 olive oil" },
            { id: "2", title: "1 white onion" },
            { id: "3", title: "2 carrots, peeled and chopped" },
            { id: "4", title: "4 garlic cloves" },
            { id: "5", title: "1 teaspoon curry powder" },
            { id: "6", title: "1 cup brown or green lentils" },
            { id: "7", title: "pinch of red pepper flakes" },
            { id: "8", title: "1 tablespoon salt" },
        ],
    },
    {
        id: "2",
        title: "Mish-Mash",
        ingredients: [
            {
                id: "9",
                title: "2 tablespoon oil",
                subIngredients: [{ id: "1", title: "vegetable oil" }],
            },
            { id: "10", title: "2 red bell peppers" },
            { id: "11", title: "2 green bell peppers" },
            { id: "12", title: "3 tomatoes" },
            { id: "13", title: "1 onion" },
            { id: "14", title: "2 cloves garlic" },
            { id: "15", title: "11b sirene feta" },
            { id: "16", title: "salt, pepper" },
            { id: "17", title: "2 tablespoons chopped parsley" },
        ],
    },
    {
        id: "3",
        title: "Spaghetti Bolognese",
        ingredients: [
            {
                id: "18",
                title: "4 rashers smoked streaky bacon, finely chopped",
            },
            { id: "19", title: "2 medium onions, finely chopped" },
            { id: "20", title: "2 carrots, trimmed and finely chopped" },
            { id: "21", title: "2 x 400g tins plum tomatoes" },
            { id: "22", title: "2 garlic cloves finely chopped" },
            {
                id: "23",
                title: "1 tbsp oil",
                subIngredients: [{ id: "23-1", title: "olive oil" }],
            },
            {
                id: "24",
                title: "2-3 sprigs rosemary leaves picked and finely chopped",
            },
            { id: "25", title: "500g beef mince" },
            { id: "26", title: "75g parmesan grated" },
            { id: "27", title: "400g spaghetti" },
        ],
    },
    {
        id: "4",
        title: "Musaka",
        ingredients: [
            { id: "28", title: "1 onion, finely chopped" },
            { id: "29", title: "2 fat garlic cloves" },
            { id: "30", title: "1 large egg plus 1 yolk, lightly beaten" },
            { id: "31", title: "400g can chopped tomatoes" },
            { id: "32", title: "800g lamb mince" },
            {
                id: "33",
                title: "550g Maris Piper potatoes, peeled and sliced into 5mm rounds",
            },
            {
                id: "34",
                title: "1 tbsp oil",
                subIngredients: [{ id: "23-1", title: "olive oil" }],
            },
            { id: "35", title: "3 medium aubergines, cut into 5mm rounds" },
        ],
    },
    {
        id: "5",
        title: "Banista",
        ingredients: [
            { id: "36", title: "30g butter, plus extra to grease" },
            { id: "37", title: "3 large eggs" },
            { id: "38", title: "125g low-fat natural yogurt" },
            { id: "39", title: "2 tbsp sunflower oil" },
            { id: "40", title: "8 small sheets filo pastry, from a 220g pack" },
            { id: "41", title: "200g vegetarian feta, crumbled" },
        ],
    },
];

export default recipes;
