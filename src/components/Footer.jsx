import { Col, Divider, Row, Typography } from "antd"

const URL_PORTFOLIO = 'https://bastianrs.vercel.app/'



function Footer() {
    return (
        <Row className="mb-1">
            <Divider />
            <Col span={12} >
                <img className="border-radius-8" src="brs circle.png" alt="logo BRS" height={40} width={40} />
            </Col>
            <Col span={12} align='right'>
                <div id="containerAccuweatherLogo">
                    <img src="accuweather-apis-logo.webp" height={30} alt="logo accuweather apis" />
                </div>
            </Col>
            <Col span={24} align='center' className="mb-1 mt-2">
                <Typography.Paragraph type="secondary" code>
                    ClimaAPP v1.13
                </Typography.Paragraph>
                <Typography.Paragraph type="secondary">
                    Desarrollado por <a href={URL_PORTFOLIO} target="_blank">Bastian Ramos Saumontt</a>
                </Typography.Paragraph>
            </Col>
        </Row>
    )
}

export default Footer