export default function updateDom(data) {
  const cityField = document.querySelector(".cityField");
  const countryField = document.querySelector(".countryField");
  const temperatureField = document.querySelector(".temperature");
  const weatherField = document.querySelector(".weatherCondition");

  cityField.innerHTML = data.location.name;
  countryField.innerHTML = data.location.country;
  temperatureField.innerHTML = data.current.temp_c + " ° C";
  weatherField.innerHTML = data.current.condition.text;

  const currDateAndTime = data.location.localtime.split(" ");
  const [hh, mm] = currDateAndTime[1].split(":").map(Number);

  const hour = hh + mm / 60;
  setWeatherTheme(hour, data);

  scatterClouds(data);
  setWeatherEffects(data);
}

function setWeatherTheme(hour, data) {
  const condition = data.current.condition.text.toLowerCase();
  const isDay = data.current.is_day;

  const backgrounds = {
    day: { sky: document.querySelector(".skyDay"), ocean: document.querySelector(".oceanDay") },
    night: { sky: document.querySelector(".skyNight"), ocean: document.querySelector(".oceanNight") },
    rainDay: { sky: document.querySelector(".skyRainDay"), ocean: document.querySelector(".oceanRainDay") },
    rainNight: { sky: document.querySelector(".skyRainNight"), ocean: document.querySelector(".oceanRainNight") },
    snowDay: { sky: document.querySelector(".skySnowDay"), ocean: document.querySelector(".oceanSnowDay") },
    snowNight: { sky: document.querySelector(".skySnowNight"), ocean: document.querySelector(".oceanSnowNight") },
    cloudyDay: { sky: document.querySelector(".skyCloudyDay"), ocean: document.querySelector(".oceanCloudyDay") },
    cloudyNight: { sky: document.querySelector(".skyCloudyNight"), ocean: document.querySelector(".oceanCloudyNight") }
  };

  const sun = document.querySelector(".sun");
  const moon = document.querySelector(".moon");
  const starsContainer = document.querySelector(".stars-container");

  // Determine theme
  let theme = isDay ? 'day' : 'night';

  if (condition.includes("rain") || condition.includes("drizzle") || condition.includes("storm") || condition.includes("thunder") || condition.includes("shower")) {
    theme = isDay ? 'rainDay' : 'rainNight';
  } else if (condition.includes("snow") || condition.includes("blizzard") || condition.includes("sleet") || condition.includes("ice")) {
    theme = isDay ? 'snowDay' : 'snowNight';
  } else if (condition.includes("overcast") || condition.includes("mist") || condition.includes("fog") || condition.includes("partly cloudy") || condition.includes("haze") || condition.includes("smoke")) {
    theme = isDay ? 'cloudyDay' : 'cloudyNight';
  }

  // Apply theme (optimized to prevent flickering)

  Object.keys(backgrounds).forEach(key => {
    if (key === theme) {
      if (!backgrounds[key].sky.classList.contains("visible")) {
        backgrounds[key].sky.classList.add("visible");
        backgrounds[key].ocean.classList.add("visible");
      }
    } else {
      backgrounds[key].sky.classList.remove("visible");
      backgrounds[key].ocean.classList.remove("visible");
    }
  });

  // Handle celestial bodies
  sun.classList.remove("visible");
  moon.classList.remove("visible");
  starsContainer.hidden = true;

  if (theme === 'day' || theme.includes('Day')) {
    sun.classList.add("visible");
    positionSunOrMoon(hour, sun);
  } else if (theme === 'night' || theme.includes('Night')) {
    moon.classList.add("visible");
    starsContainer.hidden = false;
    scatterStars(starsContainer);
    positionSunOrMoon(hour, moon);
  }
}

