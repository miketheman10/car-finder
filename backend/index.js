export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

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

    return new Response("Not found", { status: 404 });
  },
};
