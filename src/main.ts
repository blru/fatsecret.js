import * as math from "mathjs";

import { Client } from "./client/Client"
import { APIErrorCode } from "./client/APIError"

// define the calorie
math.createUnit({
    calorie: {
        definition: "4.184J",
        prefixes: "short",
        aliases: ["cal"]
    }
});

export default {
    Client
}

export {
    Client,
    APIErrorCode
}