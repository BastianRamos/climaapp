import PropTypes from 'prop-types'
import { Col, Typography, Skeleton } from "antd"



function ColConditionsData({ title, value, valueSymbol, loadingGeolocation, isDay }) {

    const background = isDay ? 'rgba(23, 34, 87, .3)' : 'rgba(22,36,80,.8)'

    return (
        <>
            {
                loadingGeolocation
                    ?
                    <Col xs={11} sm={5}>
                        <Skeleton
                            loading={loadingGeolocation}
                            active
                            size='small'
                        />
                    </Col>
                    :
                    <Col xs={11} sm={5} className="card-weather-information" style={{ backgroundColor: background }}>
                        <Typography.Text>{title}</Typography.Text>
                        <Typography.Text strong className='font-medium'>{value} {valueSymbol}</Typography.Text>
                    </Col>
            }
        </>
    )
}

ColConditionsData.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    valueSymbol: PropTypes.string,
    loadingGeolocation: PropTypes.bool
}

ColConditionsData.defaultProps = {
    title: 'Sin Datos',
    value: 0
}

export default ColConditionsData