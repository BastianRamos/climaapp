
import { useEffect, useState } from "react"
import Header from "./Header"
import WeatherInformation from "./WeatherInformation"
//ANT DESIGN
import { ConfigProvider, theme, notification } from "antd"
import { getGeopositionSearch } from "../api/accuWeatherApi"
const { darkAlgorithm } = theme
// -------------------------------------------------------------------------------


const App = () => {
    const [api, contextHolder] = notification.useNotification()

    const [gradeSelected, setGradeSelected] = useState('°C')
    const [searchCordinates, setSearchCordinates] = useState(true)
    const [geolocationData, setGeolocationData] = useState(undefined)
    const [currentConditionsData, setCurrentConditionsData] = useState({})

    const OPTIONS_GEOLOCATION = {
        enableHighAccuracy: true,
        // timeout: 1000,
        maximunAge: 0
    }


    const successGeolocation = async (position) => {
        if (position) {
            const cordinates = position.coords

            const resp = await getGeopositionSearch(cordinates.latitude, cordinates.longitude)
            if (resp.status === 200) {
                const data = resp.data

                setGeolocationData({
                    key: data?.Key,
                    city: data?.LocalizedName,
                    country: data?.Country.LocalizedName
                })

                api.success({
                    message: 'Acceso a ubicación',
                    description: `LAT: ${cordinates.latitude}, LONG: ${cordinates.longitude}`,
                    duration: 5
                })
            } else {
                api.error({
                    message: 'Búsqueda por Geolocalización Falló',
                    description: 'No hemos podido obtener información climática de la ciudad mediante el uso de geolocalización.',
                    duration: 0
                })
            }
        }
    }
    // console.log('GET GEO *** ', geolocationData)


    const errorGeolocation = (error) => {
        if (error) {
            api.warning({
                message: 'Acceso a ubicación denegado',
                description: 'Si desea permitir el acceso active la ubicación y recarge la página.',
                duration: 0
            })
        }
    }


    useEffect(() => {
        /*
        Podemos tener 3 estados de geolocalización: 
        - granted: tenemos permiso para acceder a la ubicación para que podamos llamar a la geolocalización directamente.
        - prompt: el usuario obtendrá una ventana emergente solicitando permiso.
        - denied: el usuario ha negado compartir su ubicación.
        */
        if (navigator.geolocation && searchCordinates) {
            navigator.permissions.query({
                name: 'geolocation'
            }).then(() => {
                navigator.geolocation.getCurrentPosition(
                    successGeolocation,
                    errorGeolocation,
                    OPTIONS_GEOLOCATION
                )
                setSearchCordinates(false)
            })
        }
    }, [searchCordinates])


    return (
        <ConfigProvider theme={{ algorithm: darkAlgorithm }}>
            <Header
                setCurrentConditionsData={setCurrentConditionsData}
                gradeSelected={gradeSelected}
                setGradeSelected={setGradeSelected}
            />
            <main>
                {/* Se usa para indicar a la notificación en donde posicionar el contenido */}
                {contextHolder}
                {/* ---------------------------------------------------------------------- */}
                <WeatherInformation
                    currentConditionsData={currentConditionsData}
                    gradeSelected={gradeSelected}
                />
            </main>
        </ConfigProvider>
    )
}

export default App