# mui-bookings
A toy prototype for a booking calendar SPA using Next.js, Firebase, and MaterialUI. This is a Next.js project bootstrapped with `create-next-app`.

### Live demo available
A demo of this SPA is deployed using Vercel. This can be accessed at mui-bookings.vercel.app.

## Assumptions and known bugs

This toy prototypes assumes correct input for the `seeker` and `giver` fields, as well as a proper floating-point number type for the `price` field. 

A known bug relates to the table not refreshing ocassionally after performing an update operation. I believe this might be associaed with how I used `async/await` to perform the CRUD operations on the database. 

## Running locally in development mode
To get started, just clone the repository and run `npm install && npm run dev`:

```
git clone https://github.com/jpin27/mui-bookings.git
npm install
npm run dev
```