# chatbot app


## startup settings

```
npm install
npm start
```

## run tests

```
npm test
```

## Environment Setup

```
Required environment variables;
* PAGE_TOKEN - Facebook page token from app dashboard
* VERIFY_TOKEN - webhook verification token
* MONGO_URL - Database url in format mongodb+srv://username:password@host/dbname?retryWrites=true&w=majority
* MONGO_TEST_URL - Test database url. Same format as MONGO_URL.
```

## Initialize Get Started Button

```
GET /api/start
```

## API Endpoints

```
GET /api/messages

GET /api/messages/:id

GET /summary

```