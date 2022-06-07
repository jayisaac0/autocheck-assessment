import reqmaker from './reqmaker';

export default function getTopTen(storiesArr: any) {
    console.log(storiesArr);

    const storiesMap = new Map();

    for (let title of storiesArr) {
        const titleArr = title.split(' ');
        for (let word of titleArr) {
            if (storiesMap.has(word.toLowerCase())) {
                storiesMap.set(word.toLowerCase(), storiesMap.get(word.toLowerCase()) + 1);
            } else {
                storiesMap.set(word.toLowerCase(), 1);
            }
        }
    }

    const wordCount = [...storiesMap].map((item) => {
        return {
            word: item[0],
            count: item[1],
        };
    });

    const sortedWords = wordCount.sort((a, b) => a.count - b.count);
    const result = sortedWords.splice(-10);
    return result;
}
