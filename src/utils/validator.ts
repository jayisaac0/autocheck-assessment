import Ajv from 'ajv';
import Responses from './responses';

import addFormats from 'ajv-formats';

const ajv = addFormats(new Ajv({}), [
    'date-time',
    'time',
    'date',
    'email',
    'hostname',
    'ipv4',
    'ipv6',
    'uri',
    'uri-reference',
    'uuid',
    'uri-template',
    'json-pointer',
    'relative-json-pointer',
    'regex',
])
    .addKeyword('kind')
    .addKeyword('modifier');

export function validator(schema: any, data: any): { valid: boolean; data?: any } {
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (!valid) return { valid: false, data: validate.errors };
    return { valid: true };
}

export const reqValidator = (req: any) => {
    if (req.validationError) {
        const errors = req.validationError.validation.map((mes: any) => {
            return { code: '000', description: mes.dataPath.substring(1) + ' ' + mes.message };
        });
        return {
            error: true,
            errorData: Responses.errorResponses('Input Error', errors),
        };
    } else {
        return {
            error: false,
            errorData: '',
        };
    }
};
