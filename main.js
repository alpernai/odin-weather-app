// const card = document.getElementsByClassName('forecast-card');
// const city = document.getElementById('city');
// const region = document.getElementById('region');
// const temperature = document.getElementById('temperature');
// const condition = document.getElementById('condition');
// const precipitation = document.getElementById('precipitation');
// const humidity = document.getElementById('humidity'); 

async function fetchForecastData(location) {
    try {
        const request = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=231c803a1653407baf8161732251403&q=${location}&aqi=no`);
        
        if (request.status === 200) {
            const data = await request.json();
            console.log(data);
        } else {
            throw new Error(`Error: ${request.status} - Unable to fetch weather data`);
        }
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
    }
};


fetchForecastData("Guadalajara");