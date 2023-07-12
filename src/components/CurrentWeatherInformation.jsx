import { Row } from "antd"
import PropTypes from 'prop-types'
import ColConditionsData from "./ColConditionsData"
import IlustratedWeatherState from "./IlustratedWeatherState"


const CurrentWeatherInformation = ({ currentConditionsData, gradeSelected, loadingGeolocation }) => {

    const uvLevel = currentConditionsData?.UVIndexText
    const cloudCover = currentConditionsData?.CloudCover
    const weatherState = currentConditionsData?.WeatherText
    const humidity = currentConditionsData?.RelativeHumidity
    const precipitation = currentConditionsData?.HasPrecipitation ? 'Si' : 'No'
    const windSpeed = currentConditionsData.Wind && Math.trunc(currentConditionsData.Wind.Speed.Metric.Value)
    const visibility = currentConditionsData.Visibility && Math.trunc(currentConditionsData.Visibility.Metric.Value)

    // TEMPERATURES
    const currentTemperature = currentConditionsData?.ApparentTemperature
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
                currentTemperature={currentTemperature}
                maxTemp={maxTemp}
                loadingGeolocation={loadingGeolocation}
            />

            <ColConditionsData
                title="Máxima"
                value={maxTemp}
                valueSymbol={gradeSelected}
                loadingGeolocation={loadingGeolocation}
            />
            <ColConditionsData
                title="Mínima"
                value={minTemp}
                valueSymbol={gradeSelected}
                loadingGeolocation={loadingGeolocation}
            />
            <ColConditionsData
                title="Nivel de UV"
                value={uvLevel}
                loadingGeolocation={loadingGeolocation}
            />
            <ColConditionsData
                title="Precipitaciones"
                value={precipitation}
                loadingGeolocation={loadingGeolocation}
            />
            {
                !loadingGeolocation &&
                <>
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
                </>
            }
        </Row>
    )
}

CurrentWeatherInformation.propTypes = {
    currentConditionsData: PropTypes.object,
    gradeSelected: PropTypes.string.isRequired,
    loadingGeolocation: PropTypes.bool.isRequired
}

export default CurrentWeatherInformation