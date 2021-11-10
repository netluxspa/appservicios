import Hours from "../../../common/Hours";
import { dateTimeObj, HourFromDate } from "../../../common/DaysFunctions";
import { makeStyles, Typography, Button } from "@material-ui/core";

const height = '100'

const useStyles = makeStyles((theme)=>({
    contCita: {
        position: 'absolute',
        left: '0',
        right: '0',
        display: 'grid',
        gridTemplateColumns: '1fr 10fr',
        '& > div:last-child': {
            border: 'solid 1px rgba(0, 255, 0, 0.4)',
            background: 'rgba(0, 255, 0, 0.3)',
            borderRadius: '4px',
            display:'grid',
            gridTemplateColumns: '1fr 5fr 5fr 1fr'
        }
    },
    timeLabel: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background:'white',
        margin: '0 10px 0 0',
        borderRadius: '4px'
    }
}))

const CitaScheduleList = ({data, clickHour, goCita}) => {

    const classes = useStyles();

    const start = HourFromDate(data.inicio);
    const end = HourFromDate(data.final);




    const OneCita = ({cita}) => {

        const customHeight = cita.intervalo*(height/60) + cita.intervalo/60 - 3;
        const customTop = cita.top_disponibilidad*(height/60) + cita.top_disponibilidad/60 + 1;


        return (
            <div style={{height: customHeight + 'px', top: customTop + 'px'}} className={classes.contCita}>
               
                <div >

                </div>
                <div >
                    <div style={{height: customHeight}} className={classes.timeLabel}>
                        <div>
                            <Typography color='textSecondary'>
                                {dateTimeObj(cita.inicio).hour}
                            </Typography>
                        </div>
                        <div>
                            <Typography color='textSecondary'>
                                {dateTimeObj(cita.final).hour}
                            </Typography>
                        </div>
                    </div>
                   <div>
                        <Typography style={{fontSize:'0.8em'}} color='textSecondary'>
                            Cliente
                       </Typography>
                       <Typography  color='textPrimary'>
                            {cita.demandante_detail.persona.nombre}
                       </Typography>
                   </div>
                   <div>
                        <Typography style={{fontSize:'0.8em'}} color='textSecondary'>
                            Servicio
                       </Typography>
                       <Typography color='textPrimary'>
                            {cita.servicio_detail.titulo}
                       </Typography>
                   </div>
                   <div>
                       <Button onClick={()=>{goCita(cita)}} style={{marginTop:'5px'}} size='small' variant='contained' color='primary'>
                            Ir
                       </Button>
                   </div>
                </div>
            </div>
        )
    }


    return (
        <div>
            <div style={{position:'relative'}}>
                {data.cita.map(c=>(
                    <OneCita key={c.id} cita={c}/>
                ))}
            </div>

            <div>
                <Hours clickHour={h=>clickHour(h)} height={height} start={start} end={end} />
            </div>
        </div>
    )
}

export default CitaScheduleList;