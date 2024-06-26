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
    origin: ['http://localhost:4200'],
}
app.use(cors(corsOptions));

import { CartItem } from "./CartItem";
import { Recipe } from "./Recipe";

let recipesList: Recipe[] = [];
let itemList: CartItem[] = [];

fs.readFile(filePath, (err: string, data: string) => { //data = content of the file; has content if there is no error
    if (err) {
        console.error("Unable to read file: " + filePath + "\n" + err);
    }
    else {
        recipesList = JSON.parse(data);
    }
});

app.get("/recipes", (req, resp) => {
    resp.status(200);
    return resp.json(recipesList);
})

app.get("/recipe/:name", (req, resp) => {
    const recipe: Recipe | undefined = recipesList.find(recipe => recipe.name == req.params.name);
    if (recipe) {
        resp.status(200);
        return (resp.json(recipe));
    }
    resp.status(404);
    return resp.json({ error: `recipe with name: ${req.params.name} not found` });
})

app.get("/cart", (req, resp) => {
    return resp.json(itemList);
});

app.post("/cart", (req, resp) => {
    itemList = itemList.concat(req.body.itemInfo);
    resp.status(200);
    return resp.json(itemList);
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});