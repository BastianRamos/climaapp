import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { dayDDMonthYYYY } from '../utils/dateFormat'
// ANTD
import { Col, Skeleton, Typography } from 'antd'
const { Paragraph } = Typography
// ---------------------------------------------



function IlustratedWeatherState({ weatherState, gradeSelected, currentTemperature, maxTemp, loadingGeolocation, isDay }) {

    const background = isDay ? 'rgba(23, 34, 87, .3)' : 'rgba(22,36,80,.8)'

    const realTemperature = currentTemperature && Math.trunc(gradeSelected === '°C'
        ? currentTemperature.Metric.Value
        : currentTemperature.Imperial.Value
    )

    const [weatherIcon, setWeatherIcon] = useState('icons/estaciones.webp')
    const [weatherImg, setWeatherImg] = useState('weather-states/all-weathers.webp')
    const toDay = dayDDMonthYYYY()


    useEffect(() => {
        if (weatherState === 'Tormenta eléctrica') {
            setWeatherIcon('icons/tormenta-electrica.webp')
            setWeatherImg('weather-states/tormenta-electrica.webp')
        }
        if (weatherState === 'Lluvias y nevadas') {
            setWeatherIcon('icons/nieve.webp')
            setWeatherImg('weather-states/lluvia-nieve.webp')
        }
        if (weatherState === 'Despejado' || weatherState === 'Soleado') {
            setWeatherIcon('icons/despejado.webp')
            setWeatherImg('weather-states/despejado.webp')
        }
        if (weatherState === 'Nublado' || weatherState === 'Mayormente nublado') {
            setWeatherIcon('icons/nublado.webp')
            setWeatherImg('weather-states/nublado.webp')
        }
        if (weatherState === 'Niebla leve' || weatherState === 'Niebla densa' || weatherState === 'Soleado con bruma') {
            setWeatherIcon('icons/niebla.webp')
            setWeatherImg('weather-states/niebla-leve.webp')
        }
        if (weatherState === 'Mayormente despejado' || weatherState === 'Algunas nubes' || weatherState === 'Mayormente soleado') {
            setWeatherIcon('icons/soleado.webp')
            setWeatherImg('weather-states/mayormente-despejado.webp')
        }
        if (weatherState === 'Parcialmente nublado' || weatherState === 'Parcialmente soleado' || weatherState === 'Nubes y sol') {
            setWeatherIcon('icons/parcialmente-nublado.webp')
            setWeatherImg('weather-states/parcialmente-nublado.webp')
        }
        if (weatherState === 'Chaparrón' || weatherState === 'Lluvias' || weatherState === 'Chaparrones' || weatherState === 'Lluvias leves') {
            setWeatherIcon('icons/lluvia.webp')
            setWeatherImg('weather-states/lluvia.webp')
        }
    }, [weatherState])


    return (
        <>
            {
                loadingGeolocation
                    ?
                    <>
                        <Skeleton.Image
                            className='skeleton-ilustrated-weather'
                            loading={loadingGeolocation}
                            active
                        />
                        <Skeleton.Input size='large' active block />
                    </>
                    :
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
                            <Paragraph className="text-over-top-left">
                                {weatherState}
                                <br />
                                {
                                    currentTemperature &&
                                    `${realTemperature < maxTemp ? realTemperature : maxTemp}${gradeSelected}`
                                }
                            </Paragraph>
                        </Col>

                        <Col span={24} align='center'>
                            <Paragraph className='paragraph-container' style={{ backgroundColor: background }}>
                                {toDay}
                            </Paragraph>
                        </Col>
                    </>
            }
        </>
    )
}

IlustratedWeatherState.propTypes = {
    weatherState: PropTypes.string,
    gradeSelected: PropTypes.string,
    currentTemperature: PropTypes.object,
    maxTemp: PropTypes.number,
    loadingGeolocation: PropTypes.bool
}

IlustratedWeatherState.defaultProps = {
    weatherState: 'Información climática gracias a AccuWeather.',
}

export default IlustratedWeatherState