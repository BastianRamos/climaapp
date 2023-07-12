import PropTypes from 'prop-types'
import DailyForecastInformation from './DailyForecastInformation';
// ANTD
import { Col, Row, Typography, Carousel } from 'antd'
const { Paragraph } = Typography
// -------------------------------------------------
import '../css/dailyForecast.css'



function DailyForecastWeather({ data, loadingGeolocation }) {

    return (
        <Row>
            {
                data &&
                <>
                    <Col span={24} align='center'>
                        <Paragraph className='paragraph-container'>
                            {data.headline}
                        </Paragraph>

                        <Carousel className='carousel-style'>
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