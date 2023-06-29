async function getGeoData(cityName) {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=2539dc11b80675feb8e8c2823e6546cf&units=metric`)
    if (response.status === 200) {
        const geoResponse = await response.json()
        // console.log(geoResponse)
        if (geoResponse[0]) {
            const lat = geoResponse[0].lat
            const lon = geoResponse[0].lon
            return { lat: lat, lon: lon }
        }
        throw new Error("failed to fetch geoData")
    }
}


function displayWeather(data) {

    // get template
    const mainTemplate = document.getElementById("mainTemplate")
    // clone template content
    const cloneSummaryWeather = mainTemplate.content.cloneNode(true)
    // replace cloned content with actual
    console.log(data)
    cloneSummaryWeather.querySelector(".mainWeather").innerText = "Weather: " + data.weather[0].main
    cloneSummaryWeather.querySelector(".mainWeatherDesc").innerText = "Description: " + data.weather[0].description
    cloneSummaryWeather.querySelector(".weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    cloneSummaryWeather.querySelector(".mainTemp").innerText = (data.main.temp-273.15).toFixed(1)+"°C"
    cloneSummaryWeather.querySelector(".feelsLikeTemp").innerText = "Feels like: "+(data.main.feels_like-273.15).toFixed(2)+"°C"
    cloneSummaryWeather.querySelector(".humidity").innerText = "Humidity: "+(data.main.humidity).toFixed(0)+"%"
    cloneSummaryWeather.querySelector(".windSpeed").innerText = "Wind speed: "+(data.wind.speed).toFixed(2)+" m/s"



    // append replaced data to main
    const mainDiv = document.getElementById("main")
    mainDiv.appendChild(cloneSummaryWeather)




}



async function getWeatherData(cityName) {
    console.log("I called cityname")
    const geoData = await getGeoData(cityName)
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoData.lat}&lon=${geoData.lon}&appid=2539dc11b80675feb8e8c2823e6546cf`)
    if (response.status === 200) {
        const weatherResponse = await response.json()
        return weatherResponse
        // console.log(weatherResponse )
    }
}

async function handleSubmit(event) {
    event.preventDefault()
    // console.log("submit")
    const input = document.querySelector("#cityInput")
    const inputCityName = input.value
    const data = await getWeatherData(inputCityName)
    displayWeather(data)
    // console.log(data)
}

const form = document.querySelector("#myForm")
form.addEventListener("submit", handleSubmit)
// console.log(form)


// getWeatherData("London")