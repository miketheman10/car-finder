// CommonJS style — no "type": "module" needed
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Sample API route
app.get('/api/cars', (req, res) => {
  res.json([
    {
      make: 'Toyota',
      model: 'Corolla',
      horsepower: 139,
      engineSize: '1.8L',
      drivetrain: 'FWD',
      vehicleType: 'Sedan',
      weight: 2900
    },
    {
      make: 'Ford',
      model: 'Mustang',
      horsepower: 450,
      engineSize: '5.0L',
      drivetrain: 'RWD',
      vehicleType: 'Coupe',
      weight: 3700
    },
    // ... more cars
  ]);
});


// Health check
app.get('/api/health', (req, res) => {
  res.send('Server is up and running');
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running at http://localhost:${PORT}`);
});
