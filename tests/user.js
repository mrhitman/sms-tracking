const { test } = require("ava");
const createApp = require("../src");
const agent = require("supertest-koa-agent");

const app = agent(createApp());

test("create user", async t => {
    const response = await app.get('/');
    t.is(response.status, 200);
    // t.is(response.body, 'hi');
});

test.todo("update user");