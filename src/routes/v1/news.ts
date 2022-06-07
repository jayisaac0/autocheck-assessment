import { FastifyInstance } from 'fastify';
import { NewsController } from '../../controllers/News.Controller';
import { summaryTags } from '../../utils/responses';
import Requests from '../../utils/requests';
import { Type } from '@sinclair/typebox';
import { NewsParamProp } from './route-schema';

export default function (app: FastifyInstance, options: any, done: () => void) {
    const label = "Hacker News API";
    
    const fetch00Schema = {
        ...summaryTags(label, 'Top 10 most occurring words in the titles of the last 25 stories '),
    };
    app.get(`/0/`, { schema: fetch00Schema }, NewsController.mostOccuringWords);

    const fetch01Schema = {
        ...summaryTags(label, 'Top 10 most occurring words in the titles of the post of exactly the last week '),
    };
    app.get(`/1/`, { schema: fetch01Schema }, NewsController.mostOccuringWordsInPastWeek);
    
    const fetchA02Schema = {
        ...summaryTags(label, 'Top 10 most occurring words in titles of the last 600 stories of users with at least 10.000 karma  '),
    };
    app.get(`/2/`, { schema: fetchA02Schema }, NewsController.mostOccuringWordsInStories);

    done();
}
