### SimpliMuv Fullstack challenge - Backend

[Live API](https://simpli-back.joxpulp.com/api/motorcycles/list?page=1&limit=8)

## Local Setup:

- Clone the project

```bash
  git clone https://github.com/joxpulp/challenge-simpli-backend.git
```

- Install packages using:

```bash
npm i
```

- To start the app, run the development server:

```bash
npm run dev
```

- To run tests:

```bash
npm run test
```

- To build the app:

```bash
npm run build
```

- To start the app:

```bash
npm run start
```

- There is an .env.sample file, containing the environment variable to connect the API to a MongoDB Database:
- This project uses Typescript, ESLint, Prettier, Express, Jest, Zod, MongoDB, Husky and Lint-staged
- Husky and lint-staged are used to run ESLint and prettier with a pre-commit hook, if there is an actual error the commit is aborted.

## Endpoints:

Motorcycles:

| Method |                              Route                               |                                                                                                 Description |
| ------ | :--------------------------------------------------------------: | ----------------------------------------------------------------------------------------------------------: |
| GET    |                     _/api/motorcycles/list/_                     |                                                                                        List all motorcycles |
| GET    |              \*/api/motorcycles/list?page=1&limit=8              |                         List all motorcycles and also a paging object with informatation to do a pagination |
| GET    |        \*/api/motorcycles/list?page=1&limit=8&sort_by=asc        |                                                              List all motorcycles sorted in ascending order |
| GET    |       \*/api/motorcycles/list?page=1&limit=8&sort_by=desc        |                                                             List all motorcycles sorted in descending order |
| GET    | \*/api/motorcycles/list?page=1&limit=8&min_price=1&max_price=500 | Filters motorcycles in a range of min_price and max_price, you can use this filter with one query param too |
| GET    |                   _/api/motorcycles/list/slug_                   |                                                                                   List a motorcycle by slug |
| POST   |                      _/api/motorcycles/add_                      |                                                                    Adds a motorcycle by passing a JSON Body |

JSON Body template:

```Typescript
{
    "name": string,
    "image": string,
    "description": string,
    "price": number,
    "currency": string,
}
```

Accesories:

| Method |                              Route                               |                                                                                                 Description |
| ------ | :--------------------------------------------------------------: | ----------------------------------------------------------------------------------------------------------: |
| GET    |                     _/api/accessories/list/_                     |                                                                                        List all accessories |
| GET    |              \*/api/accessories/list?page=1&limit=8              |                         List all accessories and also a paging object with informatation to do a pagination |
| GET    |        \*/api/accessories/list?page=1&limit=8&sort_by=asc        |                                                              List all accessories sorted in ascending order |
| GET    |       \*/api/accessories/list?page=1&limit=8&sort_by=desc        |                                                             List all accessories sorted in descending order |
| GET    | \*/api/accessories/list?page=1&limit=8&min_price=1&max_price=500 | Filters accessories in a range of min_price and max_price, you can use this filter with one query param too |
| GET    |                   _/api/accessories/list/slug_                   |                                                                                   List a motorcycle by slug |
| POST   |                      _/api/accessories/add_                      |                                                                  Adds an accessesory by passing a JSON Body |

JSON Body template:

```Typescript
{
    "name": string,
    "image": string,
    "description": string,
    "price": number,
    "currency": string,
}
```

Leads:

| Method |        Route         |                       Description |
| ------ | :------------------: | --------------------------------: |
| GET    |  _/api/leads/list/_  |           List all leads contacts |
| GET    | _/api/leads/list/id_ |                 List a lead by id |
| POST   |   _/api/leads/add_   | Add a lead by passing a JSON Body |

JSON Body template:

```Typescript
{
    "name": string,
    "lastname": string,
    "email": string,
    "phone": string,
    "product_name": string,
    "product_id": string,
}
```
