import PropTypes from 'prop-types'
import { Col, Typography } from "antd"


const ColConditionsData = ({ title, value, valueSymbol }) => {
    return (
        <Col xs={11} sm={5} className="card-weather-information">
            <Typography.Text>{title}</Typography.Text>
            <Typography.Text strong className='font-medium'>{value} {valueSymbol}</Typography.Text>
        </Col>
    )
}

ColConditionsData.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    valueSymbol: PropTypes.string
}

ColConditionsData.defaultProps = {
    title: 'Sin Datos',
    value: 0
}

export default ColConditionsData