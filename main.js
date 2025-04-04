const MY_KEY = "W4BMR9F6HRM5N3D7Q888MMFAX";
const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const unitToggleBtn = document.getElementById('unit-toggle');
let isFarenheit = false; 

async function fetchWeatherData(location) { 
    try {
        // Send request
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

const toggleUnits = () => {
    isFarenheit = !isFarenheit;
    updateUnitDisplay();
};

const changeToCelcius = (fahrenheit) => {
    return Math.round((fahrenheit - 32) * 5/9);
}

const filterCurrentWeatherData = (data) => {
    const current = data.currentConditions;
    const today = data.days[0]; 

    // Get F
    let temperature = current?.temp || today.temp;
    let min = today.tempmin;
    let max = today.tempmax;
    
    // Conditionally change to C 
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

    // Get F
    let date = today.datetime;
    let min = today.tempmin;
    let max = today.tempmax;

    // Conditionally change to C 
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

async function processWeather(location) { 
    try {
        // Get data
        const requestResponse = await fetchWeatherData(location);

        // Filter and display
        const currentData = filterCurrentWeatherData(requestResponse);
        displayCurrentData(currentData);
        displayWeeklyData(requestResponse);

    } catch (error) {
        console.log(error);
    }

};

function handleSearch(event) {
    if (event.key !== 'Enter') return;
    
    const input = event.target;
    const location = input.value.trim();
    if (!location) return;
    
    processWeather(location)
        .then(success => {
            if (success) input.value = '';
        })
        .finally(() => {
            input.disabled = false;
            input.placeholder = originalPlaceholder;
        });
}

// -------------------------------------------------------------------

function displayCurrentData(data) {
    if (!data) return;
    
    // Location
    document.getElementById("location-name").textContent = data.location;
    // Date
    document.querySelector(".current-date").textContent = new Date(data.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
    // Condition
    document.querySelector(".current-condition").textContent = data.condition;
    // Current temp
    document.querySelector(".current-temperature").textContent = `${data.temperature}°${isFarenheit ? 'F' : 'C'}`;
    // Min
    document.querySelector(".current-min").textContent = `${data.min}°`;
    // Max
    document.querySelector(".current-max").textContent = `${data.max}°`;
    // Humidity
    document.querySelector(".current-humidity").textContent = `${data.humidity}%`;
    // Precipitation
    document.querySelector(".current-precipitation").textContent = `${data.precipitation}%`;
}

const displayWeeklyData = (data) => {
    if (!data?.days) return;

    // Get container
    const container = document.getElementById("weekly-forecast-container");
    
    // Clear container without removing header
    while (container.children.length > 1) {
        container.removeChild(container.lastChild);
    }

    // Create and display rows for the next 7 days
    for (let day = 1; day <= 7; day++) {
        const dayData = filterWeeklyWeatherData(data, day);
        if (!dayData) continue; 
        const newForecastCard = createForecastRowHTML(dayData);
        container.append(newForecastCard);
    }
};

function createForecastRowHTML(dayData) {
    // Row
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
    
    // Append 
    forecastRow.append(forecastDate, forecastMin, forecastMax);
    
    return forecastRow;
}

function updateUnitDisplay() {
    unitToggleBtn.textContent = `°${isFarenheit ? 'F' : 'C'}`;
}

// --------------------------------------------------------------------

processWeather("New York");
unitToggleBtn.addEventListener('click', toggleUnits);
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keypress', handleSearch);
updateUnitDisplay();

