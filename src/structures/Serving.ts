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
    metricServingAmount?: number;

    /* the unit for the amount */
    metricServingUnit?: string;

    /* number of serving amounts */
    numberOfUnits?: number;

    /* Total calories in kcal */
    calories?: number;

    /* Total carbohydrate in grams */
    carbohydrate?: number;

    /* Protein in grams */
    protein?: number;

    /* Total fat in grams */
    fat?: number;

    /* Saturated fat in grams */
    saturatedFat?: number;

    /* Polyunsaturated fat in grams */
    polyunsaturatedFat?: number;

    /* Monounsaturated fat in grams */
    monounsaturatedFat?: number;

    /* Trans fat in grams */
    transFat?: number;

    /* Cholesterol in milligrams */
    cholesterol?: number;

    /* Sodium in milligrams */
    sodium?: number;

    /* Potassium in milligrams */
    potassium?: number;

    /* Dietary fiber in grams */
    fiber?: number;

    /* Sugar in grams */
    sugar?: number;

    /* Added Sugars in grams */
    addedSugars?: number;

    /* Vitamin D in micrograms */
    vitaminD?: number;

    /* Vitamin A in micrograms */
    vitaminA?: number;

    /* Vitamin C in milligrams */
    vitaminC?: number;

    /* Calcium in milligrams */
    calcium?: number;

    /* Iron in milligrams */
    iron?: number;

    constructor(options: IOptions) {
        // assign options to own properties
        Object.assign(this, options);
    }

    static fromJson(object: any) {
        // ensure object isn't null or undefined
        object = object || {};

        // extract properties
        const id = object["serving_id"];
        const description = object["serving_description"];
        const url = object["serving_url"];

        const measurementDescription = object["measurement_description"];
        const metricServingAmount = object["metric_serving_amount"];
        const metricServingUnit = object["metric_serving_unit"];
        const numberOfUnits = object["number_of_units"];

        const calories = object["calories"];
        const carbohydrate = object["carbohydrate"];
        const protein = object["protein"];
        const fat = object["fat"];
        const saturatedFat = object["saturated_fat"];
        const polyunsaturatedFat = object["polyunsaturated_fat"];
        const monounsaturatedFat = object["monounsaturated_fat"];
        const transFat = object["trans_fat"];
        const cholesterol = object["cholesterol"];
        const sodium = object["sodium"];
        const potassium = object["potassium"];
        const fiber = object["fiber"];
        const sugar = object["sugar"];
        const addedSugars = object["added_sugars"];
        const vitaminD = object["vitamin_d"];
        const vitaminA = object["vitamin_a"];
        const vitaminC = object["vitamin_c"];
        const calcium = object["calcium"];
        const iron = object["iron"];

        // return instance of Food
        return new Serving({
            id,
            description,
            url,

            measurementDescription,
            metricServingAmount: parseFloat(metricServingAmount),
            metricServingUnit,
            numberOfUnits: parseFloat(numberOfUnits),

            calories: parseFloat(calories),
            carbohydrate: parseFloat(carbohydrate),
            protein: parseFloat(protein),
            fat: parseFloat(fat),
            saturatedFat: parseFloat(saturatedFat),
            polyunsaturatedFat: parseFloat(polyunsaturatedFat),
            monounsaturatedFat: parseFloat(monounsaturatedFat),
            transFat: parseFloat(transFat),
            cholesterol: parseFloat(cholesterol),
            sodium: parseFloat(sodium),
            potassium: parseFloat(potassium),
            fiber: parseFloat(fiber),
            sugar: parseFloat(sugar),
            addedSugars: parseFloat(addedSugars),
            vitaminD: parseFloat(vitaminD),
            vitaminA: parseFloat(vitaminA),
            vitaminC: parseFloat(vitaminC),
            calcium: parseFloat(calcium),
            iron: parseFloat(iron),
        });
    }
}