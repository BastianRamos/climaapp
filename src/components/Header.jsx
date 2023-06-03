import { useState } from "react"
import { Col, Input, Row } from "antd"

const { Search } = Input


const Header = () => {
    const [loading, setLoading] = useState(false)

    const buscarCiudad = (event) => {
        console.log('SEARCH >>>', event)
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }

    return (
        <Row justify={{ sm: 'space-between' }} align={{ xs: 'stretch', sm: 'bottom' }}>
            <Col xs={24} sm={4}>
                <h2>Clima-app</h2>
            </Col>
            <Col xs={18} sm={12}>
                <Search placeholder="Ingrese una ciudad" loading={loading} onSearch={(e) => buscarCiudad(e)} />
            </Col>
            <Col xs={4} sm={4}>
                <h4>Icono de algo</h4>
            </Col>
        </Row>
    )
}

export default Header