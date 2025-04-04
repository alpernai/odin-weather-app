// ---------------------------------------------------------------------------------------
// ------------------------------ Functionality ------------------------------------------
// ---------------------------------------------------------------------------------------
const MY_KEY = "W4BMR9F6HRM5N3D7Q888MMFAX";
const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
let searchLocation = "Guadalajara";

async function fetchWeatherData(location, key) {
    try {
        const response = await fetch(`${BASE_URL}/${searchLocation}?key=${MY_KEY}&include=days,current`);

        if (!response.ok) {
            throw new Error (`HTTP Error. Status: ${response.status}`)
        }
    
        const weatherData = await response.json();
        console.log(weatherData);
        return weatherData;

    } catch {
        console.error("Fetch error: ", error);
        return null;
    }
};

const weatherData = fetchWeatherData(searchLocation, MY_KEY);

// const filterCurrentWeatherData = (data) => {
//     const unfilteredData = data;
//     const location = unfilteredData.address;
//     const date = unfilteredData.days[0].datetime;
//     const condition = unfilteredData.conditions;
//     const temperature = unfilteredData.days[0].temp;
//     const min = unfilteredData.days[0].tempmin;
//     const max = unfilteredData.days[0].tempmax;
//     const humidity = unfilteredData.days[0].humidity;
//     const precipitation = unfilteredData.precipprob;

//     return {
//         location,
//         date,
//         condition,
//         temperature,
//         min,
//         max,
//         humidity,
//         precipitation
//     }
// };

// const filterWeeklyWeatherData = (day) => {
//     const date = unfilteredData.days[0].datetime;
//     const min = unfilteredData.days[i].tempmin;
//     const max = unfilteredData.days[i].tempmax;

//     return {
//         date,
//         min,
//         max
//     }
// };




// ---------------------------------------------------------------------------------------
// ----------------------------------- Display -------------------------------------------
// ---------------------------------------------------------------------------------------

// const displayCurrentData = () => {
//     const currentData = filterWeatherData();
//     document.querySelector(".current-date").textContent=`${currentData.date}`;
//     document.querySelector(".current-condition").textContent=`${currentData.condition}`;
//     document.getElementById("current-temperature").textContent=`${currentData.temperature}`;
//     document.querySelector(".current-min").textContent=`${currentData.min}`;
//     document.querySelector(".current-max").textContent=`${currentData.max}`
//     document.getElementById("humidity-percentage").textContent=`${currentData.humidity}`;
//     document.querySelector(".current-precipitation").textContent=`${currentData.precipitation}`;

// };


// const displayWeeklyData = (data) => {
//     const unfilteredData = data;
//     const weeklyForecastContainer = document.getElementById("weekly-forecast-container");
//     for (i = 1; i < 7; i++) {
//         const newForecastCard = createForecastRowHTML();
//         const filteredDateData = filterWeeklyData(i);
//         forecastDate.textValue = filteredDateData.date; 
//         forecastMin.textValue = filteredDateData.min;
//         forecastMax.textValue = filteredDateData.max;
//         weeklyForecastContainer.append(newForecastCard);
//     }
// };

// const createForecastRowHTML = () => {
//     create forecastRow div and add to it the class forecast-row.
//     create forecastDate div and to it the classes forecast-item and date
//     create forecastMin div and to it the classes forecast-item and min-temp
//     create forecastMax div and to it the classes forecast-item and min-temp
//     append forecastDate, forecastMin and forecastMax into forecastRow
//     return forecastRow
// };




