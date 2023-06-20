import { useEffect, useState } from "react"
import { getCurrentConditions, getLocationKey } from "../api/accuWeatherApi"
import Swal from "sweetalert2"

//ANTD
import { Col, Input, Row, AutoComplete, Radio, Divider } from "antd"
const { Search } = Input


const Header = ({ setCurrentConditionsData }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [citySelectedName, setCitySelectedName] = useState('')
    const [inputLocation, setInputLocation] = useState('')
    const [locationOptions, setLocationOptions] = useState([])
    const [gradeSelected, setGradeSelected] = useState('°C')

    const optionsCities = locationOptions?.map((location) => ({
        /* > Creamos unas opciones personalizadas para el Autocomplete con el array obtenido de 
        la API location key.
        > Mostramos el nombre de la ciudad y su país de acuerdo al listado obtenido con la 
        localidad ingresada por el usuario.*/
        value: `${location.LocalizedName}, ${location.Country.LocalizedName}`,
        label: `${location.LocalizedName}, ${location.Country.LocalizedName}`
    }))


    useEffect(() => {
        /* Cuando el usuario seleccione una ciudad del listado buscaremos las condiciones climáticas
         actuales del lugar.*/
        if (locationOptions.length > 0 && citySelectedName && citySelectedName !== '')
            currentConditions()
        else
            setIsLoading(false)
    }, [citySelectedName])


    const currentConditions = async () => {
        setIsLoading(true)
        const citySelectedNameSplit = citySelectedName?.split(',')

        const citySelectedObj = locationOptions.filter(location =>
            location.LocalizedName === citySelectedNameSplit[0] &&
            location.Country.LocalizedName === citySelectedNameSplit[1].trim()
        )

        const citySelectedKey = citySelectedObj[0]?.Key
        const resp = await getCurrentConditions(citySelectedKey)

        if (resp?.status === 200) {
            const cityCurrentConditions = resp.data[0]
            setCurrentConditionsData(cityCurrentConditions)
        } else {
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

            if (resp?.status === 200) {
                const cities = resp.data

                if (cities.length > 0)
                    setLocationOptions(cities)
                else
                    Swal.fire({
                        icon: 'info',
                        title: 'Ciudad No Encontrada',
                        text: 'Vuelve a intentarlo y verifica que el lugar que buscas este escrito correctamente.'
                    })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Problemas de Conexión',
                    text: 'Tenemos problemas para acceder al listado de las ciudades en estos momentos.'
                })
            }
            setIsLoading(false)
        }
    }


    return (
        <Row justify={{ sm: 'space-between' }} align={{ xs: 'stretch', sm: 'bottom' }}>
            <Col xs={12} sm={4} align='left'>
                <img id="logoClimaap" src="climaapp.png" alt="logo climaapp" />
            </Col>
            <Col span={12} align='right' className="d-none-desktop center-auto-margin">
                <Radio.Group
                    value={gradeSelected}
                    onChange={(e) => { setGradeSelected(e.target.value); }}
                >
                    <Radio.Button value="°C">°C</Radio.Button>
                    <Radio.Button value="°F">°F</Radio.Button>
                </Radio.Group>
            </Col>
            <Col xs={24} sm={16}>
                <AutoComplete
                    style={{ width: '100%' }}
                    value={inputLocation}
                    options={locationOptions?.length > 0 && optionsCities}
                    onSelect={(value) => setCitySelectedName(value)}
                    onChange={(value) => setInputLocation(value)}
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
            <Col span={4} align='center' className="d-none-mobile">
                <Radio.Group
                    value={gradeSelected}
                    onChange={(e) => { setGradeSelected(e.target.value); }}
                >
                    <Radio.Button value="°C">°C</Radio.Button>
                    <Radio.Button value="°F">°F</Radio.Button>
                </Radio.Group>
            </Col>
            <Divider />
        </Row>
    )
}

export default Header