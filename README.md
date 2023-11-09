Project is deployed [here](https://vercel.com/joage/finni-app).

## Design 
<img width="443" alt="Screen Shot 2023-11-09 at 3 19 12 PM" src="https://github.com/joage/finni-app/assets/35152863/352d81a8-1832-4ef6-9d15-8e38acd372ff">

- NextJS with Typescript
- Postgres, because a relational db lends itself to the Clinic-Patient models we want to track.
- Prisma, an ORM as a layer between postgres and our server/client code

## Future Work
- Authentication. The DB schema I created is already set up to store clinic and sign in data, it would be a matter of implementing OAth with NextAuth or an equivalent library
- Better UI for gathering custom field data. Ideally a dynamic form field (custom or from a component library) instead of raw JSON input, which is what we have in this MVP.
- Testing: 1. individual component testing, 2. Unit test API route handlers, and 3. End-to-end tests by mocking a DB.
- Search box should be able to serach custom fields as well. Most likely need to convert the prisma queries in [/src/app/api/patients/route.ts](src/app/api/patients/route.ts) into Raw SQL in order to compare with a stringified JSON field.



