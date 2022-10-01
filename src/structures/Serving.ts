import * as math from "mathjs";

interface IOptions {
    /* serving metadata */
    id?: string;
    description?: string;
    url?: string;

    /* serving size */
    measurementDescription?: string;
    metricServingAmount?: number;
    metricServingUnit?: string;
    numberOfUnits?: number;

    /* nutrition info */
    calories?: number;
    carbohydrate?: number;
    protein?: number;
    fat?: number;
    saturatedFat?: number;
    polyunsaturatedFat?: number;
    monounsaturatedFat?: number;
    transFat?: number;
    cholesterol?: number;
    sodium?: number;
    potassium?: number;
    fiber?: number;
    sugar?: number;
    addedSugars?: number;
    vitaminD?: number;
    vitaminA?: number;
    vitaminC?: number;
    calcium?: number;
    iron?: number;
}

export default class Serving {
    /* The unique identifier of a food serving */
    id?: string;

    /* The description of a serving */
    description?: string;

    /* The link to a serving on fat secret */
    url?: string;

    /* a description of the measurement */
    measurementDescription?: string;

    /* The amount of unit of this serving */
    metricServingAmount?: math.Unit;

    /* number of serving amounts */
    numberOfUnits?: number;

    /* Total calories in kcal */
    calories?: math.Unit;

    /* Total carbohydrate in grams */
    carbohydrate?: math.Unit;

    /* Protein in grams */
    protein?: math.Unit;

    /* Total fat in grams */
    fat?: math.Unit;

    /* Saturated fat in grams */
    saturatedFat?: math.Unit;

    /* Polyunsaturated fat in grams */
    polyunsaturatedFat?: math.Unit;

    /* Monounsaturated fat in grams */
    monounsaturatedFat?: math.Unit;

    /* Trans fat in grams */
    transFat?: math.Unit;

    /* Cholesterol in milligrams */
    cholesterol?: math.Unit;

    /* Sodium in milligrams */
    sodium?: math.Unit;

    /* Potassium in milligrams */
    potassium?: math.Unit;

    /* Dietary fiber in grams */
    fiber?: math.Unit;

    /* Sugar in grams */
    sugar?: math.Unit;

    /* Added Sugars in grams */
    addedSugars?: math.Unit;

    /* Vitamin D in micrograms */
    vitaminD?: math.Unit;

    /* Vitamin A in micrograms */
    vitaminA?: math.Unit;

    /* Vitamin C in milligrams */
    vitaminC?: math.Unit;

    /* Calcium in milligrams */
    calcium?: math.Unit;

    /* Iron in milligrams */
    iron?: math.Unit;

    constructor(options: IOptions) {
        // assign options to own properties
        Object.assign(this, options);

        // if metric units provided, set serving size
        if (options.metricServingAmount && options.metricServingUnit) {
            this.metricServingAmount = math.unit(
                options.metricServingAmount,
                options.metricServingUnit
            );
        }

        // create function to convert provided nutrition number to units
        const toUnit = (unit: string, n?: number) => n ? math.unit(n, unit) : undefined;

        // TODO: Make this look cleaner :3
        // convert nutritional information as math.js units
        this.calories = toUnit("kcal", options.calories);
        this.carbohydrate = toUnit("g", options.carbohydrate);
        this.protein = toUnit("g", options.protein);
        this.fat = toUnit("g", options.fat);
        this.saturatedFat = toUnit("g", options.saturatedFat);
        this.polyunsaturatedFat = toUnit("g", options.polyunsaturatedFat);
        this.monounsaturatedFat = toUnit("g", options.monounsaturatedFat);
        this.transFat = toUnit("g", options.transFat);
        this.cholesterol = toUnit("mg", options.cholesterol);
        this.sodium = toUnit("mg", options.sodium);
        this.potassium = toUnit("mg", options.potassium);
        this.fiber = toUnit("g", options.fiber);
        this.sugar = toUnit("g", options.sugar);
        this.addedSugars = toUnit("g", options.addedSugars);
        this.vitaminD = toUnit("ug", options.vitaminD);
        this.vitaminA = toUnit("ug", options.vitaminA);
        this.vitaminC = toUnit("mg", options.vitaminC);
        this.calcium = toUnit("mg", options.calcium);
        this.iron = toUnit("mg", options.iron);
    }

