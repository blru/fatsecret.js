import BaseClient, { IOptions } from "./BaseClient";
import { getAutocompleteFactory } from "./handlers/getAutocomplete";
import { getFoodFactory } from "./handlers/getFood";
import { getFoodFromBarcodeFactory } from "./handlers/getFoodFromBarcode";
import { getFoodSearchFactory } from "./handlers/getFoodSearch";

export class Client extends BaseClient {
    constructor(options: IOptions) {
        super(options);
    }

    // handlers
    public getFood = getFoodFactory(this);
    public getFoodFromBarcode = getFoodFromBarcodeFactory(this);
    public getAutocomplete = getAutocompleteFactory(this);
    public getFoodSearch = getFoodSearchFactory(this);
}