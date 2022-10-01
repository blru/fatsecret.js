import valueToArray from "../utility/valueToArray";
import Serving from "./Serving";
import * as math from "mathjs";

interface IOptions {
    /* The unique identifier of a food */
    id?: string;

    /* The human-readable name of a food */
    name?: string;

    /* To denote the type of food, whether it is a brand or generic */
    type?: "Brand" | "Generic";

    /* a link to the food on fatsecret */
    url?: string;

    /* the name of the food's brand  */
    brandName?: string;

    /* a list of servings for that food */
    servings?: Serving[]
}

export default class Food {
    id?: string;
    name?: string;
    type?: "Brand" | "Generic";
    url?: string;
    brandName?: string;
    servings?: Serving[];

    constructor(options: IOptions) {
        // assign options to own properties
        Object.assign(this, options);
    }

    /**
    * @param {number} roundN - The number of decimals to round values to.
    **/
    computeServing(g: number, roundN?: number) {
        // get all servings with metric size units
        const metricServings = this.servings?.filter(serving => serving.metricServingAmount);

        // if no metric servings, return
        if (!metricServings || metricServings.length === 0) return;

        // get first serving where metric units available
        const foundServing = metricServings?.[0];

        // return computation for found serving
        return foundServing.computeServing(g, roundN);
    }

    toJson() {
        // return instance of Food
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            brandName: this.brandName,
            url: this.url,

            // map servings to instance of Serving
            servings: this.servings?.map((serving) => serving.toJson())
        };
    }

    static fromJson(object: any) {
        // ensure object isn't null or undefined
        object = object || {}

        // extract properties
        const id = object["id"];
        const name = object["name"];
        const type = object["type"];
        const url = object["url"];
        const brandName = object["brandName"];
        const servings = (object["servings"]) || [];

        // return instance of Food
        return new Food({
            id,
            name,
            type,
            brandName,
            url,

            // map servings to instance of Serving
            servings: valueToArray(servings)
                .map((serving) => Serving.fromJson(serving))
        });
    }

    static fromResponse(object: any) {
        // ensure object isn't null or undefined
        object = object || {}

        // extract properties
        const id = object["food_id"];
        const name = object["food_name"];
        const type = object["food_type"];
        const url = object["food_url"];
        const brandName = object["brand_name"];
        const servings = (object["servings"]?.serving) || [];

        // return instance of Food
        return new Food({
            id,
            name,
            type,
            brandName,
            url,

            // map servings to instance of Serving
            servings: valueToArray(servings)
                .map((serving) => Serving.fromResponse(serving))
        });
    }
}