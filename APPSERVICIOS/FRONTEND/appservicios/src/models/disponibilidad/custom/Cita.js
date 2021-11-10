const Cita = ({cita, height}) => {

    const customHeight = cita.intervalo*(height/60) - 1;
    const customTop = cita.top*(height/60);

    return (
        <div
            style={{position: 'absolute', border: 'solid rgba(255, 0, 0,1) 1px', left:'-1px', right:'-1px', height: `${customHeight}px`,  background:'rgba(255, 0, 0,1)', top: `${customTop}px`}}
        >
        </div>
    )
}

export default Cita