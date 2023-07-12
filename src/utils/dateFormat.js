
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']


export const dayDDMonthYYYY = (date) => {
    const dateObject = date ? new Date(date) : new Date()
    return `${DIAS[dateObject.getDay()]}, ${dateObject.getDate()} de ${MESES[dateObject.getMonth()]} de ${dateObject.getUTCFullYear()}`
}

export const dayDD = (date) => {
    const dateObject = date ? new Date(date) : new Date()
    return `${DIAS[dateObject.getDay()]} ${dateObject.getDate()}`
}