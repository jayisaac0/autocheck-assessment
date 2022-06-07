import { Type, Static } from '@sinclair/typebox';

export const NewsProp = Type.Object({
    publicKey: Type.String({
        description: 'public key',
        minLength: 1,
    }),
    privateKey: Type.String({
        description: 'private key',
        minLength: 1,
    }),
    accessibility: Type.Boolean({
    }),
    businessId: Type.Number({
        description: 'business id',
    }),
});
export type NewsType = Static<typeof NewsProp>;

export const NewsParamProp = Type.Object({
    news: Type.String({
    }),
})
export type NewsParamType = Static<typeof NewsParamProp>