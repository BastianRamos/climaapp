
import { useState } from "react"
//ANTD
import { ConfigProvider, theme } from "antd"
const { darkAlgorithm } = theme
//COMPONENTS
import Header from "./Header"
import WeatherInformation from "./WeatherInformation"


const App = () => {
    const [currentConditionsData, setCurrentConditionsData] = useState({})

    return (
        <ConfigProvider theme={{ algorithm: darkAlgorithm }}>
            <Header setCurrentConditionsData={setCurrentConditionsData} />
            <main>
                <WeatherInformation currentConditionsData={currentConditionsData} />
            </main>
        </ConfigProvider>
    )
}

export default App