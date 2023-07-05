import { Col, Divider, Row, Typography } from "antd"

const Footer = () => {
    return (
        <Row style={{ paddingTop: '2rem' }}>
            <Divider />
            <Col span={24} align='center'>
                <Typography.Paragraph type="secondary" code>
                    ClimaAPP v1.9
                </Typography.Paragraph>
                <Typography.Paragraph type="secondary">
                    Desarrollado por <a href="https://bastianrs.vercel.app/" target="_blank">Bastian Ramos Saumontt</a>
                </Typography.Paragraph>
            </Col>
        </Row>
    )
}

export default Footer