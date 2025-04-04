// ---------------------------------------------------------------------------------------
// ------------------------------ Functionality ------------------------------------------
// ---------------------------------------------------------------------------------------
const MY_KEY = "W4BMR9F6HRM5N3D7Q888MMFAX";
const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
let searchLocation = "Guadalajara";
let isFarenheit = true; 

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
//     let temperature = unfilteredData.days[0].temp;
//     let min = unfilteredData.days[0].tempmin;
//     let max = unfilteredData.days[0].tempmax;
//     const humidity = unfilteredData.days[0].humidity;
//     const precipitation = unfilteredData.precipprob;

//     if isFarenheit = false { 
//       temperature = changeToCelcius(temperature);
//       min = changeToCelcius(min);
//       max = changeToCelcius(max);
//     }

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

// if isFarenheit = false { 
//     const min = changeToCelcius(min);
//     const max = changeToCelcius(max);
// }

//     return {
//         date,
//         min,
//         max
//     }
// };

// const toggleUnits = () => {
//     isFarenheit ? false : true;
// };

// const changeToCelcius = (temp) => {
//     return (Number(temp) - 32) * (5/9); 
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
