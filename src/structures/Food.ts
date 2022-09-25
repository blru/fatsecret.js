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

    computeServing(g: number, round?: boolean) {
        // get all servings with metric size units
        const metricServings = this.servings?.filter(serving => serving.metricServingAmount);

        // if no metric servings, return
        if (!metricServings || metricServings.length === 0) return;

        // get first serving where metric units available
        const foundServing = metricServings?.[0];

        // this is need because typescript :(
        if (!foundServing.metricServingAmount) return;

        // compute factor to multiply values by
        const multiplyFactor = math
            .unit(g, "g")
            .divide(foundServing.metricServingAmount)

        // create function for multiplying units to fit factor
        const factorUnit = (unit?: math.Unit) => {
            // if no unit, return undefined
            if (!unit) return;

            const computedUnit = <math.Unit>math.multiply(multiplyFactor, unit);

            // if should round return rounded unit
            if (round) return Math.round(computedUnit.toNumber());

            // else, return computed unit as number
            return computedUnit.toNumber();
        };

        return new Serving({
            metricServingAmount: g,
            metricServingUnit: "g",
            numberOfUnits: 1,

            calories: factorUnit(foundServing.calories),
            carbohydrate: factorUnit(foundServing.carbohydrate),
            protein: factorUnit(foundServing.protein),
            fat: factorUnit(foundServing.fat),
            saturatedFat: factorUnit(foundServing.saturatedFat),
            polyunsaturatedFat: factorUnit(foundServing.polyunsaturatedFat),
            monounsaturatedFat: factorUnit(foundServing.monounsaturatedFat),
            transFat: factorUnit(foundServing.transFat),
            cholesterol: factorUnit(foundServing.cholesterol),
            sodium: factorUnit(foundServing.sodium),
            potassium: factorUnit(foundServing.potassium),
            fiber: factorUnit(foundServing.fiber),
            sugar: factorUnit(foundServing.sugar),
            addedSugars: factorUnit(foundServing.addedSugars),
            vitaminD: factorUnit(foundServing.vitaminD),
            vitaminA: factorUnit(foundServing.vitaminA),
            vitaminC: factorUnit(foundServing.vitaminC),
            calcium: factorUnit(foundServing.calcium),
            iron: factorUnit(foundServing.iron),
        });
    }

    static fromJson(object: any) {
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
                .map((serving) => Serving.fromJson(serving))
        });
    }
}