    /**
    * @param {number} roundN - The number of decimals to round values to.
    **/
    computeServing(g: number, roundN?: number) {
        // ensure serving has amount in metric units
        if (!this.metricServingAmount) return;

        // compute factor to multiply values by
        const multiplyFactor = math
            .unit(g, "g")
            .divide(this.metricServingAmount)

        // create function for multiplying units to fit factor
        const factorUnit = (unit?: math.Unit) => {
            // if no unit, return undefined
            if (!unit) return;

            // compute unit multiplied by factor
            const computedUnit = <math.Unit>math.multiply(multiplyFactor, unit);

            // if should round return rounded unit
            if (roundN) return math.round(computedUnit.toNumber(), roundN);

            // else, return computed unit as number
            return computedUnit.toNumber();
        };

        return new Serving({
            metricServingAmount: g,
            metricServingUnit: "g",
            numberOfUnits: 1,

            calories: factorUnit(this.calories),
            carbohydrate: factorUnit(this.carbohydrate),
            protein: factorUnit(this.protein),
            fat: factorUnit(this.fat),
            saturatedFat: factorUnit(this.saturatedFat),
            polyunsaturatedFat: factorUnit(this.polyunsaturatedFat),
            monounsaturatedFat: factorUnit(this.monounsaturatedFat),
            transFat: factorUnit(this.transFat),
            cholesterol: factorUnit(this.cholesterol),
            sodium: factorUnit(this.sodium),
            potassium: factorUnit(this.potassium),
            fiber: factorUnit(this.fiber),
            sugar: factorUnit(this.sugar),
            addedSugars: factorUnit(this.addedSugars),
            vitaminD: factorUnit(this.vitaminD),
            vitaminA: factorUnit(this.vitaminA),
            vitaminC: factorUnit(this.vitaminC),
            calcium: factorUnit(this.calcium),
            iron: factorUnit(this.iron),
        });
    }

    // serialize
    toJson() {
        return {
            id: this.id,
            description: this.description,
            url: this.url,

            measurementDescription: this.measurementDescription,
            metricServingAmount: this.metricServingAmount?.toNumber(),
            metricServingUnit: this.metricServingAmount?.formatUnits(),
            numberOfUnits: this.numberOfUnits,

            calories: this.calories?.toNumber(),
            carbohydrate: this.carbohydrate?.toNumber(),
            protein: this.protein?.toNumber(),
            fat: this.fat?.toNumber(),
            saturatedFat: this.saturatedFat?.toNumber(),
            polyunsaturatedFat: this.polyunsaturatedFat?.toNumber(),
            monounsaturatedFat: this.monounsaturatedFat?.toNumber(),
            transFat: this.transFat?.toNumber(),
            cholesterol: this.cholesterol?.toNumber(),
            sodium: this.sodium?.toNumber(),
            potassium: this.potassium?.toNumber(),
            fiber: this.fiber?.toNumber(),
            sugar: this.sugar?.toNumber(),
            addedSugars: this.addedSugars?.toNumber(),
            vitaminD: this.vitaminD?.toNumber(),
            vitaminA: this.vitaminA?.toNumber(),
            vitaminC: this.vitaminC?.toNumber(),
            calcium: this.calcium?.toNumber(),
            iron: this.iron?.toNumber(),
        }
    }

    // deserialize
    static fromJson(object: any) {
        // ensure object isn't null or undefined
        object = object || {};

        // extract properties & convert strings to floats
        const id = object["id"];
        const description = object["description"];
        const url = object["url"];

        const measurementDescription = object["description"];
        const metricServingAmount = object["metricServingAmount"];
        const metricServingUnit = object["metricServingUnit"];
        const numberOfUnits = object["numberOfUnits"];

        const calories = object["calories"];
        const carbohydrate = object["carbohydrate"];
        const protein = object["protein"];
        const fat = object["fat"];
        const saturatedFat = object["saturatedFat"];
        const polyunsaturatedFat = object["polyunsaturatedFat"];
        const monounsaturatedFat = object["monounsaturatedFat"];
        const transFat = object["transFat"];
        const cholesterol = object["cholesterol"];
        const sodium = object["sodium"];
        const potassium = object["potassium"];
        const fiber = object["fiber"];
        const sugar = object["sugar"];
        const addedSugars = object["addedSugars"];
        const vitaminD = object["vitaminD"];
        const vitaminA = object["vitaminA"];
        const vitaminC = object["vitaminC"];
        const calcium = object["calcium"];
        const iron = object["iron"];


        // return instance of Food
        return new Serving({
            id,
            description,
            url,

            measurementDescription: measurementDescription,
            metricServingAmount: metricServingAmount,
            metricServingUnit: metricServingUnit,
            numberOfUnits: numberOfUnits,

            calories: calories,
            carbohydrate: carbohydrate,
            protein: protein,
            fat: fat,
            saturatedFat: saturatedFat,
            polyunsaturatedFat: polyunsaturatedFat,
            monounsaturatedFat: monounsaturatedFat,
            transFat: transFat,
            cholesterol: cholesterol,
            sodium: sodium,
            potassium: potassium,
            fiber: fiber,
            sugar: sugar,
            addedSugars: addedSugars,
            vitaminD: vitaminD,
            vitaminA: vitaminA,
            vitaminC: vitaminC,
            calcium: calcium,
            iron: iron,
        });
    }

