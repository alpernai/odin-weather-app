const MY_KEY = "W4BMR9F6HRM5N3D7Q888MMFAX";
const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
let isFarenheit = true; 

async function fetchWeatherData(location) { 
    try {
        // Request
        const response = await fetch(`${BASE_URL}/${location}?key=${MY_KEY}&include=days,current`);

        if (!response.ok) {
            throw new Error(`HTTP Error. Status: ${response.status}`);
        }
        
        // Format response
        const weatherData = await response.json();
        return weatherData;

    } catch (error) { 
        console.error("Fetch error:", error);
        return null;
    }
};

const filterCurrentWeatherData = (data) => {
    const current = data.currentConditions;
    const today = data.days[0]; 

    let temperature = current?.temp || today.temp;
    let min = today.tempmin;
    let max = today.tempmax;

    if (!isFarenheit) { 
      temperature = changeToCelcius(temperature);
      min = changeToCelcius(min);
      max = changeToCelcius(max);
    }

    return {
        location: data.resolvedAddress || data.address,
        date: today.datetime,
        condition: current?.conditions || today.conditions,
        temperature,
        min, 
        max,
        humidity: current?.humidity || today.humidity,
        precipitation: current?.precipprob || today.precipprob,
    };
};

const filterWeeklyWeatherData = (data, day) => {
    const today = data.days[day]; 

    let date = today.datetime;
    let min = today.tempmin;
    let max = today.tempmax;

    if (!isFarenheit) { 
        min = changeToCelcius(min);
        max = changeToCelcius(max);
    }

    return {
        date,
        min,
        max
    }
};

// const toggleUnits = () => {
//     isFarenheit ? false : true;
// };

function changeToCelcius(fahrenheit) {
    return Math.round((fahrenheit - 32) * 5/9);
}

// -------------------------------------------------------------------

function displayCurrentData(data) {
    if (!data) return;
    
    document.getElementById("location-name").textContent = data.location;
    document.querySelector(".current-date").textContent = new Date(data.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
    document.querySelector(".current-condition").textContent = data.condition;
    document.querySelector(".current-temperature").textContent = `${data.temperature}°${isFarenheit ? 'F' : 'C'}`;
    document.querySelector(".current-min").textContent = `${data.min}°`;
    document.querySelector(".current-max").textContent = `${data.max}°`;
    document.querySelector(".current-humidity").textContent = `${data.humidity}%`;
    document.querySelector(".current-precipitation").textContent = `${data.precipitation}%`;
}

const displayWeeklyData = (data) => {
    if (!data?.days) return;

    const container = document.getElementById("weekly-forecast-container");
    
    // Clear without removing header
    while (container.children.length > 1) {
        container.removeChild(container.lastChild);
    }

    // Create rows for the next 7 days
    for (let day = 1; day <= 7; day++) {
        const dayData = filterWeeklyWeatherData(data, day);
        if (!dayData) continue; 
        const newForecastCard = createForecastRowHTML(dayData);
        container.append(newForecastCard);
    }
};

function createForecastRowHTML(dayData) {
    // Container
    const forecastRow = document.createElement('div');
    forecastRow.className = 'forecast-row';
    
    // Date
    const forecastDate = document.createElement('div');
    forecastDate.className = 'forecast-item date';
    forecastDate.textContent = new Date(dayData.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
    
    // Min 
    const forecastMin = document.createElement('div');
    forecastMin.className = 'forecast-item min-temp';
    forecastMin.textContent = `${Math.round(dayData.min)}°`;
    
    // Max 
    const forecastMax = document.createElement('div');
    forecastMax.className = 'forecast-item max-temp';
    forecastMax.textContent = `${Math.round(dayData.max)}°`;
    
    // Append all
    forecastRow.append(forecastDate, forecastMin, forecastMax);
    
    return forecastRow;
}

// const handleSearch = (event) => {
    // const searchInput = document.getElementById('search-input');
    // IF search input is not empty && submit is true (or click enter? TBD)
    // THEN, searchLocation = searchInput
    // const weatherData = await fetchWeatherData(searchLocation, MY_KEY);
    // IF (weatherData)
    // THEN 
    //  + displayCurrentData(weatherData)
    //  + dispalyWeeklyData(weatherData)
// };

// const handleUnitsButton = (event) => {
// toggleUnits();
// };

// --------------------------------------------------------------------

async function processWeather(location) { 
    try {
        const requestResponse = await fetchWeatherData(location);
        console.log(requestResponse);

        const currentData = filterCurrentWeatherData(requestResponse);
        console.log(currentData); 
        displayCurrentData(currentData);
        displayWeeklyData(requestResponse);

    } catch (error) {
        console.log(error);
    }

};

processWeather("New York");