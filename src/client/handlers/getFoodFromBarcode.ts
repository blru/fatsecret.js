import BarcodeFood from "../../structures/BarcodeFood";
import { APIError, APIErrorCode } from "../APIError";
import BaseClient from "../BaseClient"

export function getFoodFromBarcodeFactory(client: BaseClient) {
    // return function to send request
    return async (params: {
        barcode: string;
        region?: string;
        language?: string;
    }) => {
        try {
            // send request
            const response = await client.doRequest("food.find_id_for_barcode", {
                barcode: params.barcode,
                region: params.region,
                language: params.language
            });

            // if no food, return
            if (response.data["fod_id"]?.["value"] === "0") return;

            // return food as food object
            return BarcodeFood.fromResponse(response.data);
        } catch (err: unknown) {
            // else, rethrow error
            throw err;
        }
    }
}