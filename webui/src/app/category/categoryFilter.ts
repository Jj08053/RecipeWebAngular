import { Pipe, PipeTransform } from "@angular/core";
import { CartItem } from "../models/CartItem";

@Pipe({name:'categoryFilter'})
export class categoryFilterPipe implements PipeTransform{
    transform(categ: CartItem[], category: string): CartItem[] {
        return categ.filter(item => item.category === category);
      }
    
}