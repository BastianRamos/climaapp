
import { useState } from "react"
import Header from "./Header"
import WeatherInformation from "./WeatherInformation"
//ANTD
import { ConfigProvider, theme } from "antd"
const { darkAlgorithm } = theme


const App = () => {
    const [currentConditionsData, setCurrentConditionsData] = useState({})
    const [gradeSelected, setGradeSelected] = useState('°C')

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
        </ConfigProvider>
    )
}

export default App