import { Type } from '@sinclair/typebox';

export enum FastifyStatus {
    ONE = 1,
}

export const envVarsSchema = Type.Object(
    {
        port: Type.Number({ minimum: 0 }),
        host: Type.String({ maxLength: 255, minLength: 1 }),
        project: Type.String({ maxLength: 255, minLength: 1 }),
        scheme: Type.String({ maxLength: 255, minLength: 1 }),
        version: Type.String({ maxLength: 255, minLength: 1 }),
        environment: Type.String({ maxLength: 255, minLength: 1 }),

        fastify: Type.Enum(FastifyStatus),
    },
    { additionalProperties: false },
);
