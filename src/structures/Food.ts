import valueToArray from "../utility/valueToArray";
import Serving from "./Serving";

interface IOptions {
    /* The unique identifier of a food */
    id?: string;

    /* The human-readable name of a food */
    name?: string;

    /* To denote the type of food, whether it is a brand or generic */
    type?: "Brand" | "Generic";

    /* a link to the food on fatsecret */
    url?: string;

    /* a list of servings for that food */
    servings?: Serving[]
}

export default class Food {
    id?: string;
    name?: string;
    type?: "Brand" | "Generic";
    url?: string;
    servings?: Serving[] = [];

    constructor(options: IOptions) {
        // assign options to own properties
        Object.assign(this, options);
    }

    static fromJson(object: any) {
        // ensure object isn't null or undefined
        object = object || {}

        // extract properties
        const id = object["food_id"];
        const name = object["food_name"];
        const type = object["food_type"];
        const url = object["food_url"];
        const servings = (object["servings"]?.serving) || [];

        // return instance of Food
        return new Food({
            id,
            name,
            type,
            url,

            // map servings to instance of Serving
            servings: valueToArray(servings)
                .map((serving) => Serving.fromJson(serving))
        });
    }
}