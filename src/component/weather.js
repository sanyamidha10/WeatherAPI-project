import React, { useEffect, useState } from "react";
import "./style.css";
import WeatherCard from "./weatherCard";

const Weather = () => {

    const [searchValue, setSearchValue] = useState("Panipat");
    const [tempInfo, setTempInfo] = useState({});

    const getInfo = async () =>{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=8138df6075cbf52a8353f18d83a672ad`
            
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            const {temp, humidity, pressure} = data.main;
            const { main: weathermood } = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country, sunset} = data.sys;

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };

            setTempInfo(myNewWeatherInfo);

        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() =>{
        getInfo();
    }, []);

    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input
                        type="search"
                        placeholder="search..."
                        autoFocus
                        id="search"
                        className="searchTerm"
                        value={searchValue}
                        onChange={(e)=>setSearchValue(e.target.value)}
                    />

                    <button
                        className="searchButton"
                        type="button" onClick={getInfo}>
                        Search
                    </button>
                </div>
            </div>

            {/* Weathercard */}
            <WeatherCard {...tempInfo}/>

        </>
    )
};

export default Weather;