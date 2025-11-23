export default async function getWeather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=${city}&aqi=no`;

  try {
    // hittin the server
    const val = await fetch(url);
    const data = await val.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}
