interface IOptions {
    /* The unique identifier of a food */
    id?: string;
}

export default class BarcodeFood {
    id?: string;

    constructor(options: IOptions) {
        // assign options to own properties
        Object.assign(this, options);
    }

    // TODO: Add function to get barcode food -> food

    static fromResponse(object: any) {
        // ensure object isn't null or undefined
        object = object || {}

        // extract properties
        const id = object["food_id"]?.["value"];

        // return instance of Food
        return new BarcodeFood({
            id,
        });
    }
}