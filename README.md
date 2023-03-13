
## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

##Docs

This app has 4 routes, three of them are responsible for manipulating entities: bank, transaction, category. The last one is responsible for receiving webhooks for new transactional. 
Here is a little description of routes and their inputs


##Bank
- post method that takes name of bank and startup balanse "/bank"
- get method that return all Bank entities"/bank"
- delete, get, put methods take only one argument id in format of uuid  "/bank/:id"


##Transaction 
- get method that return all Transaction entities "/transaction"
- delete that take only one argument id in format of uuid and delete that entity "/transaction/:id"


##Category
- post method that takes name of category "/category"
- get method that return all category entities "/category"
- delete, get, put methods take only one argument id in format of uuid "/category/:id"
- get method that use route "/category/statistics" return statistic object that contain all infarmation about money that was spented for category "/category/statistics?categoryIds=[]&fromPeriod=Date&toPeriod=Date"


##Webhook
- route for trigger new transaction creating "/webhook/yZN835c2rWNti19USZ0J"
- route for error message in case of some another error "/webhook/ROpIsRhqtASCATD0MJQp"
