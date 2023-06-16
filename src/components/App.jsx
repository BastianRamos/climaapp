import { useState } from "react"
import Header from "./Header"
import PrincipalWeatherCard from "./PrincipalWeatherCard"
import { Divider } from "antd"

const App = () => {
    const [currentConditionsData, setCurrentConditionsData] = useState({})


    return (
        <>
            <Header setCurrentConditionsData={setCurrentConditionsData} />
            <main>
                <Divider />
                <PrincipalWeatherCard currentConditionsData={currentConditionsData} />
            </main>
        </>
    )
}

export default App