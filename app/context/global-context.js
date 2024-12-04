"use client";

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import DefaultCities from "../utils/default-cities";
import { debounce } from "lodash";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ( { children } ) => {
    const [ forecast, setForecast ] = useState({});
    const [ airQuality, setAirQuality ] = useState({});
    const [ fiveDayForecast, setFiveDayForecast ] = useState({});
    const [ uvIndex, setUvIndex ] = useState({});
    const [ geoCodedList, setGeoCodedList ] = useState(DefaultCities);
    const [ inputValue, setInputValue ] = useState("");
    const [ activeCityCoords, setActiveCityCoords ] = useState([
        -41.28664, 174.77557
    ]);

    const fetchForecast = async (lat, lon) => {
        try {
            const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);
            setForecast(res.data);
        } catch (error) {
            console.log("Error fetching forecast data: ", error.message);
        }
    };
    const fetchAirQuality = async (lat, lon) => {
        try {
            const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
            setAirQuality(res.data);
        } catch (error) {
            console.log("Error fetching air quality data: ", error.message);
        }
    }
    const fetchFiveDayForecast = async (lat, lon) => {
        try {
            const res = await axios.get(`api/fiveday-forecast?lat=${lat}&lon=${lon}`);
            setFiveDayForecast(res.data);
        } catch (error) {
            console.log("Error fetching five day forecast data: ", error.message);
        }
    }

    const fetchUvIndex = async (lat, lon) => {
        try {
            const res = await axios.get(`api/uv-index?lat=${lat}&lon=${lon}`);
            setUvIndex(res.data);
        } catch (error) {
            console.log("Error fetching UV Index data: ", error.message);
        }
    }

    const handleInput = (e) => {
        const value = e.target.value;
        setInputValue(value);
        if (value === "") {
          setGeoCodedList(DefaultCities);
        }
    };

    const fetchGeoCodedList = async (search) => {
        try {
            const res = await axios.get(`api/geocoded-data?search=${search}`);
            setGeoCodedList(res.data);
        } catch (error) {
            console.log("Error fetching geocoded data list: ", error.message);
        }
    }

    useEffect(() => {
        const debouncedFetch = debounce((search) => {
            fetchGeoCodedList(search);
        }, 500);
        if (inputValue) {
            debouncedFetch(inputValue)
        }
        return () => debouncedFetch.cancel();
    }, [inputValue]);

    useEffect(() => {
        fetchForecast(activeCityCoords[0], activeCityCoords[1]);
        fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
        fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
        fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
    }, [activeCityCoords]);
    return (
        <GlobalContext.Provider 
            value={{
                forecast,
                airQuality,
                fiveDayForecast,
                uvIndex,
                geoCodedList,
                inputValue,
            }}
        >
        <GlobalContextUpdate.Provider value={{handleInput, setActiveCityCoords}}>
            {children}
        </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    )
};

export const UseGlobalContext = () => useContext(GlobalContext);
export const UseGlobalContextUpdate = () => useContext(GlobalContextUpdate);