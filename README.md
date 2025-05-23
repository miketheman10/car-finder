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

















# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
