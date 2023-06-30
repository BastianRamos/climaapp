import { Row } from "antd"
import ColConditionsData from "./ColConditionsData"
import IlustratedWeatherState from "./IlustratedWeatherState"


const WeatherInformation = ({ currentConditionsData, gradeSelected }) => {
    // const isDay = currentConditionsData?.IsDayTime <------------------------------------ USAR
    const uvLevel = currentConditionsData?.UVIndexText
    const cloudCover = currentConditionsData?.CloudCover
    const weatherState = currentConditionsData?.WeatherText
    const humidity = currentConditionsData?.RelativeHumidity
    const precipitation = currentConditionsData?.HasPrecipitation ? 'Si' : 'No'
    const windSpeed = currentConditionsData.Wind && Math.trunc(currentConditionsData.Wind.Speed.Metric.Value)
    const visibility = currentConditionsData.Visibility && Math.trunc(currentConditionsData.Visibility.Metric.Value)

    // TEMPERATURES
    const realFeelTemperature = currentConditionsData?.RealFeelTemperature
    const temperatureRange = currentConditionsData?.TemperatureSummary?.Past24HourRange

    const maxTemp = temperatureRange && Math.trunc(gradeSelected === '°C'
        ? temperatureRange.Maximum.Metric.Value
        : temperatureRange.Maximum.Imperial.Value
    )

    const minTemp = temperatureRange && Math.trunc(gradeSelected === '°C'
        ? temperatureRange.Minimum.Metric.Value
        : temperatureRange.Minimum.Imperial.Value
    )
    // -------------------------------------------------------------------------------------------------


    return (
        <Row justify="space-between">
            <IlustratedWeatherState
                weatherState={weatherState}
                gradeSelected={gradeSelected}
                realFeelTemperature={realFeelTemperature}
            />

            <ColConditionsData
                title="Máxima"
                value={maxTemp}
                valueSymbol={gradeSelected}
            />
            <ColConditionsData
                title="Mínima"
                value={minTemp}
                valueSymbol={gradeSelected}
            />
            <ColConditionsData
                title="Nivel de UV"
                value={uvLevel}
            />
            <ColConditionsData
                title="Precipitaciones"
                value={precipitation}
            />
            <ColConditionsData
                title="Humedad"
                value={humidity}
                valueSymbol="%"
            />
            <ColConditionsData
                title="Visibilidad"
                value={visibility}
                valueSymbol="km"
            />
            <ColConditionsData
                title="Cobertura nubosa"
                value={cloudCover}
                valueSymbol="%"
            />
            <ColConditionsData
                title="Velocidad del viento"
                value={windSpeed}
                valueSymbol="km/h"
            />
        </Row>
    )
}

export default WeatherInformation