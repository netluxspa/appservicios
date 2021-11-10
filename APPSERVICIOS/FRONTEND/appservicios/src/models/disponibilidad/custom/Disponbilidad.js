import Cita from "./Cita";

const Disponibilidades = ({disponibilidad, height, clickDisponibilidad}) => {


    const customHeight = disponibilidad.intervalo*(height/60) - 1;
    const customTop = disponibilidad.top*(height/60);

    return (
        <>
        <div

            onClick={()=>clickDisponibilidad(disponibilidad)}
           
            style={{zIndex:'1000', position: 'absolute', border: 'solid rgba(0, 255, 0,1) 1px', left:'-1px', right:'-1px', height: `${customHeight}px`, background:'rgba(0, 255, 0,0.4)', top: `${customTop}px`}}
        >
        </div>
        {disponibilidad.cita.map(c=>(
                 <Cita key={c.id} cita={c} height={height} />
            ))}
        </>
    )
}

export default Disponibilidades;