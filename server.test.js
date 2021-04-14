let webapp = require("./server");
const request = require('supertest');

describe('Test  /home endpoint', () => {
    test('/home endpoint response number of rows & status code', () => {
        return request(webapp).get('/home').expect(200).then(response => {
            expect(JSON.parse(response.text).data.length).toBe(4);
        });
    });

    test('Test /createTweet/ endpoint response content', () => {
        const expectedResponse = [{"uid":2 ,"tweet_id": 1,"type":"N/A","content":"Hello here!", "tweet_date": '2008-7-04', "tweet_likes" : 0}];
        return request(webapp).get('/createTweet/').expect(404).then(response => {
            console.log(response.text + " This is the response text");
            expect(JSON.parse(response.text).data).toEqual(expect.arrayContaining(expectedResponse));
        });
    });
});
