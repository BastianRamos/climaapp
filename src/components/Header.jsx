import { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import useGetGeolocation from "../hooks/useGetGeolocation"
import { getCurrentConditions, getLocationKey } from "../api/accuWeatherApi"
//ANTD
import { Col, Input, Row, AutoComplete, Radio, Divider, Spin, notification } from "antd"
const { Search } = Input
const { useNotification } = notification



function Header({ setCurrentConditionsData, setDailyForecastData, gradeSelected, setGradeSelected, setLoadingGeolocation }) {

    const [api, contextHolder] = useNotification()
    const [isLoading, setIsLoading] = useState(false)
    const [inputLocation, setInputLocation] = useState('')
    const [locationOptions, setLocationOptions] = useState([])
    const [citySelectedName, setCitySelectedName] = useState('')

    const {
        currentConditionsGeolocation,
        dailyForecastGeolocation,
        geolocationData,
        contextHolder: notificationGeolocationHook,
        isLoading: loadingGeolocation
    } = useGetGeolocation()

    const optionsCities = locationOptions?.map((location, index) => ({
        /* 
        > Creamos unas opciones personalizadas para el Autocomplete con el array obtenido de 
        la API location key.
        > Mostramos el nombre de la ciudad y su país de acuerdo al listado obtenido con la 
        localidad ingresada por el usuario.
        */
        key: index,
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


    useEffect(() => {
        if (geolocationData) setInputLocation(geolocationData.cityAndCountry)

        if (currentConditionsGeolocation) setCurrentConditionsData(currentConditionsGeolocation)

        if (dailyForecastGeolocation) setDailyForecastData(dailyForecastGeolocation)

        setLoadingGeolocation(loadingGeolocation)
    }, [geolocationData, currentConditionsGeolocation, dailyForecastGeolocation, loadingGeolocation])


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
            api.error({
                message: 'Problemas de Conexión',
                description: 'Tenemos problemas para acceder a la información climática en estos momentos.',
                duration: 60
            })
        }
        setIsLoading(false)
    }


    const searchLocations = async (location) => {
        if (location && location.trim() !== '') {
            let onlyLocation = location

            if (location.includes(',')) {
                const indexComma = location.indexOf(',')
                onlyLocation = location.substring(0, indexComma)
            }

            setIsLoading(true)
            const resp = await getLocationKey(onlyLocation)
            if (resp?.status === 200) {
                const cities = resp.data

                if (cities.length > 0)
                    setLocationOptions(cities)
                else
                    api.info({
                        message: 'Ciudad No Encontrada',
                        description: 'Vuelve a intentarlo y verifica que la ciudad que buscas este escrita correctamente. "Sólo escribir la ciudad".',
                        duration: 15
                    })
            } else {
                api.error({
                    message: 'Problemas de Conexión',
                    description: 'Tenemos problemas para acceder al listado de las ciudades en estos momentos.',
                    duration: 60
                })
            }
            setIsLoading(false)
        }
    }


    return (
        <Row justify={{ sm: 'space-between' }} align={{ xs: 'stretch', sm: 'bottom' }}>
            {/* Se usa para posicionar las notificaciones de ANTD */}
            {notificationGeolocationHook}
            {contextHolder}
            {/* ------------------------------------------------- */}
            <Col xs={12} sm={4} align='left'>
                <img id="logoClimaap" src="climaapp.png" alt="logo climaapp" />
            </Col>
            <Col span={12} align='right' className="d-none-desktop center-auto-margin">
                <Radio.Group
                    value={gradeSelected}
                    onChange={(e) => { setGradeSelected(e.target.value); }}
                    disabled={loadingGeolocation}
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
                    disabled={loadingGeolocation}
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
                    disabled={loadingGeolocation}
                >
                    <Radio.Button value="°C">°C</Radio.Button>
                    <Radio.Button value="°F">°F</Radio.Button>
                </Radio.Group>
            </Col>
            {
                loadingGeolocation &&
                <Col span={24} align='center' style={{ paddingTop: '3rem', paddingBottom: '1rem' }} >
                    <Spin size="large" spinning={loadingGeolocation} tip='Esperando ubicación'>
                        <div className="content" />
                    </Spin>
                </Col>
            }
            <Divider />
        </Row>
    )
}

Header.propTypes = {
    gradeSelected: PropTypes.string.isRequired
}

export default Header