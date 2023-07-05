
import { useEffect, useState } from "react"
import Header from "./Header"
import Footer from "./Footer"
import WeatherInformation from "./WeatherInformation"
//ANT DESIGN
import { ConfigProvider, theme } from "antd"
const { darkAlgorithm } = theme
// -----------------------------------------


const App = () => {

    const [gradeSelected, setGradeSelected] = useState('°C')
    const [currentConditionsData, setCurrentConditionsData] = useState({})


    useEffect(() => {
        if (currentConditionsData) {
            const isDay = currentConditionsData.IsDayTime

            if (!isDay) document.body.className = 'dayBackground'
            else document.body.className = 'nightBackground'
        }
    }, [currentConditionsData])


    return (
        <ConfigProvider theme={{ algorithm: darkAlgorithm }}>
            <Header
                setCurrentConditionsData={setCurrentConditionsData}
                gradeSelected={gradeSelected}
                setGradeSelected={setGradeSelected}
            />
            <main>
                <WeatherInformation
                    currentConditionsData={currentConditionsData}
                    gradeSelected={gradeSelected}
                />
            </main>
            <Footer />
        </ConfigProvider>
    )
}

export default App