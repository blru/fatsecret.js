import Food from "../../structures/Food";
import FoodSearchResults from "../../structures/FoodSearchResults";
import { APIError, APIErrorCode } from "../APIError";
import BaseClient from "../BaseClient"

export function getFoodSearchFactory(client: BaseClient) {
    // return function to send request
    return async (params: {
        searchExpression?: string;
        pageNumber?: number;
        maxResults?: number;
        region?: string;
        language?: string;
    }) => {
        try {
            // send request
            const response = await client.doRequest("foods.search", {
                search_expression: params.searchExpression,
                page_number: params.pageNumber,

                max_results: params.maxResults,
                region: params.region,
                language: params.language
            });

            // return search results as foodSearchResult object
            return FoodSearchResults.fromJson(response.data["foods"]);
        } catch (err: unknown) {
            // else, rethrow error
            throw err;
        }
    }
}