const searchButton = document.querySelector(".search button");
const h1 = document.querySelector(".h1");
const wind_dir = document.querySelector(".wind_dir");
const bottomBar = document.querySelector(".buttombar");

const showData = async () => {
    const weatherIcon = document.querySelector(".weather-icon");
    const humidity = document.querySelector(".buttoncontent .humidity");
    const wind = document.querySelector(".buttoncontent .wind");
    const city = document.querySelector(".city");
    const img = document.querySelector(".img");
    const degree = document.querySelector(".degree");
    const searchValue = document.querySelector("#searchv").value;
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${searchValue}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '90edfa1cbdmsh5b6d13f0420089ap13a77ejsn971c4a63d532',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (response.ok) {
            bottomBar.classList.remove("buttombar");
            bottomBar.classList.add("buttombar1");

            if (result && result.current) {
                degree.textContent = result.current.temp_c + "°C";
                wind_dir.textContent = `wind_direction: ${result.current.wind_dir}`;
                // wind.textContent = ` wind_kph ${result.current.wind_kph} km/h`;
                wind.innerHTML = `<div id="t6"> <img id="weatherIconsss" src="https://uxwing.com/wp-content/themes/uxwing/download/weather/wind-icon.png">  <p> KPH  ${result.current.wind_kph} km/h</p> </div>`; 
                city.textContent = result.location.name + ` (${result.location.country})`;
                humidity.innerHTML = `<div id="t5"> <img id="weatherIconss" src="https://ssl.gstatic.com/onebox/weather/64/fog.png">  <p> Humidity  ${result.current.humidity}%</p> </div>`; // Update humidity textContent
                console.log(result);
                console.log(result.current.humidity);


                // Set weather icon
                if (result.current.condition && result.current.condition.icon) {
                    weatherIcon.src = result.current.condition.icon;
                    weatherIcon.alt = result.current.condition.text;
                }// Optional: Set alt attribute with weather condition text

            } else {
                // Handle case when 'result' or 'result.current' is undefined
                console.error("Invalid API response or data not available.");
            }
        } else {
            // Handle non-successful response
            console.error("Failed to fetch weather data. Please try again later.");
        }
    } catch (error) {
        // Handle fetch or other errors
        console.error(error);
    }
};

searchButton.addEventListener("click", showData);
