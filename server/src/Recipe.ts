import { Ingredient } from "./Ingredient";

export interface Recipe {
    name: string;
    image: string;
    serving: string;
    ingredients: Ingredient[];
    instructions: string;
}

// source of recipes:
// https://www.foodnetwork.com/recipes/food-network-kitchen/copycat-berry-chantilly-cake-18639198
// https://www.foodnetwork.com/recipes/giada-de-laurentiis/penne-with-asparagus-and-cherry-tomatoes-spring-recipe-1939598 
// https://www.foodnetwork.com/recipes/ree-drummond/simple-perfect-chili-recipe-2107099 
