import { FastifyInstance } from 'fastify';
import newsRoutes from './news';

export default function (app: FastifyInstance) {
    app.register(newsRoutes, { prefix: '/api/v1/news' });
}
