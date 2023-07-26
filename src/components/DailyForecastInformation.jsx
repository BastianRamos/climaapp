import { useEffect, useState } from 'react'
import { dayDD } from '../utils/dateFormat'
// ANTD
import { Row, Col, Typography } from 'antd'
const { Title, Paragraph } = Typography



function DailyForecastInformation({ day }) {

    const [maxTemp, setMaxTemp] = useState(0)
    const [minTemp, setMinTemp] = useState(0)
    const [dayDescription, setDayDescription] = useState('')
    const [nightDescription, setNightDescription] = useState('')


    useEffect(() => {
        if (day) {
            const max = Math.trunc(day.Temperature.Maximum.Value)
            const min = Math.trunc(day.Temperature.Minimum.Value)
            const dayText = day.Day.IconPhrase
            const nightText = day.Night.IconPhrase

            setMaxTemp(max)
            setMinTemp(min)
            setDayDescription(dayText)
            setNightDescription(nightText)
        }
    }, [day])


    return (
        <Row>
            <Col span={24} align='center'>
                <Title keyboard>{dayDD(day.Date)}</Title>
            </Col>

            <Col sm={24}>
                <Row className='all-center'>
                    <Col xs={2} sm={4}>
                        <img src='icons/alta-temperatura.webp' className='icon-daily-forecast' alt='Icono temperatura máxima' />
                    </Col>
                    <Col xs={10} sm={8}>
                        <Paragraph className='ml-1 mt-1 font-small' type='secondary'>Máxima {maxTemp}°C</Paragraph>
                    </Col>
                    <Col xs={2} sm={4}>
                        <img src='icons/baja-temperatura.webp' className='icon-daily-forecast' alt='Icono temperatura mínima' />
                    </Col>
                    <Col xs={10} sm={8}>
                        <Paragraph className='ml-1 mt-1 font-small' type='secondary'>Mínima {minTemp}°C</Paragraph>
                    </Col>

                    <Col xs={2} sm={4}>
                        <img className='icon-daily-forecast' src='icons/dia.webp' alt='Icono de día' />
                    </Col>
                    <Col xs={10} sm={8}>
                        <Paragraph className='ml-1 mt-1 font-small' type='secondary' >{dayDescription}</Paragraph>
                    </Col>
                    <Col xs={2} sm={4}>
                        <img className='icon-daily-forecast' src='icons/noche.webp' alt='Icono de noche' />
                    </Col>
                    <Col xs={10} sm={8}>
                        <Paragraph className='ml-1 mt-1 font-small' type='secondary'>{nightDescription}</Paragraph>
                    </Col>
                </Row>
            </Col>
        </Row>)
}

export default DailyForecastInformation