    static fromResponse(object: any) {
        // ensure object isn't null or undefined
        object = object || {};

        // extract properties & convert strings to floats
        const id = object["serving_id"];
        const description = object["serving_description"];
        const url = object["serving_url"];

        const measurementDescription = object["measurement_description"];
        const metricServingAmount = parseFloat(object["metric_serving_amount"]);
        const metricServingUnit = object["metric_serving_unit"];
        const numberOfUnits = parseFloat(object["number_of_units"]);

        const calories = parseFloat(object["calories"]);
        const carbohydrate = parseFloat(object["carbohydrate"]);
        const protein = parseFloat(object["protein"]);
        const fat = parseFloat(object["fat"]);
        const saturatedFat = parseFloat(object["saturated_fat"]);
        const polyunsaturatedFat = parseFloat(object["polyunsaturated_fat"]);
        const monounsaturatedFat = parseFloat(object["monounsaturated_fat"]);
        const transFat = parseFloat(object["trans_fat"]);
        const cholesterol = parseFloat(object["cholesterol"]);
        const sodium = parseFloat(object["sodium"]);
        const potassium = parseFloat(object["potassium"]);
        const fiber = parseFloat(object["fiber"]);
        const sugar = parseFloat(object["sugar"]);
        const addedSugars = parseFloat(object["added_sugars"]);
        const vitaminD = parseFloat(object["vitamin_d"]);
        const vitaminA = parseFloat(object["vitamin_a"]);
        const vitaminC = parseFloat(object["vitamin_c"]);
        const calcium = parseFloat(object["calcium"]);
        const iron = parseFloat(object["iron"]);


        // return instance of Food
        return new Serving({
            id,
            description,
            url,

            measurementDescription,
            metricServingAmount: metricServingAmount,
            metricServingUnit,
            numberOfUnits: numberOfUnits,

            calories: calories,
            carbohydrate: carbohydrate,
            protein: protein,
            fat: fat,
            saturatedFat: saturatedFat,
            polyunsaturatedFat: polyunsaturatedFat,
            monounsaturatedFat: monounsaturatedFat,
            transFat: transFat,
            cholesterol: cholesterol,
            sodium: sodium,
            potassium: potassium,
            fiber: fiber,
            sugar: sugar,
            addedSugars: addedSugars,
            vitaminD: vitaminD,
            vitaminA: vitaminA,
            vitaminC: vitaminC,
            calcium: calcium,
            iron: iron,
        });
    }


    debugLog() {
        console.table({
            id: this.id,
            description: this.description,
            url: this.url,

            measurementDescription: this.measurementDescription,
            metricServingAmount: this.metricServingAmount?.format({}),
            numberOfUnits: this.numberOfUnits,

            calories: this.calories?.format({}),
            carbohydrate: this.carbohydrate?.format({}),
            protein: this.protein?.format({}),
            fat: this.fat?.format({}),
            saturatedFat: this.saturatedFat?.format({}),
            polyunsaturatedFat: this.polyunsaturatedFat?.format({}),
            monounsaturatedFat: this.monounsaturatedFat?.format({}),
            transFat: this.transFat?.format({}),
            cholesterol: this.cholesterol?.format({}),
            sodium: this.sodium?.format({}),
            potassium: this.potassium?.format({}),
            fiber: this.fiber?.format({}),
            sugar: this.sugar?.format({}),
            addedSugars: this.addedSugars?.format({}),
            vitaminD: this.vitaminD?.format({}),
            vitaminA: this.vitaminA?.format({}),
            vitaminC: this.vitaminC?.format({}),
            calcium: this.calcium?.format({}),
            iron: this.iron?.format({}),
        });
    }
}