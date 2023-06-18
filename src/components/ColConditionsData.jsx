import PropTypes from 'prop-types'
import { Col, Typography } from "antd"


const ColConditionsData = ({ title, value, valueSymbol }) => {

    return (
        <Col xs={11} sm={5} className="border-text-center">
            <Typography className='font-medium'>{title}</Typography>
            <Typography className='font-medium'>{value} {valueSymbol}</Typography>
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