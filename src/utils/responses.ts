import { Type, TObject } from '@sinclair/typebox';

// status: { type: 'string', enum: ['001'] },
export enum ResStatus {
    ERR = '001',
}

// status: { type: 'string', enum: ['000', "002"] },
export enum SuccessStatus {
    '000',
    '002',
}

class Responses {
    static errorResponseObj() {
        return Type.Object({
            status: Type.Enum(ResStatus),
            description: Type.String(),
            error: Type.Array(
                Type.Object({
                    code: Type.String(),
                    description: Type.String(),
                }),
            ),
        });
    }

    static errorResponses(description: string, error: any) {
        return {
            status: ResStatus.ERR,
            description: description,
            error: error,
        };
    }

}

export default Responses;

export const objectResponse = (properties: TObject<{}>) => {
    return {
        400: Responses.errorResponseObj(),
        200: Type.Object(
            {
                id: Type.Number({ description: 'Item id' }),
                ...properties.properties,
                created_at: Type.String(),
                updated_at: Type.String(),
            },
            { additionalProperties: true },
        ),
    };
};

export const arrayResponse = (properties: TObject<{}>) => {
    return {
        400: Responses.errorResponseObj(),
        200: Type.Array(
            Type.Object(
                {
                    id: Type.Number({ description: 'Item id' }),
                    ...properties.properties,
                    created_at: Type.String(),
                    updated_at: Type.String(),
                },
                { additionalProperties: true },
            ),
        ),
    };
};

export const summaryTags = (tags: string, summary: string) => {
    return {
        tags: [tags],
        summary,
    };
};
