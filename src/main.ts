import * as math from "mathjs";

import { Client } from "./client/Client"
import { APIErrorCode } from "./client/APIError"
import Food from "./structures/Food";
import BarcodedFood from "./structures/BarcodeFood";
import FoodSearchResults from "./structures/FoodSearchResults";
import Serving from "./structures/Serving";

// define the calorie
math.createUnit({
    calorie: {
        definition: "4.184J",
        prefixes: "short",
        aliases: ["cal"]
    }
});

export default {
    Client,
    APIErrorCode,

    Food,
    BarcodedFood,
    FoodSearchResults,
    Serving
}

export {
    Client,
    APIErrorCode,

    Food,
    BarcodedFood,
    FoodSearchResults,
    Serving
}