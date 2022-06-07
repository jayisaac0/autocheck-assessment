import { FastifyInstance } from 'fastify';

import baseRoutes from './v1';

export default function (app: FastifyInstance) {
    baseRoutes(app);
}
