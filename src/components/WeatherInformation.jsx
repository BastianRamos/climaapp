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
    const temperatureRange = currentConditionsData?.TemperatureSummary?.Past6HourRange
    const maxTempC = temperatureRange && Math.trunc(temperatureRange.Maximum.Metric.Value)
    const minTempC = temperatureRange && Math.trunc(temperatureRange.Minimum.Metric.Value)
    const maxTempF = temperatureRange && Math.trunc(temperatureRange.Maximum.Imperial.Value)
    const minTempF = temperatureRange && Math.trunc(temperatureRange.Minimum.Imperial.Value)
    // -------------------------------------------------------------------------------------------------


    return (
        <Row justify="space-between">
            <IlustratedWeatherState weatherState={weatherState} />

            <ColConditionsData
                title="Máxima"
                value={gradeSelected === '°C' ? maxTempC : maxTempF}
                valueSymbol={gradeSelected}
            />
            <ColConditionsData
                title="Mínima"
                value={gradeSelected === '°C' ? minTempC : minTempF}
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