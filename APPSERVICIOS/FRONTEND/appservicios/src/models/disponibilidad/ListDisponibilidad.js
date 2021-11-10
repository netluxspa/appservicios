import Schedule from "./custom/Schedule";

const ListDisponibilidad = ({data, clickHour, clickDisponibilidad}) => {
    return (
        <Schedule days={data} clickHour={h=>clickHour(h)} clickDisponibilidad={d=>clickDisponibilidad(d)}/>
    )
}

export default ListDisponibilidad;