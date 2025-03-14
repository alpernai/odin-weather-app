async function fetchWeatherData(location) {
    try {
        const request = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=231c803a1653407baf8161732251403&q=${location}&days=7&aqi=no`);
        
        if (request.status === 200) {
            const response = await request.json();
            console.log(response);  
            return response; 
        } else {
            throw new Error(`Error: ${request.status} - Unable to fetch weather data`);
        }
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
    }
};

const getCurrentWeather = (data) => {    
    const location = data.location.name;
    const region = data.location.region;

    const date = data.forecast.forecastday[0].date;

    const minTempC = data.forecast.forecastday[0].day.mintemp_c;
    const minTempF = data.forecast.forecastday[0].day.mintemp_f;
    const maxTempC = data.forecast.forecastday[0].day.maxtemp_c;
    const maxTempF = data.forecast.forecastday[0].day.maxtemp_f;
    const conditionIcon = data.current.condition.icon;
    const conditionText = data.current.condition.text; 
    
    const currentTempC = data.current.temp_c;
    const currentTempF = data.current.temp_f;
    const humidity = data.current.humidity;
    const rain = data.forecast.forecastday[0].day.daily_chance_of_rain;

    return {
        location,
        region,
        date,
        minTempC,
        minTempF,
        maxTempC,
        maxTempF,
        conditionIcon,
        conditionText,
        currentTempC,
        currentTempF,
        humidity,
        rain    
    };
};

const showWeather = async () => {
    const data = await fetchWeatherData("Guadalajara"); 
    const currentWeather = getCurrentWeather(data);    
    console.log(currentWeather); 
};


showWeather();
