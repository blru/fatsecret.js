import FatSecret from "../src/main";
import "dotenv/config";

const client = new FatSecret.Client({
    credentials: {
        clientId: process.env["FATSECRET_CLIENT_ID"] || "",
        clientSecret: process.env["FATSECRET_CLIENT_SECRET"] || "",
        scope: "premier"
    }
});

void async function () {
    console.log(
        await client.getFood({ foodId: "1234" })
    );
}()