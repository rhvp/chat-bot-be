const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require('../app');
const Message = require('../models/message');
const User = require("../models/user");

jest.setTimeout(10000)

beforeAll((done) => {
    mongoose.connect("mongodb+srv://sody-boy:rhap95@my-cluster-01-a0hk3.mongodb.net/chat-test?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done());
  });
  
afterAll((done) => {
mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
});
});

test("Get Messages", async () => {
    await Message.create({text: "lorem"});

    await supertest(app).get("/api/messages")
        .expect(200)
        .then(res => {
            expect(res.body.data.length).toEqual(1)
        })
})

test("Fetch Single Message", async () => {
    const message = await Message.create({text: "lorem"});

    await supertest(app).get("/api/messages/"+message.id)
        .expect(200)
        .then(res => {
            expect(res.body.status).toBe("success")
        })
})

test("Summary", async () => {
    const message = await Message.create({text: "lorem"});

    const user = await User.create({name: "lorem", user: "1291821", messages: [message.id]})

    await supertest(app).get("/api/summary")
        .expect(200)
        .then(res => {
            expect( Array.isArray(res.body.data)).toBeTruthy();
            expect(Array.isArray(res.body.data[0].messages)).toBeTruthy();
        })
})