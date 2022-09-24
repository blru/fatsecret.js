import FatSecret from "../src/main";
import "dotenv/config";

const client = new FatSecret.Client({
    credentials: {
        clientId: process.env["FATSECRET_CLIENT_ID"] || "",
        clientSecret: process.env["FATSECRET_CLIENT_SECRET"] || "",
        scope: ["premier", "barcode"]
    }
});

void async function () {
    console.log(
        "[get food] \n",
        await client.getFood({ foodId: "1234" })
    );

    console.log(
        "[get food from barcode] \n",
        await client.getFoodFromBarcode({ barcode: "77567153012" })
    );

    // TODO: Test for expression with only one result
    // TODO: Test for expression with no result
    console.log(
        "[get autocomplete] \n",
        await client.getAutocomplete({ expression: "rice" })
    );

    console.log(
        "[get food search] \n",
        await client.getFoodSearch({ searchExpression: "chicken" })
    );
}()