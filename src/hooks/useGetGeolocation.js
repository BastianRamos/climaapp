import { useEffect, useState } from "react"
import { getCurrentConditions, getDailyForecastFiveDays, getGeopositionSearch } from "../api/accuWeatherApi"
// ANT DESIGN
import { notification } from "antd"
const { useNotification } = notification
const OPTIONS_GEOLOCATION = { enableHighAccuracy: true, maximunAge: 0 }
// ---------------------------------------------------------------------


const useGetGeolocation = () => {

    const [api, contextHolder] = useNotification()
    const [geolocationData, setGeolocationData] = useState(undefined)
    const [currentConditionsGeolocation, setCurrentConditionsGeolocation] = useState(undefined)
    const [dailyForecastGeolocation, setDailyForecastGeolocation] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true)


    const successGeolocation = async (position) => {
        if (position) {
            const cordinates = position.coords
            const respGeoposition = await getGeopositionSearch(cordinates.latitude, cordinates.longitude)

            if (respGeoposition.status === 200) {
                const dataGeoposition = respGeoposition.data

                // Pronóstico detallado de hoy
                const respCurrentConditions = await getCurrentConditions(dataGeoposition?.Key)

                if (respCurrentConditions.status === 200) {
                    const dataCurrentConditions = respCurrentConditions.data[0]
                    setCurrentConditionsGeolocation(dataCurrentConditions)
                    setGeolocationData({
                        key: dataGeoposition?.Key,
                        cityAndCountry: `${dataGeoposition?.LocalizedName}, ${dataGeoposition?.Country.LocalizedName}`
                    })
                } else {
                    api.warning({
                        message: 'Condiciones climáticas actuales falló',
                        description: 'No hemos podido obtener información climática actual de la ciudad mediante el uso de geolocalización.',
                        duration: 60
                    })
                }

                // Pronóstico diario resumido de los 4 días siguientes
                const respDailyForecast = await getDailyForecastFiveDays(dataGeoposition?.Key)

                if (respDailyForecast.status === 200) {
                    const textDailyForecast = respDailyForecast.data?.Headline?.Text
                    const arrayDailyForecast = respDailyForecast.data?.DailyForecasts
                    arrayDailyForecast?.shift()

                    setDailyForecastGeolocation({ headline: textDailyForecast, dailyForecast: arrayDailyForecast })
                } else {
                    api.warning({
                        message: 'Pronóstico diario falló',
                        description: 'No hemos podido obtener información del pronóstico diario de la ciudad mediante el uso de geolocalización.',
                        duration: 60
                    })
                }
            } else {
                api.error({
                    message: 'Búsqueda por geolocalización falló',
                    description: 'No hemos podido obtener información climática de la ciudad mediante el uso de geolocalización.',
                    duration: 60
                })
            }
            setTimeout(() => setIsLoading(false), 2000)
        }
    }


    const errorGeolocation = (error) => {
        if (error) {
            api.warning({
                message: 'Acceso a ubicación denegado',
                description: 'Si desea permitir el acceso active la ubicación y recarge la página.',
                duration: 60
            })
            setTimeout(() => setIsLoading(false), 2000)
        }
    }


    useEffect(() => {
        /*
        Podemos tener 3 estados de geolocalización: 
        - granted: tenemos permiso para acceder a la ubicación para que podamos llamar a la geolocalización directamente.
        - prompt: el usuario obtendrá una ventana emergente solicitando permiso.
        - denied: el usuario ha negado compartir su ubicación.
        */
        if (navigator.geolocation) {
            navigator.permissions.query({
                name: 'geolocation'
            }).then((result) => {
                if (result.state === 'granted' || result.state === 'prompt') {
                    navigator.geolocation.getCurrentPosition(
                        successGeolocation,
                        errorGeolocation,
                        OPTIONS_GEOLOCATION
                    )
                } else if (result.state === 'denied') {
                    api.info({
                        message: 'Acceso a ubicación bloqueado',
                        description: 'Si desea permitir el acceso active la ubicación y recarge la página. Si continúa el problema debe revisar la configuración de su navegador.',
                        duration: 60
                    })
                    setTimeout(() => setIsLoading(false), 2000)
                }
            })
        } else {
            api.info({
                message: 'Navegador no compatible',
                description: 'Este navegador no admite la función de geolocalización.',
                duration: 60
            })
            setTimeout(() => setIsLoading(false), 2000)
        }
    }, [])

    return { currentConditionsGeolocation, dailyForecastGeolocation, geolocationData, contextHolder, isLoading }
}

export default useGetGeolocation