function positionSunOrMoon(hour, planet) {
  let progress;

  if (planet.classList.contains("sun")) {
    // Sun: 6 → 18
    if (hour < 6) hour = 6;
    if (hour > 18) hour = 18;
    progress = (hour - 6) / 12; // 0..1
  } else {
    // Moon: 18 → 6
    if (hour >= 18) {
      progress = (hour - 18) / 12; // 18 → 24 => 0..0.5
    } else {
      progress = (hour + 6) / 12; // 0 → 6 => 0.5..1
    }
  }

  // Horizontal: linear left → right
  const x = progress * 100;

  // Vertical: semi-ellipse (rise then set)
  const amplitude = 30; // max height in %
  const y = 50 - amplitude * Math.sin(Math.PI * progress);

  planet.style.left = `${x}%`;
  planet.style.top = `${y}%`;
}

function scatterStars(starContainer) {
  if (starContainer.classList.contains("notCreated")) {
    for (let i = 0; i <= 505; i++) {
      const star = document.createElement("div");
      star.classList.add("stars");

      star.style.top = Math.random() * 100 + "%";
      star.style.left = Math.random() * 100 + "%";
      star.style.animationDelay = Math.random() * 10 + "s"; // assigns random delay to stars for good twinkle effect

      starContainer.appendChild(star);
    }
    starContainer.classList.remove("notCreated");
  }
}

function scatterClouds(data) {
  const cloudContainer = document.querySelector(".cloudContainer");

  if (cloudContainer.classList.contains("noClouds")) {
    for (let i = 0; i < 13; i++) {
      const cloud = document.createElement("div");
      cloud.classList.add("cloud", "layer2");

      cloud.style.top = Math.random() * 50 + "%"; // clouds between 0% and 60% of sky
      cloud.style.left = Math.random() * 100 + "%"; // anywhere horizontally
      cloud.style.animationDuration = 20 + Math.random() * 40 + "s"; // random seconds like some will take 20s, 30 to cross

      cloudContainer.appendChild(cloud);
    }

    cloudContainer.classList.remove("noClouds");
  }

  // Update cloud style based on weather
  const clouds = cloudContainer.querySelectorAll(".cloud");
  clouds.forEach(cloud => {
    if (condition.includes("rain") || condition.includes("storm") || condition.includes("thunder")) {
      cloud.classList.add("dark");
    } else {
      cloud.classList.remove("dark");
    }
  });
}

function setWeatherEffects(data) {
  const weatherComponents = document.querySelector(".weather-components");
  const condition = data.current.condition.text.toLowerCase();

  // Clear existing rain/snow with fade out
  const existingRain = weatherComponents.querySelectorAll(".rain");
  const existingSnow = weatherComponents.querySelectorAll(".snow");

  existingRain.forEach((el) => {
    el.classList.add("fading-out");
    setTimeout(() => el.remove(), 500);
  });
  existingSnow.forEach((el) => {
    el.classList.add("fading-out");
    setTimeout(() => el.remove(), 500);
  });

  if (condition.includes("rain") || condition.includes("drizzle") || condition.includes("shower")) {
    for (let i = 0; i < 100; i++) {
      const rain = document.createElement("div");
      rain.classList.add("rain");
      rain.style.left = Math.random() * 100 + "%";
      rain.style.animationDuration = 0.5 + Math.random() * 0.5 + "s";
      rain.style.animationDelay = Math.random() * 2 + "s";
      rain.style.opacity = 0; // Start invisible
      weatherComponents.appendChild(rain);
      // Trigger reflow to enable transition
      void rain.offsetWidth;
      rain.style.opacity = 1; // Fade in (handled by CSS animation keyframes mostly, but good for base state)
    }
  } else if (condition.includes("snow") || condition.includes("blizzard") || condition.includes("sleet")) {
    for (let i = 0; i < 50; i++) {
      const snow = document.createElement("div");
      snow.classList.add("snow");
      snow.style.left = Math.random() * 100 + "%";
      snow.style.animationDuration = 2 + Math.random() * 3 + "s";
      snow.style.animationDelay = Math.random() * 2 + "s";
      snow.style.opacity = 0;
      weatherComponents.appendChild(snow);
      void snow.offsetWidth;
      snow.style.opacity = 1;
    }
  }
}
