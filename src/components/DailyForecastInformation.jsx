import { useEffect, useState } from 'react'
import { dayDD } from '../utils/dateFormat'
// ANTD
import { Row, Col, Typography } from 'antd'
const { Title } = Typography
// ----------------------------------------


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
            <Col xs={{ span: 24, order: 2 }} sm={{ span: 8, order: 1 }}>
                <Title level={3} type='secondary' keyboard>Máxima: {maxTemp} °C</Title>
            </Col>
            <Col xs={{ span: 24, order: 1 }} sm={{ span: 8, order: 2 }}>
                <Title keyboard>{dayDD(day.Date)}</Title>
            </Col>
            <Col xs={24} sm={8} order={3}>
                <Title level={3} type='secondary' keyboard>Mínima: {minTemp} °C</Title>
            </Col>
            <Col xs={24} sm={12} order={4} align={{ xs: 'center', sm: 'left' }}>
                <Title level={4} type='secondary' keyboard>Por el día estará {dayDescription}</Title>
            </Col>
            <Col xs={24} sm={12} order={5} align={{ xs: 'center', sm: 'right' }}>
                <Title level={4} type='secondary' keyboard>Por la noche estará {nightDescription}</Title>
            </Col>
        </Row>)
}

export default DailyForecastInformation