import Food from "../../structures/Food";
import { APIError, APIErrorCode } from "../APIError";
import BaseClient from "../BaseClient"

export function getFoodFactory(client: BaseClient) {
    // return function to send request
    return async (params: {
        foodId: string;
        region?: string;
        language?: string;
    }) => {
        try {
            // send request
            const response = await client.doRequest("food.get.v2", {
                food_id: params.foodId,
                region: params.region,
                language: params.language
            });

            // return food as food object
            return Food.fromResponse(response.data["food"]);
        } catch (err: unknown) {
            // if couldn't find food because of invalid id return undefined
            if (err instanceof APIError && err.code === APIErrorCode.INVALID_ID)
                return;

            // else, rethrow error
            throw err;
        }
    }
}