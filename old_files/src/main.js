import fetchWeather from "./utils/fetchWeather";
import updateDom from "./utils/updateDom";

async function init(city) {
  const submitBtn = document.querySelector(".searchBtn");
  const originalText = submitBtn.innerText;

  try {
    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerText = "Loading...";
    submitBtn.style.cursor = "wait";

    const data = await fetchWeather(city);

    if (data.error) {
      throw new Error(data.error.message);
    }

    //update dom elements
    updateDom(data);
  } catch (err) {
    alert("City not found. Please check & try again.");
    console.error(err);
  } finally {
    // Reset loading state
    submitBtn.disabled = false;
    submitBtn.innerText = originalText;
    submitBtn.style.cursor = "pointer";
  }
}

// call api after getting inp from user
const submitBtn = document.querySelector(".searchBtn");

submitBtn.addEventListener("click", function (event) {
  const searchField = document.querySelector(".searchBar");
  const city = searchField.value.trim();
  init(city);

  event.preventDefault();
});
