import { Type } from "@sinclair/typebox";

class Requests {
    static requestParams(items: object) {
        return Type.Object({
                ...items,
        }).properties;
    }

    static requestBody(itemInterface: object, requiredValues: Array<string> | undefined) {
        return Type.Object({
            additionalProperties: Type.Boolean(),
            properties: Type.Object({...itemInterface}),
            required: Type.Array(Type.String(requiredValues)),
        });
    }
}

export default Requests;
