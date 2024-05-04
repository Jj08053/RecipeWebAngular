const path = require("path");
const express = require("express");
const app = express();
const fs = require("fs"); //file system

const filePath = path.join(__dirname, "recipes.json");
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
let corsOptions = {
    origin : ['http://localhost:4200'],
 }
app.use(cors(corsOptions));

import { Recipe } from "./Recipe";

let recipesList: Recipe[] = [];

fs.readFile(filePath, (err, data) =>{ //data = content of the file; has content if there is no error
    if (err){
        console.error("Unable to read file: " + filePath + "\n" + err);
    }
    else{
        recipesList = JSON.parse(data);
    }
});

//NEED TO COMPLETE
app.get("/", (req, resp)=>{


    
    return resp.json({"home": "home"});
})

app.get("/recipes", (req, resp)=>{
    resp.status(200);
    return resp.json(recipesList);
})

//NEED TO COMPLETE
app.get("/cart", (req, resp)=>{



    return resp.json({"cart": "cart"});
})

app.get("/recipe/:name", (req, resp)=>{
    const recipe: Recipe | undefined = recipesList.find(recipe => recipe.name == req.params.name);
    if (recipe){
        resp.status(200);
        return(resp.json(recipe));
    }
    resp.status(404);
    return resp.json({error: `recipe with name: ${req.params.name} not found`});
})

// app.post("/", (req, resp) => {
//     let newrecipe = req.body;
//     if (recipesList.find(recipe => recipe.name == newrecipe.name)){
//         resp.status(404);
//         return resp.json({error: `recipe with name: ${newrecipe.name} already existed`});
//     }
//     let regex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
//     if (!regex.test(newrecipe.phoneNumber) || recipesList.find(recipe => recipe.phoneNumber == newrecipe.phoneNumber)){
//         resp.status(404);
//         return resp.json({error: `Wrong phone format or duplicate phoneNumber: ${newrecipe.phoneNumber}`});
//     }
//     if (!newrecipe.id || !newrecipe.firstName || !newrecipe.lastName || !newrecipe.phoneNumber)
//         return resp.status(404).send("Missing id, firstName, lastName or phoneNumber");
//     recipesList.push((req.body));
//     resp.status(200);
//     return resp.json(req.body);
// });

// app.put('/', (req,resp)=>{
//     for (let i = 0; i < recipesList.length;i++){
//         if (recipesList[i].name === req.body.id){
//             recipesList[i].image = req.body.image;
//             recipesList[i].serving = req.body.serving;
//             recipesList[i].ingredients = req.body.ingredients;
//             recipesList[i].instructions = req.body.instructions;
//             resp.status(200); 
//             return(resp.json(req.body));
//         }
//     }
//     return resp.json({err: `Can't replace recipe with name: ${req.body.name}: name not found`}); 
// });

// app.delete('/', (req,resp)=>{
//     for (let i = 0; i < recipesList.length;i++){
//         if (recipesList[i].id === req.body.id){
//             recipesList.splice(i, 1);
//             resp.status(200); 
//             return(resp.json(req.body.id));
//         }
//     }
//     return resp.json({err: `Can't delete recipe with id: ${req.body.id}: id not found`}); 
// });

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});