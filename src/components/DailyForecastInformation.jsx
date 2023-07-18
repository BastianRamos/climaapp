import { useEffect, useState } from 'react'
import { dayDD } from '../utils/dateFormat'
// ANTD
import { Row, Col, Typography } from 'antd'
const { Title } = Typography



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
                    <Col span={4} align='right'>
                        <img src='icons/alta-temperatura.webp' className='icon-daily-forecast mt-1' alt='Icono alta temperatura' />
                    </Col>
                    <Col span={8}>
                        <Title className='ml-1' level={5} type='secondary'>Máxima {maxTemp}°C</Title>
                    </Col>
                    <Col span={4} align='right'>
                        <img src='icons/baja-temperatura.webp' className='icon-daily-forecast mt-1' />
                    </Col>
                    <Col span={8}>
                        <Title className='ml-1' level={5} type='secondary'>Mínima {minTemp}°C</Title>
                    </Col>

                    <Col span={4} align='right' >
                        <img className='icon-daily-forecast mt-1' src='icons/dia.webp' />
                    </Col>
                    <Col span={8}>
                        <Title className='ml-1' level={5} type='secondary' >{dayDescription}</Title>
                    </Col>
                    <Col span={4} align='right'>
                        <img className='icon-daily-forecast mt-1' src='icons/noche.webp' />
                    </Col>
                    <Col span={8}>
                        <Title className='ml-1' level={5} type='secondary'>{nightDescription}</Title>
                    </Col>
                </Row>
            </Col>
        </Row>)
}

export default DailyForecastInformation