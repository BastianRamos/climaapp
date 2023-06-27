
import { useEffect, useState } from "react"
import Header from "./Header"
import WeatherInformation from "./WeatherInformation"
//ANT DESIGN
import { ConfigProvider, theme, notification } from "antd"
const { darkAlgorithm } = theme
// -------------------------------------------------------------------------------


const App = () => {
    const [api, contextHolder] = notification.useNotification()
    const [currentConditionsData, setCurrentConditionsData] = useState({})
    const [gradeSelected, setGradeSelected] = useState('°C')

    const OPTIONS_GEOLOCATION = {
        enableHighAccuracy: true,
        // timeout: 1000,
        maximunAge: 0
    }

    const successGeolocation = (position) => {
        if (position) {
            const cordinates = position.coords
            return api.success({
                message: 'Acceso a ubicación',
                description: `LAT: ${cordinates.latitude}, LONG: ${cordinates.longitude}`,
                duration: 5
            })
        }
    }

    const errorGeolocation = (error) => {
        if (error) {
            return api.warning({
                message: 'Acceso a ubicación denegado',
                description: 'Si desea permitir el acceso recarge la página.',
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
        if (navigator.geolocation) {
            navigator.permissions.query({
                name: 'geolocation'
            }).then(result => {
                if (result.state === 'granted') {
                    navigator.geolocation.getCurrentPosition(
                        successGeolocation,
                        errorGeolocation,
                        OPTIONS_GEOLOCATION
                    )
                } else if (result.state === 'prompt') {
                    navigator.geolocation.getCurrentPosition(
                        successGeolocation,
                        errorGeolocation,
                        OPTIONS_GEOLOCATION
                    )

                } else if (result.state === 'denied') {
                    console.log('PERMISO DENEGADO')
                }
            })
        } else {
            console.log('La geolocalización no es soportada por este navegador web.')
        }
    }, [])


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