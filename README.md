# 🚗 Performance Car Finder

A React-based web application that allows users to search for performance vehicles based on custom filters like horsepower, drivetrain, engine type, and weight. This project demonstrates frontend filtering logic, API integration with NHTSA (vPIC), and dynamic UI interaction.

---

## 🧰 Features

- 🔍 **Search by Multiple Filters**:
  - Make & Model (from NHTSA API)
  - Drivetrain
  - Vehicle Type
  - Engine Size
  - Minimum Horsepower
  - Minimum & Maximum Weight

- 📦 **Mocked Car Database**:
  - Used for local filtering
  - Easy to expand with real data or API integration

- 🧩 **Dynamic Filtering Logic**:
  - Flexible filters (ANY = wildcard)
  - Combined logic supports multiple conditions

- 📊 **Table-style Result View**:
  - Clearly displays matching cars with full specs

---

## 🛠️ How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/car-finder.git
   cd car-finder
Install dependencies
npm install
Start the development server
npm run dev
Visit the app in your browser:
👉 http://localhost:5173
🧪 Code Overview

/src/App.jsx
This is the main component that contains:

🔄 State Management

Uses useState to manage form inputs like make, model, and performance filters.

🔗 API Integration

Fetches popular vehicle makes from the NHTSA vPIC API.
Fetches models dynamically when a make is selected.
📋 Filtering Logic

Filters a mocked local car dataset based on user-defined search criteria.

const results = carDatabase.filter(car => {
  return (
    (form.make === 'ANY' || car.make.toLowerCase() === form.make.toLowerCase()) &&
    (form.model === 'ANY' || car.model.toLowerCase() === form.model.toLowerCase()) &&
    (form.drivetrain === 'ANY' || car.drivetrain.toLowerCase() === form.drivetrain.toLowerCase()) &&
    (form.vehicleType === 'ANY' || car.vehicleType.toLowerCase() === form.vehicleType.toLowerCase()) &&
    (form.engineSize === 'ANY' || car.engineSize.toLowerCase() === form.engineSize.toLowerCase()) &&
    (!form.horsepower || car.horsepower >= parseInt(form.horsepower)) &&
    (!form.minWeight || car.weight >= parseInt(form.minWeight)) &&
    (!form.maxWeight || car.weight <= parseInt(form.maxWeight))
  );
});
📊 Display

Inputs are labeled and styled consistently.
Results are shown in a clean table for readability.
🧱 Built With

React
Vite
NHTSA vPIC API
HTML5 + CSS3 (inline styling for prototyping)
🚀 Future Ideas

Connect to a real car database (e.g., Edmunds, MarketCheck API)
Add price filtering or 0–60 mph acceleration
Responsive mobile UI
Save favorite vehicles or comparisons
Deploy via GitHub Pages or AWS Amplify
📸 Preview

(Include a screenshot or GIF of the UI once deployed or running locally)
📄 License

MIT — free to use, modify, or build upon.

🤝 Acknowledgments

NHTSA vPIC API for vehicle make/model data
React and Vite teams
All open-source maintainers and UI inspiration


Docker Setup


1. Project Structure and Docker Context
Your project is organized as a monorepo with separate frontend and backend directories, each containing its own Dockerfile. There’s also a root-level docker.compose.yml (should be named docker-compose.yml for standard usage) that orchestrates both services.

2. Backend Dockerfile (backend/Dockerfile)
FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3001
CMD ["node", "index.js"]
What it does:

Base Image: Uses Node.js 18.
WORKDIR: Sets working directory to /app.
COPY package.json ./:* Copies package.json and package-lock.json for dependency installation.
RUN npm install: Installs backend dependencies.
COPY . .: Copies the rest of the backend code.
EXPOSE 3001: Exposes port 3001 for the Express server.
CMD: Starts the backend with node index.js.



3. Frontend Dockerfile (frontend/Dockerfile)
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
What it does:

Multi-stage Build:
Builder Stage: Uses Node.js 18 to install dependencies and build the React app (npm run build), outputting static files to /app/dist.
Nginx Stage: Uses a lightweight Nginx image to serve the static files.
COPY --from=builder: Copies the built static files into the Nginx web root.
COPY nginx config: Uses a custom Nginx config (frontend/nginx/default.conf) to serve the SPA.
EXPOSE 80: Exposes port 80 for HTTP traffic.
CMD: Runs Nginx in the foreground.



4. Nginx Config (frontend/nginx/default.conf)
server {
  listen 80;
  server_name localhost;

  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri /index.html;
  }
}
What it does:

Serves static files from /usr/share/nginx/html.
Uses try_files $uri [index.html](http://_vscodecontentref_/6); to support client-side routing (SPA fallback).




5. Docker Compose (docker.compose.yml)
version: "3.9"
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "3001:3001"
What it does:

frontend:
Builds from frontend using its Dockerfile.
Maps container port 80 (Nginx) to host port 3000.
Depends on the backend service.
backend:
Builds from backend using its Dockerfile.
Maps container port 3001 to host port 3001.



6. How It All Works Together
Build and Start:

Run docker compose up (or docker-compose up if you rename the file).
Docker Compose builds both images and starts both containers.
Backend:

Runs on port 3001 inside the container, exposed to the host on port 3001.
Serves API endpoints (e.g., /api/cars).
Frontend:

React app is built into static files and served by Nginx on port 80 inside the container, mapped to port 3000 on the host.
Nginx serves the SPA and handles client-side routing.
Networking:

Both containers are on the same Docker network, so the frontend can reach the backend using the service name backend (e.g., http://backend:3001 from inside the frontend container).
Note: Your frontend code currently fetches from http://localhost:3001, which works in local dev but should be changed to http://backend:3001 for Dockerized deployments.


7. Summary Table
Service	Dockerfile	Exposed Port	Host Port	Purpose
frontend	frontend/Dockerfile	80	3000	Serves React SPA via Nginx
backend	backend/Dockerfile	3001	3001	Serves Express API




8. Recommendations
Rename docker.compose.yml to docker-compose.yml for standard compatibility.
Update API URLs in your frontend to use http://backend:3001 when running in Docker.
Environment Variables: Consider using environment variables for API endpoints for flexibility.















# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Cloudflare Worker Setup

The project is configured to build the React frontend and serve it alongside the
API through a single Cloudflare Worker. The `wrangler.toml` file triggers the
frontend build step and uploads the resulting `frontend/dist` directory as
static assets. During runtime, the Worker checks if the request targets the `/api`
endpoint. All other paths are handled by `env.ASSETS.fetch`, which serves the
built frontend files.

To run the Worker locally:

```bash
wrangler dev
```

This will build the frontend, start the worker, and serve both the API and the
static site at the same address.
