import { useState, useEffect } from 'react';

const popularMakes = [
  "Acura", "Alfa Romeo", "AM General", "AMC", "Aston Martin", "Audi", "Austin", "Austin-Healey",
  "Bentley", "BMW", "Bricklin", "Bugatti", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Citroen",
  "Cord", "Daihatsu", "Datsun", "De Tomaso", "DeLorean", "DeSoto", "Dodge", "Eagle", "Edsel",
  "Excalibur", "Ferrari", "FIAT", "Fisker", "Ford", "Freightliner", "Genesis", "Geo", "GMC", "Honda",
  "Hudson", "Hummer", "Hupmobile", "Hyundai", "Ineos", "INFINITI", "Intermeccanica",
  "International Harvester", "Isuzu", "Jaguar", "Jeep", "Karma", "Kia", "Koenigsegg", "Lada",
  "Lamborghini", "Lancia", "Land Rover", "Lexus", "Lincoln", "Lotus", "Lucid", "Maserati", "Maybach",
  "Mazda", "McLaren", "Mercedes-Benz", "Mercury", "MG", "MINI", "Mitsubishi", "Morris", "Nash",
  "Nissan", "Oldsmobile", "Opel", "Packard", "Pagani", "Pininfarina", "Plymouth", "Polestar",
  "Pontiac", "Porsche", "RAM", "Renault", "REO", "Rivian", "Rolls-Royce", "Saab", "Saturn", "Scion",
  "Shelby", "smart", "SSC", "Studebaker", "Subaru", "Sunbeam", "Suzuki", "Tesla", "Toyota", "Triumph",
  "VinFast", "Volkswagen", "Volvo", "VPG", "Willys", "Yugo"
];


const carDatabase = [
  { make: 'Toyota', model: 'Corolla', horsepower: 139, engineSize: '1.8L', drivetrain: 'FWD', vehicleType: 'Sedan', weight: 2900 },
  { make: 'Ford', model: 'Mustang', horsepower: 450, engineSize: '5.0L', drivetrain: 'RWD', vehicleType: 'Coupe', weight: 3700 },
  { make: 'Honda', model: 'Civic', horsepower: 158, engineSize: '2.0L', drivetrain: 'FWD', vehicleType: 'Sedan', weight: 2800 },
  { make: 'Tesla', model: 'Model 3', horsepower: 283, engineSize: 'Electric', drivetrain: 'RWD', vehicleType: 'Sedan', weight: 3550 },
  { make: 'Subaru', model: 'Impreza', horsepower: 152, engineSize: '2.0L', drivetrain: 'AWD', vehicleType: 'Hatchback', weight: 3100 }
];

function App() {
  const [form, setForm] = useState({
    make: 'ANY',
    model: 'ANY',
    drivetrain: 'ANY',
    vehicleType: 'ANY',
    engineSize: 'ANY',
    horsepower: '',
    minWeight: '',
    maxWeight: ''
  });

  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isLoadingMakes, setIsLoadingMakes] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(false);

  useEffect(() => {
    setIsLoadingMakes(true);
    fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json')
      .then(res => res.json())
      .then(data => {
        const filtered = data.Results
          .map(m => m.Make_Name)
          .filter(name =>
            popularMakes.map(m => m.toLowerCase()).includes(name.toLowerCase())
          )
          .filter((val, idx, arr) => arr.indexOf(val) === idx)
          .sort();
        setMakes(filtered);
      })
      .finally(() => setIsLoadingMakes(false));
  }, []);

  useEffect(() => {
    if (form.make !== 'ANY') {
      setIsLoadingModels(true);
      fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${form.make}?format=json`)
        .then(res => res.json())
        .then(data => {
          const filtered = data.Results
            .map(model => model.Model_Name)
            .filter((val, idx, arr) => arr.indexOf(val) === idx)
            .sort();
          setModels(filtered);
        })
        .finally(() => setIsLoadingModels(false));
    } else {
      setModels([]);
    }
  }, [form.make]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
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

    setFilteredResults(results);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', fontSize: '16px', lineHeight: '1.6' }}>
      <h1 style={{ marginBottom: '1rem' }}>Performance Car Finder</h1>

      <div style={{ display: 'grid', gap: '1rem', maxWidth: '500px' }}>

        {[
          { label: 'Make', name: 'make', listId: 'make-list', options: makes },
          { label: 'Model', name: 'model', listId: 'model-list', options: models },
          {
            label: 'Drivetrain', name: 'drivetrain', listId: 'drivetrain-list',
            options: ['FWD', 'RWD', 'AWD']
          },
          {
            label: 'Vehicle Type', name: 'vehicleType', listId: 'vehicletype-list',
            options: ['Sedan', 'Coupe', 'Hatchback', 'Convertible', 'SUV']
          },
          {
            label: 'Engine Size', name: 'engineSize', listId: 'enginesize-list',
            options: ['1.8L', '2.0L', '5.0L', 'Electric']
          }
        ].map((field, idx) => (
          <div key={idx}>
            <label>{field.label}</label>
            <input
              list={field.listId}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', fontSize: '1rem' }}
            />
            <datalist id={field.listId}>
              <option value="ANY" />
              {field.options.map((opt, i) => (
                <option key={i} value={opt} />
              ))}
            </datalist>
          </div>
        ))}

        <div>
          <label>Minimum Horsepower</label>
          <input
            type="number"
            name="horsepower"
            value={form.horsepower}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', fontSize: '1rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label>Min Weight (lbs)</label>
            <input
              type="number"
              name="minWeight"
              value={form.minWeight}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', fontSize: '1rem' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>Max Weight (lbs)</label>
            <input
              type="number"
              name="maxWeight"
              value={form.maxWeight}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', fontSize: '1rem' }}
            />
          </div>
        </div>

        <button onClick={handleSearch} style={{
          padding: '10px 20px',
          fontSize: '1rem',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Search Cars
        </button>
      </div>

      {/* Results */}
      <div style={{ marginTop: '2rem' }}>
        <h3>Matching Vehicles:</h3>
        {filteredResults.length > 0 ? (
          <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', marginTop: '1rem', width: '100%' }}>
            <thead style={{ backgroundColor: '#f0f0f0' }}>
              <tr>
                <th>Make</th>
                <th>Model</th>
                <th>HP</th>
                <th>Drivetrain</th>
                <th>Type</th>
                <th>Engine</th>
                <th>Weight (lbs)</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((car, index) => (
                <tr key={index}>
                  <td>{car.make}</td>
                  <td>{car.model}</td>
                  <td>{car.horsepower}</td>
                  <td>{car.drivetrain}</td>
                  <td>{car.vehicleType}</td>
                  <td>{car.engineSize}</td>
                  <td>{car.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
