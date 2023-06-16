import { Card } from "antd"

const { Meta } = Card

const PrincipalWeatherCard = ({ currentConditionsData }) => {
    console.log('CARD >', currentConditionsData)
    return (
        <Card>
            <Meta
                title='titulo'
                description='Descripcion'
            />
        </Card>
    )
}

export default PrincipalWeatherCard