import axios from "axios"

const API_KEY = import.meta.env.VITE_ACCUWEATHER_API_KEY


export const getLocationKey = (location) => {
    if (location) {
        const locationReplaceSpaces = location.trim().replace(/\s/g, '%20')
        const URL = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${locationReplaceSpaces}&language=es-CL`
        return axios.get(URL)
    }
}


export const getCurrentConditions = (keyLocation) => {
    if (keyLocation) {
        const URL = `https://dataservice.accuweather.com/currentconditions/v1/${keyLocation}?apikey=${API_KEY}&language=es-CL&details=true`
        return axios.get(URL)
    }
}


export const getGeopositionSearch = (lat, long) => {
    if (lat && long) {
        const URL = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat}%2C%20${long}&language=es-CL`
        return axios.get(URL)
    }
}


export const getDailyForecastFiveDays = (keyLocation) => {
    if (keyLocation) {
        const URL = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${keyLocation}?apikey=${API_KEY}&language=es-CL&metric=true`
        return axios.get(URL)
    }
}