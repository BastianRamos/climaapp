import { useEffect, useState } from "react"
import { getCurrentConditions, getLocationKey } from "../api/accuWeatherApi"
import { Col, Input, Row, AutoComplete } from "antd"
import Swal from "sweetalert2"

const { Search } = Input


const Header = ({ setCurrentConditionsData }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [citySelectedName, setCitySelectedName] = useState('')
    const [locationOptions, setLocationOptions] = useState([])


    const optionsCities = locationOptions?.map((location) => ({
        /*
        > Creamos unas opciones personalizadas para el Autocomplete con el array obtenido de la API location key.
        > Mostramos el nombre de la ciudad y su país de acuerdo al listado obtenido con la localidad ingresada por el usuario.
        */
        value: `${location.LocalizedName}, ${location.Country.LocalizedName}`,
        label: `${location.LocalizedName}, ${location.Country.LocalizedName}`
    }))


    useEffect(() => {
        // Cuando el usuario seleccione una ciudad del listado buscaremos las condiciones climaticas actuales del lugar.
        if (locationOptions.length > 0 && citySelectedName && citySelectedName !== '') {
            currentConditions()
        } else {
            setIsLoading(false)
        }
    }, [citySelectedName])

    console.log('CITY >', citySelectedName)

    const currentConditions = async () => {
        setIsLoading(true)

        const citySelectedNameSplit = citySelectedName?.split(',')

        const citySelectedObj = locationOptions.filter(location => location.LocalizedName === citySelectedNameSplit[0] && location.Country.LocalizedName === citySelectedNameSplit[1].trim())

        const citySelectedKey = citySelectedObj[0]?.Key

        const resp = await getCurrentConditions(citySelectedKey)
        if (resp?.status === 200) {
            const cityCurrentConditions = resp.data[0]
            setCurrentConditionsData(cityCurrentConditions)
        } else if (resp) {
            Swal.fire({
                icon: 'error',
                title: 'Problemas de Conexión',
                text: 'Tenemos problemas para acceder a la información climática en estos momentos.'
            })
        }
        setIsLoading(false)
    }


    const searchLocations = async (location) => {
        if (location && location.trim() !== '') {
            setIsLoading(true)
            const resp = await getLocationKey(location)
            console.log('RESP >', resp)

            if (resp.status === 200) {
                const cities = resp.data

                if (cities.length > 0) {
                    setIsLoading(false)
                    setLocationOptions(cities)
                } else {
                    setIsLoading(false)
                    Swal.fire({
                        icon: 'info',
                        title: 'Ciudad No Encontrada',
                        text: 'Vuelve a intentarlo y verifica que el lugar que buscas este escrito correctamente.'
                    })
                }
            } else {
                setIsLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Problemas de Conexión',
                    text: 'Tenemos problemas para acceder al listado de las ciudades en estos momentos.'
                })
            }
        }
    }


    return (
        <Row justify={{ sm: 'space-between' }} align={{ xs: 'stretch', sm: 'bottom' }}>
            <Col xs={24} sm={4} align='center'>
                <img height={80} width={80} src="climaapp.png" alt="logo climaapp" />
            </Col>
            <Col xs={18} sm={16}>
                <AutoComplete
                    style={{ width: '100%' }}
                    value={citySelectedName}
                    options={locationOptions?.length > 0 && optionsCities}
                    onChange={(value) => setCitySelectedName(value)}
                >
                    <Search
                        placeholder="Ingrese una ciudad"
                        allowClear
                        enterButton
                        loading={isLoading}
                        onSearch={(value) => searchLocations(value)}
                    />
                </AutoComplete>
            </Col>
            <Col xs={6} sm={4} align='center'>
                <h2>°C</h2>
            </Col>
        </Row>
    )
}

export default Header