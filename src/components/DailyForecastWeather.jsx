import PropTypes from 'prop-types'
import DailyForecastInformation from './DailyForecastInformation';
// ANTD
import { Col, Row, Typography, Carousel, Skeleton } from 'antd'
const { Paragraph } = Typography



function DailyForecastWeather({ data, loadingGeolocation, isDay }) {

    const background = isDay ? 'rgba(23, 34, 87, .3)' : 'rgba(22,29,64,.7)'
    const backgroundCarousel = isDay ? 'rgba(23, 34, 87, .3)' : 'rgba(22,29,64,.3)'

    return (
        <Row>
            {
                loadingGeolocation &&
                <>
                    <Skeleton.Input block active size='large' />
                    <Col span={24} align='center'>
                        <div style={{ width: '50%' }}>
                            <Skeleton active size='small' />
                        </div>
                    </Col>
                </>
            }

            {
                data && !loadingGeolocation &&
                <>
                    <Col span={24} align='center' >
                        <Paragraph className='paragraph-container' style={{ backgroundColor: background }}>
                            {data.headline}
                        </Paragraph>
                    </Col>
                    <Col span={24} >
                        <Carousel className='carousel-style' style={{ backgroundColor: backgroundCarousel }} autoplay dotPosition='right'>
                            {data.dailyForecast?.map((day, index) => {
                                return (
                                    <div key={index}>
                                        <DailyForecastInformation day={day} />
                                    </div>
                                )
                            })}
                        </Carousel>
                    </Col>
                </>
            }
        </Row>
    )
}

DailyForecastWeather.propTypes = {
    data: PropTypes.object,
    loadingGeolocation: PropTypes.bool.isRequired
}

export default DailyForecastWeather