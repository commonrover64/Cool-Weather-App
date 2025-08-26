export default async function getWeather(city) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  try {
    // hittin the server
    const val = await fetch(url);
    const data = await val.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}
