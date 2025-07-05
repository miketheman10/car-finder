export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/cars")) {
      const cars = [
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
        }
      ];
      return new Response(JSON.stringify(cars), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (url.pathname.startsWith("/api/search")) {
      const make = url.searchParams.get("make");
      const year = url.searchParams.get("year"); // optional

      if (!make) {
        return new Response("Missing 'make' query param", { status: 400 });
      }

      // Fetch vehicle models from the NHTSA API
      const apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${make}?format=json`;
      const result = await fetch(apiUrl);
      const data = await result.json();

      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // If the request isn't for the API, try to serve a static asset from the
    // built frontend using the automatically generated ASSETS binding.
    const assetResponse = await env.ASSETS.fetch(request);
    if (assetResponse.status !== 404) {
      return assetResponse;
    }

    return new Response("Not found", { status: 404 });
  },
};
