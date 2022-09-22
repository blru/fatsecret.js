import BaseClient, { IOptions } from "./BaseClient";
import { getFoodFactory } from "./handlers/getFood";

export class Client extends BaseClient {
    constructor(options: IOptions) {
        super(options);
    }

    // handler
    public getFood = getFoodFactory(this);
}