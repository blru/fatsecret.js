import valueToArray from "../utility/valueToArray";
import Food from "./Food";
import Serving from "./Serving";

interface IOptions {
    /* max results for that search */
    maxResults?: number;

    /* page number for that list of results */
    pageNumber?: number;

    /* all results in total for that expression */
    totalResults?: number;

    /* a list of foods for that search */
    foods?: Food[]
}

export default class FoodSearchResults {
    maxResults?: number;
    pageNumber?: number;
    totalResults?: number;
    foods?: Food[];

    constructor(options: IOptions) {
        // assign options to own properties
        Object.assign(this, options);
    }

    static fromJson(object: any) {
        // ensure object isn't null or undefined
        object = object || {}

        // extract properties
        const maxResults = parseInt(object["max_results"], 10);
        const pageNumber = parseInt(object["page_number"], 10);
        const totalResults = parseInt(object["total_results"], 10);
        const foods = (object["food"]) || [];

        // return instance of Food
        return new FoodSearchResults({
            maxResults,
            pageNumber,
            totalResults,

            // map servings to instance of Serving
            foods: valueToArray(foods)
                .map((serving) => Food.fromJson(serving))
        });
    }
}