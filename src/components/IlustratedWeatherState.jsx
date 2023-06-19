import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Typography } from 'antd'


const IlustratedWeatherState = ({ weatherState }) => {
    console.log('STATE >', weatherState)
    const [weatherImg, setWeatherImg] = useState('weather-states/all-weathers.jpg')
    const [weatherIcon, setWeatherIcon] = useState('')
    console.log(weatherImg, weatherIcon)


    useEffect(() => {
        if (weatherState === 'Mayormente despejado' || weatherState === 'Algunas nubes' || weatherState === 'Mayormente soleado') {
            setWeatherImg('weather-states/mayormente-despejado.jpg')
            setWeatherIcon('icons/soleado.png')
        }
        if (weatherState === 'Despejado' || weatherState === 'Soleado') {
            setWeatherImg('weather-states/despejado.jpg')
            setWeatherIcon('icons/despejado.png')
        }
        if (weatherState === 'Nublado' || weatherState === 'Mayormente nublado') {
            setWeatherImg('weather-states/nublado.jpg')
            setWeatherIcon('icons/nublado.png')
        }
        if (weatherState === 'Parcialmente nublado' || weatherState === 'Parcialmente soleado' || weatherState === 'Nubes y sol') {
            setWeatherImg('weather-states/parcialmente-nublado.jpg')
            setWeatherIcon('icons/parcialmente-nublado.png')
        }
        if (weatherState === 'Niebla leve' || weatherState === 'Niebla densa' || weatherState === 'Soleado con bruma') {
            setWeatherImg('weather-states/niebla-leve.jpg')
            setWeatherIcon('icons/niebla.png')
        }
        if (weatherState === 'Chaparrón') {
            setWeatherImg('weather-states/lluvia.jpg')
            setWeatherIcon('icons/lluvia.png')
        }
    }, [weatherState])


    return (
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
                {weatherState}
            </Typography>
        </Col>
    )
}

IlustratedWeatherState.propTypes = {
    weatherState: PropTypes.string.isRequired
}

export default IlustratedWeatherState