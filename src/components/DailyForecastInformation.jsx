import { useEffect, useState } from 'react'
import { dayDD } from '../utils/dateFormat'
// ANTD
import { Row, Col, Typography, Space } from 'antd'
const { Title } = Typography



function DailyForecastInformation({ day }) {

    const [maxTemp, setMaxTemp] = useState(0)
    const [minTemp, setMinTemp] = useState(0)
    const [dayDescription, setDayDescription] = useState('')
    const [nightDescription, setNightDescription] = useState('')


    useEffect(() => {
        if (day) {
            const max = day.Temperature.Maximum.Value
            const min = day.Temperature.Minimum.Value
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

            <Col sm={12}>
                <Row className='all-center'>
                    <Col span={6} align='right'>
                        <img src='icons/alta-temperatura.webp' height={40} width={40} />
                    </Col>
                    <Col span={18}>
                        <Title className='ml-1' level={3} type='secondary'>Máxima: {maxTemp} °C</Title>
                    </Col>
                    <Col span={6} align='right'>
                        <img src='icons/dia.webp' height={40} width={40} />
                    </Col>
                    <Col span={18}>
                        <Title className='ml-1' level={4} type='secondary'>Por el día {dayDescription}</Title>

                    </Col>
                </Row>
            </Col>

            <Col span={12}>
                <Row className='all-center'>
                    <Col span={8} align='right'>
                        <img src='icons/baja-temperatura.webp' height={40} width={40} />

                    </Col>
                    <Col span={16}>
                        <Title className='ml-1' level={3} type='secondary'>Mínima: {minTemp} °C</Title>
                    </Col>
                    <Col span={8} align='right'>
                        <img src='icons/noche.webp' height={40} width={40} />
                    </Col>
                    <Col span={16}>
                        <Title className='ml-1' level={4} type='secondary'>Por la noche {nightDescription}</Title>
                    </Col>
                </Row>
            </Col>
        </Row>)
}

export default DailyForecastInformation