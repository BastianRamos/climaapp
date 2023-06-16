import axios from "axios"

const API_KEY = import.meta.env.VITE_ACCUWEATHER_API_KEY


export const getLocationKey = (location) => {
    if (location) {
        const locationReplaceSpaces = location.trim().replace(/\s/g, '%20')
        const URL = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?'
        return axios.get(`${URL}apikey=${API_KEY}&q=${locationReplaceSpaces}&languague=es-CL`)
    }
}

export const getCurrentConditions = (keyLocation) => {
    if (keyLocation) {
        const URL = `http://dataservice.accuweather.com/currentconditions/v1/${keyLocation}?`
        return axios.get(`${URL}apikey=${API_KEY}&language=es-CL&details=true`)
    }
}