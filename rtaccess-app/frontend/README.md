# Frontend

This React application is built with Vite and TypeScript. Use `npm run dev` to start the development server.

Tailwind CSS is included for styling. The interface features a top navbar with a notification bell slot and a mobile-friendly sidebar containing four tabs (Feed, Programs, Messages, and Connect). Each tab routes to a placeholder page using React Router.

Authentication uses Firebase. Provide your Firebase config in `src/firebase.ts`. After login, the app sends the user's ID token to the backend.
