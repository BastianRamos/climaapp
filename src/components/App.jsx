
import { useEffect, useState } from "react"
import Header from "./Header"
import Footer from "./Footer"
import DailyForecastWeather from "./DailyForecastWeather"
import CurrentWeatherInformation from "./CurrentWeatherInformation"
//ANT DESIGN
import { ConfigProvider, theme } from "antd"
const { darkAlgorithm } = theme



function App() {

    const [gradeSelected, setGradeSelected] = useState('°C')
    const [currentConditionsData, setCurrentConditionsData] = useState({})
    const [dailyForecastData, setDailyForecastData] = useState(undefined)
    const [loadingGeolocation, setLoadingGeolocation] = useState(true)
    const [isDay, setIsDay] = useState(false)


    useEffect(() => {
        if (currentConditionsData) {
            const isDayNow = currentConditionsData.IsDayTime

            if (isDayNow)
                document.body.className = 'dayBackground'
            else
                document.body.className = 'nightBackground'

            setIsDay(isDayNow)
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
                    isDay={isDay}
                />

                <DailyForecastWeather
                    data={dailyForecastData}
                    loadingGeolocation={loadingGeolocation}
                    isDay={isDay}
                />
            </main>
            <Footer />
        </ConfigProvider>
    )
}

export default App