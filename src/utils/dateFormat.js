
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']


export const newDateDayMonthYYYY = () => {
    const date = new Date()
    return `${DIAS[date.getDay()]}, ${date.getDate()} de ${MESES[date.getMonth()]} de ${date.getUTCFullYear()}`
}