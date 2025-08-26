import fetchWeather from "./utils/fetchWeather";
import updateDom from "./utils/updateDom";

async function init(city) {
  try {
    const data = await fetchWeather(city);
    //update dom elements
    updateDom(data);
  } catch (err) {
    throw new Error("Failed to fetch Weather", err);
  }
}

// call api after getting inp from user
const submitBtn = document.querySelector(".searchBtn");

submitBtn.addEventListener("click", function (event) {
  const searchField = document.querySelector(".searchBar");
  const city = searchField.value;

  event.preventDefault();
  init(city);
});
