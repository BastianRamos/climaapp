import { Row } from "antd"
import ColConditionsData from "./ColConditionsData"
import IlustratedWeatherState from "./IlustratedWeatherState"


const WeatherInformation = ({ currentConditionsData }) => {
    const weatherState = currentConditionsData?.WeatherText
    const uvLevel = currentConditionsData?.UVIndexText
    const temperatureRange = currentConditionsData?.TemperatureSummary?.Past6HourRange
    const maxTemp = temperatureRange && Math.trunc(temperatureRange.Maximum.Metric.Value)
    const minTemp = temperatureRange && Math.trunc(temperatureRange.Minimum.Metric.Value)
    const precipitation = currentConditionsData?.HasPrecipitation ? 'Si' : 'No'
    const humidity = currentConditionsData?.RelativeHumidity
    const windSpeed = currentConditionsData.Wind && Math.trunc(currentConditionsData.Wind.Speed.Metric.Value)
    const visibility = currentConditionsData.Visibility && Math.trunc(currentConditionsData.Visibility.Metric.Value)
    const cloudCover = currentConditionsData?.CloudCover

    return (
        <Row justify="space-between">
            <IlustratedWeatherState weatherState={weatherState} />

            <ColConditionsData
                title="Máxima"
                value={maxTemp}
                valueSymbol="°C"
            />
            <ColConditionsData
                title="Mínima"
                value={minTemp}
                valueSymbol="°C"
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