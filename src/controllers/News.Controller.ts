import { FastifyRequest, FastifyReply } from 'fastify';
import sequelize from 'sequelize';
import { NewsType } from '../routes/v1/route-schema';
import getTopTen from '../utils/getTopTen';
import reqmaker from '../utils/reqmaker';

export class NewsController {
    static async mostOccuringWords(
        req: FastifyRequest,
        res: FastifyReply,
    ) {
        let storiesArr: any = [];

        const stories: any = await reqmaker({
            service: 'external',
            action: `topstories.json`,
            method: 'GET',
        });

        const lastTwentyFive = stories.slice(-25);

        for (let element of lastTwentyFive) {
            const storyItem: any = await reqmaker({
                service: 'external',
                action: `item/${element}.json`,
                method: 'GET',
            });
            storiesArr.push(storyItem.title);
        }

        const result = await getTopTen(storiesArr);

        return res.status(200).send(result);
    }
    static async mostOccuringWordsInPastWeek(
        req: FastifyRequest,
        res: FastifyReply,
    ) {
        console.log(req.body);
        let storiesArr: any = [];

        var dateOffset: any = 24 * 60 * 60 * 1000 * 2;
        const todate = Date.now();
        const pastWeek = todate - dateOffset;
        console.log(dateOffset, todate, pastWeek);

        const stories: any = await reqmaker({
            service: 'external',
            action: 'topstories.json',
            method: 'GET',
        });

        for (let element of stories) {
            const storyItem: any = await reqmaker({
                service: 'external',
                action: `item/${element}.json`,
                method: 'GET',
            });
            if (storyItem.created > pastWeek) {
                storiesArr.push(storyItem);
            }
        }

        const result = await getTopTen(storiesArr);

        return res.status(200).send(result);
    }
    static async mostOccuringWordsInStories(
        req: FastifyRequest,
        res: FastifyReply,
    ) {
        console.log(req.body);
        let storiesArr: any = [];

        const profiles: any = await reqmaker({
            service: 'external',
            action: 'updates.json',
            method: 'GET',
        });


        for (let element of profiles.profiles) {
            const item: any = await reqmaker({
                service: 'external',
                action: `user/${element}.json`,
                method: 'GET',
            });
            
            if (item.karma > 10000) {
                console.log(item.karma);
                storiesArr.push(item);
            }
        }


        let newSubmissions = [];
        for (const el of storiesArr) {
            for (const it of el.submitted) {
                newSubmissions.push(it);
            }
            
        }
        
        const sortedWords = newSubmissions.sort((a, b) => a - b);
        let allStories = [];

        for (let element of sortedWords.splice(-600)) {
            const storyItem: any = await reqmaker({
                service: 'external',
                action: `item/${element}.json`,
                method: 'GET',
            });
            if (storyItem.title !== undefined) {
                allStories.push(storyItem.title);
            }
        }

        const result = await getTopTen(allStories);

        return res.status(200).send(result);
    }
}
