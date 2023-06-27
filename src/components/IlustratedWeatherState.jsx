import { useEffect, useState } from 'react'
import { Col, Typography } from 'antd'
import { newDateDayMonthYYYY } from '../utils/dateFormat'


const IlustratedWeatherState = ({ weatherState }) => {
    const [weatherIcon, setWeatherIcon] = useState('icons/estaciones.png')
    const [weatherImg, setWeatherImg] = useState('weather-states/all-weathers.webp')
    const toDay = newDateDayMonthYYYY()


    useEffect(() => {
        if (weatherState === 'Lluvias y nevadas') {
            setWeatherImg('weather-states/lluvia-nieve.webp')
            setWeatherIcon('icons/nieve.png')
        }
        if (weatherState === 'Despejado' || weatherState === 'Soleado') {
            setWeatherImg('weather-states/despejado.webp')
            setWeatherIcon('icons/despejado.png')
        }
        if (weatherState === 'Nublado' || weatherState === 'Mayormente nublado') {
            setWeatherImg('weather-states/nublado.webp')
            setWeatherIcon('icons/nublado.png')
        }
        if (weatherState === 'Chaparrón' || weatherState === 'Lluvias' || weatherState === 'Chaparrones') {
            setWeatherImg('weather-states/lluvia.webp')
            setWeatherIcon('icons/lluvia.png')
        }
        if (weatherState === 'Niebla leve' || weatherState === 'Niebla densa' || weatherState === 'Soleado con bruma') {
            setWeatherImg('weather-states/niebla-leve.webp')
            setWeatherIcon('icons/niebla.png')
        }
        if (weatherState === 'Mayormente despejado' || weatherState === 'Algunas nubes' || weatherState === 'Mayormente soleado') {
            setWeatherImg('weather-states/mayormente-despejado.webp')
            setWeatherIcon('icons/soleado.png')
        }
        if (weatherState === 'Parcialmente nublado' || weatherState === 'Parcialmente soleado' || weatherState === 'Nubes y sol') {
            setWeatherImg('weather-states/parcialmente-nublado.webp')
            setWeatherIcon('icons/parcialmente-nublado.png')
        }
    }, [weatherState])


    return (
        <>
            <Col span={24} className="short-container">
                <img
                    className="cover-img"
                    src={weatherImg}
                    alt="Imagen referencial del estado del clima actual."
                />
                {
                    weatherIcon &&
                    <img
                        src={weatherIcon}
                        className="icon-over-bottom-right"
                        alt="Icono ilustrativo del estado del clima actual."
                    />
                }
                <Typography className="text-over-top-left">
                    {weatherState ?? 'Información climática gracias a AccuWeather.'}
                </Typography>
            </Col>

            <Col span={24} align='center'>
                <Typography.Paragraph strong>
                    {toDay}
                </Typography.Paragraph>
            </Col>
        </>
    )
}

export default IlustratedWeatherState