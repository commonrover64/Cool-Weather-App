import './style.css'

document.querySelector('#app').innerHTML = `
   <div class="scene" >

        <!-- static scene layers  -->        
        <div class="sky skyDay"></div>
        <div class="ocean oceanDay">
            <!-- <div class="waves"></div> -->
        </div>       

        <div class="sun layer3"></div>
        <div class="moon layer3" hidden></div>

        <div class="cloudContainer layer2 noClouds">
            <!-- <div class="cloud layer2"></div> -->
        </div>
        
        <!-- weather components -->
        <div class="weather-components layer4">
            <div class="sunny"></div>
            <div class="cloudy"></div>
            <div class="windy"></div>
            <div class="rain"></div>
        </div>

        <!-- stars -->
         <!-- notCreated class = stars not created in website (just used as a flag lol) -->
         <div class="stars-container layer2 notCreated" hidden>
        </div>

        <!-- main weather ui -->
        <form class="glass-container layer6">
            <span class="title"><b>Weather App</b></span>
            <input type="text" class="searchBar" placeholder="Search for a Location">
            <button class="searchBtn">Search</button>

            <!-- Weather infos -->
            <h2 class="cityField"></h2>
            <p class="temperature"><img src="" class="weatherEmoji"></p>
            <p class="weatherCondition"></p>    
            
        </form>
        

    </div>
`

async function getWeather(city) {
    const apiKey = import.meta.env.VITE_API_KEY;
    
    try {
        // hittin the server
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
        const val = await fetch(url)
        const data = await val.json()

        // get field to update them
        const cityField = document.querySelector(".cityField")
        const temperatureField = document.querySelector(".temperature")
        const weatherField = document.querySelector(".weatherCondition")
    
        // update them with data
        cityField.innerHTML = data.location.name
        temperatureField.innerHTML = data.current.temp_c + " ° C"
        weatherField.innerHTML = data.current.condition.text
        
        // gets current timeData in date and time array
        const currDateAndTime = data.location.localtime.split(" ")
        // Array [ "2025-08-10", "22:00" ]
        
        // calculate if it's day / night and set css accordingly
        const hour = parseInt(currDateAndTime[1].split(':')[0], 10)
        setValues(hour, data.current.is_day)

        // scatter clouds according to the weather conditon
        scatterClouds(data)


    }catch(err) {
        console.log(err)
    }
}

// call api after getting inp from user
const submitBtn = document.querySelector(".searchBtn")
submitBtn.addEventListener('click', function(event) {
    
    const searchField = document.querySelector(".searchBar")
    const city = searchField.value;

    event.preventDefault()
    getWeather(city)
})

function setValues(hour, day) {

    const sky = document.querySelector(".sky")
    const ocean = document.querySelector(".ocean")
    const sun = document.querySelector(".sun")
    const moon = document.querySelector(".moon")
    const starsContainer = document.querySelector(".stars-container")
    
    if(day == 1) {
        // adding day theme before removing night theme 
        sky.classList.add('skyDay')
        ocean.classList.add('oceanDay')
        sun.hidden = false
        
        // remove night theme
        moon.hidden = true
        starsContainer.hidden = true
        sky.classList.remove('skyNight')
        ocean.classList.remove('oceanNight')
        
        // set sun according to time
        positionSunOrMoon(hour, sun)
    }else {
        // add night theme
        moon.hidden = false
        starsContainer.hidden = false 
        scatterStars(starsContainer)
        sky.classList.add('skyNight')
        ocean.classList.add('oceanNight')
        
        // remove night theme
        sun.hidden = true
        sky.classList.remove('skyDay')
        ocean.classList.remove('oceanDay')

        // set moon according to time
        positionSunOrMoon(hour, moon)
    }
}

function positionSunOrMoon(hour, planet) {
    
    let normalizedHr = hour / 24
    
    // horizontal arc using sine
    const x = Math.sin(normalizedHr * Math.PI * 2) * 40 + 50; // stays 10–90%
    planet.style.left = `${x}%`;
}

function scatterStars(starContainer) {

    // if stars are not created then only add new stars, else whenever
    // we search for new place, it keeps on adding new stars

    if(starContainer.classList.contains("notCreated")) { 
        for(let i=0; i<=505; i++) {
            const star = document.createElement("div")
            star.classList.add("stars")
    
            star.style.top = Math.random() * 100 + '%'
            star.style.left = Math.random() * 100 + '%'
            star.style.animationDelay = Math.random() * 10 + 's' // assigns random delay to stars for good twinkle effect
    
            starContainer.appendChild(star)
        }
        starContainer.classList.remove("notCreated")
    }
}

function scatterClouds(data) {

    const cloudContainer = document.querySelector(".cloudContainer")
    // feature to add clouds according to weather conditon
    // const condition = data.current.condition.text
    // console.log(condition)Partly cloudy
    // console.log(data)

    if(cloudContainer.classList.contains("noClouds")) {
        for(let i=0; i<13; i++) {
        
            const cloud = document.createElement("div")
            cloud.classList.add("cloud", "layer2")
        
            cloud.style.top = Math.random() * 50 + 10 + '%'; // clouds between 10% and 60% of sky
            cloud.style.left = Math.random() * 100 + '%'; // anywhere horizontally
            cloud.style.animationDuration = 20 + Math.random() * 40 + "s";  // random seconds like some will take 20s, 30 to cross

            cloudContainer.appendChild(cloud)
        
        }
        cloudContainer.classList.remove("noClouds")
    }
}

