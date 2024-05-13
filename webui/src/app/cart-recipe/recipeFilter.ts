import { Pipe, PipeTransform } from "@angular/core";
import { CartItem } from "../models/CartItem";

@Pipe({name:'recipeFilter'})
export class recipeFilterPipe implements PipeTransform{
    transform(recipe: CartItem[], recipeName: string): CartItem[] {
        return recipe.filter(item => item.recipeName === recipeName);
      }
    
}