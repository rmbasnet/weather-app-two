import { useEffect, useRef, useState } from "react";

function WeatherCard() {
    const inputRef = useRef()

    const [weatherData, setWeatherData] = useState(false)

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();

            console.log(data)

            setWeatherData({
                city: data.name,
                temperature: Math.floor(data.main.temp),
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
            })


        } catch (error) {

        }
    }

    useEffect(() => {
        search("London");
    },[])

    return (
        <div className="card">
            <div className="searchBar">
                <input type="text" placeholder="Search City" ref={inputRef} />
                <button onClick={() => { search(inputRef.current.value) }}>Search</button>
            </div>
            <p className="cityName">
                {weatherData.city}
            </p>
            <div className="weatherDetails">
                <p>Temperature: {weatherData.temperature} degrees</p>
                <p>Humidity: {weatherData.humidity}%</p>
                <p>Wind: {weatherData.windSpeed} km/h</p>
            </div>
        </div>
    )
}

export default WeatherCard