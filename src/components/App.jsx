
import { useEffect, useState } from "react"
import Header from "./Header"
import Footer from "./Footer"
import DailyForecastWeather from "./DailyForecastWeather"
import CurrentWeatherInformation from "./CurrentWeatherInformation"
//ANT DESIGN
import { ConfigProvider, theme } from "antd"
const { darkAlgorithm } = theme
// -----------------------------------------


const App = () => {

    const [gradeSelected, setGradeSelected] = useState('°C')
    const [currentConditionsData, setCurrentConditionsData] = useState({})
    const [dailyForecastData, setDailyForecastData] = useState({})
    const [loadingGeolocation, setLoadingGeolocation] = useState(true)


    useEffect(() => {
        if (currentConditionsData) {
            const isDay = currentConditionsData.IsDayTime

            if (isDay)
                document.body.className = 'dayBackground'
            else
                document.body.className = 'nightBackground'
        }
    }, [currentConditionsData])


    return (
        <ConfigProvider theme={{ algorithm: darkAlgorithm }}>
            <Header
                setCurrentConditionsData={setCurrentConditionsData}
                setDailyForecastData={setDailyForecastData}
                gradeSelected={gradeSelected}
                setGradeSelected={setGradeSelected}
                setLoadingGeolocation={setLoadingGeolocation}
            />
            <main>
                <CurrentWeatherInformation
                    currentConditionsData={currentConditionsData}
                    gradeSelected={gradeSelected}
                    loadingGeolocation={loadingGeolocation}
                />

                <DailyForecastWeather
                    data={dailyForecastData}
                    loadingGeolocation={loadingGeolocation}
                />
            </main>
            <Footer />
        </ConfigProvider>
    )
}

export default App