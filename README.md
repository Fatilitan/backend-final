# BED Final Project

This repository contains code for the Bookings project.

## How to test project

firstly, install all the necessary dependencies:

```plaintext
npm install
```

Create a relational database online (like planetsclale for example), and copy the database url into a .env in the root of the project folder.
Then, to set up and seed the database, enter the following commands:

```plaintext
npx prisma generate
npx prisma db seed
```

Then, start the dev server.

```plaintext
npm run dev
```
In a different terminal, start the test script:

```plaintext
npm test
```
