# Backend

This Express server is written in TypeScript. Run `npm run dev` for development or `npm start` after building.

API routes under `/api` are protected by Firebase authentication middleware. Send an `Authorization: Bearer <token>` header obtained from the frontend.

Prisma is used for the PostgreSQL database schema. Run `npx prisma generate` after installing dependencies and set a `DATABASE_URL` in your environment.
