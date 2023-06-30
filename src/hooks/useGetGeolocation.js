import { useEffect, useState } from "react"
import { getCurrentConditions, getGeopositionSearch } from "../api/accuWeatherApi"
// ANT DESIGN
import { notification } from "antd"
const { useNotification } = notification
const OPTIONS_GEOLOCATION = { enableHighAccuracy: true, maximunAge: 0 }
// ---------------------------------------------------------------------


const useGetGeolocation = () => {
    const [api, contextHolder] = useNotification()
    const [geolocationData, setGeolocationData] = useState(undefined)
    const [currentConditionsGeolocation, setCurrentConditionsGeolocation] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)


    const successGeolocation = async (position) => {
        if (position) {
            const cordinates = position.coords
            const respGeoposition = await getGeopositionSearch(cordinates.latitude, cordinates.longitude)

            if (respGeoposition.status === 200) {
                const dataGeoposition = respGeoposition.data
                const respConditions = await getCurrentConditions(dataGeoposition?.Key)

                if (respConditions.status === 200) {
                    const dataCurrentConditions = respConditions.data[0]
                    setCurrentConditionsGeolocation(dataCurrentConditions)
                    setGeolocationData({
                        key: dataGeoposition?.Key,
                        cityAndCountry: `${dataGeoposition?.LocalizedName}, ${dataGeoposition?.Country.LocalizedName}`
                    })
                } else {
                    api.warning({
                        message: 'Condiciones climáticas falló',
                        description: 'No hemos podido obtener información climática de la ciudad mediante el uso de geolocalización.',
                        duration: 0
                    })
                }
            } else {
                api.error({
                    message: 'Búsqueda por geolocalización falló',
                    description: 'No hemos podido obtener información climática de la ciudad mediante el uso de geolocalización.',
                    duration: 0
                })
            }
            setIsLoading(false)
        }
    }


    const errorGeolocation = (error) => {
        if (error) {
            api.warning({
                message: 'Acceso a ubicación denegado',
                description: 'Si desea permitir el acceso active la ubicación y recarge la página.',
                duration: 0
            })
            setIsLoading(false)
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
            setIsLoading(true)
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
                        duration: 0
                    })
                    setIsLoading(false)
                }
            })
        } else {
            api.info({
                message: 'Navegador no compatible',
                description: 'Este navegador no admite la función de geolocalización.',
                duration: 0
            })
            setIsLoading(false)
        }
    }, [])

    return { currentConditionsGeolocation, geolocationData, contextHolder, isLoading }
}

export default useGetGeolocation