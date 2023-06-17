//ANTD
import { Row, Col, Typography } from "antd"


const WeatherInformation = ({ currentConditionsData }) => {
    const weatherState = currentConditionsData?.WeatherText
    const uvLevel = currentConditionsData?.UVIndexText
    const temperatureRange = currentConditionsData?.TemperatureSummary?.Past6HourRange
    const maxTemp = Math.trunc(temperatureRange?.Maximum?.Metric?.Value)
    const minTemp = Math.trunc(temperatureRange?.Minimum?.Metric?.Value)
    const precipitation = currentConditionsData?.HasPrecipitation ? 'Si' : 'No'
    const humidity = currentConditionsData?.RelativeHumidity
    const windSpeed = Math.trunc(currentConditionsData?.Wind?.Speed?.Metric?.Value)
    const visibility = Math.trunc(currentConditionsData?.Visibility?.Metric?.Value)
    const cloudCover = currentConditionsData?.CloudCover

    console.log('CARD >', currentConditionsData)
    return (
        <Row justify="space-between">
            <Col span={24} className="short-container">
                <img
                    className="cover-img"
                    src="https://clarksvillenow.sagacom.com/files/2020/11/shutterstock_1393820171.jpg"
                    alt="Imagen referencial del estado del clima actual."
                />
                <img
                    src="icons/nublado.png"
                    className="img-over-top-left"
                    alt="Icono ilustrativo del estado del clima actual."
                />
                <Typography className="text-over-top-right">
                    {weatherState}
                </Typography>
            </Col>
            <Col xs={11} sm={5} className="border-center">
                <Typography>Máxima</Typography>
                <Typography>{maxTemp} °C</Typography>
            </Col>
            <Col xs={11} sm={5} className="border-center">
                <Typography>Mínima</Typography>
                <Typography>{minTemp} °C</Typography>
            </Col>
            <Col xs={11} sm={5} className="border-center">
                <Typography>Nivel de UV</Typography>
                <Typography>{uvLevel}</Typography>
            </Col>
            <Col xs={11} sm={5} className="border-center">
                <Typography>Precipitaciones</Typography>
                <Typography>{precipitation}</Typography>
            </Col>
            <Col xs={11} sm={5} className="border-center">
                <Typography>Humedad</Typography>
                <Typography>{humidity} %</Typography>
            </Col>
            <Col xs={11} sm={5} className="border-center">
                <Typography>Visibilidad</Typography>
                <Typography>{visibility} km</Typography>
            </Col>
            <Col xs={11} sm={5} className="border-center">
                <Typography>Cobertura nubosa</Typography>
                <Typography>{cloudCover} %</Typography>
            </Col>
            <Col xs={11} sm={5} className="border-center">
                <Typography>Velocidad del viento</Typography>
                <Typography>{windSpeed} km/h</Typography>
            </Col>
        </Row>
    )
}

export default WeatherInformation