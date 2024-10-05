# Full Stack E-commerce Application

This project consists of a backend API built with Express and MongoDB, and a frontend application built with React and Vite.

## Backend API Documentation

<a href="../Backend/README.md">Backend API Documentation</a>

## Frontend Setup (React + Vite)

The frontend of this application is built using React and Vite, providing a fast and efficient development experience.

### Prerequisites

- Node.js (v14 or later recommended)
- npm (comes with Node.js)

### Installation

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Development

To start the development server with hot-module replacement (HMR):
```
npm run dev
```

This will start the Vite dev server, typically on `http://localhost:5173`.

### Building for Production

To create a production build:
```
npm run build
```

This will generate optimized assets in the `dist` directory.

### Preview Production Build

To preview the production build locally:
```
npm run preview
```

### Linting

To run ESLint:
```
npm run lint
```

## Vite Plugins

This template uses the following official Vite plugins:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md): Uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc): Uses [SWC](https://swc.rs/) for Fast Refresh

You can choose which plugin to use by commenting/uncommenting the respective lines in the `vite.config.js` file.

## Connecting Frontend to Backend

To connect your React frontend to the backend API:

1. Ensure the backend server is running (follow the backend setup instructions).

## Full Stack Development Workflow

1. Start the backend server (in the root directory):
   ```
   npm start
   ```

2. In a new terminal, start the frontend development server (in the frontend directory):
   ```
   npm run dev
   ```

3. You can now develop both frontend and backend simultaneously, with changes reflecting in real-time.

## Deployment

For deploying the full stack application:

1. Deploy the backend to your chosen hosting platform (e.g., Heroku, DigitalOcean).
2. Build the frontend for production:
   ```
   cd frontend
   npm run build
   ```
3. Deploy the contents of the `frontend/dist` directory to a static hosting service (e.g., Netlify, Vercel) or serve it from your backend.
4. Ensure your production backend URL is correctly set in the frontend environment variables before building.

Remember to set up appropriate security measures, such as using HTTPS and securing your API endpoints, for a production environment.