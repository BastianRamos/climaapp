
import { useState } from "react"
import Header from "./Header"
import WeatherInformation from "./WeatherInformation"
//ANTD
import { ConfigProvider, theme } from "antd"
const { darkAlgorithm } = theme


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