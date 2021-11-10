import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { dateTimeObj, fullDate } from "../../common/DaysFunctions";

const useStyles = makeStyles((theme)=>({
    cont: {
        display:'grid',
        gap: '5px',
    },
    header:{

    },
    servicio: {

    },
    oferente: {

    },
    inicio: {

    },
    nombre: {

    },
    contacto: {

    },
    button: {
        textAlign:'center',

    }

}))

const DataRecopil = ({servicio, demandante, form}) => {

    const classes = useStyles();

    const Data = {
        cita: [

        ],
        contacto: [
            <div className={classes.header}>
                <Typography  >
                    Datos de contacto
                </Typography>
            </div>
        ]
    }

    if (servicio) {
        Data.cita.push(
            <div className={classes.servicio}>
                <Typography   style={{fontSize: '0.8em'}}>
                    {servicio.titulo}
                </Typography>
            </div>
        )
    }

    if (form && form.form && form.form.inicio && form.extra && form.extra.oferenteName) {
        Data.cita.push(
            <>
                <div>
                    <Typography style={{fontSize: '0.8em'}}>
                        {fullDate(dateTimeObj(form.form.inicio).date) + ' a las ' + dateTimeObj(form.form.inicio).hour}
                    </Typography>
                </div>
                <div>
                    <Typography style={{fontSize: '0.8em'}}>
                        {form.extra.oferenteName}
                    </Typography>
                </div>
            </>
        )
    }

    if (demandante &&
        demandante.persona && demandante.persona.rut && demandante.persona.nombre && demandante.persona.apellido &&
        demandante.contacto && demandante.contacto.email && demandante.contacto.fono
        ) {
            Data.contacto.push(
                <>
                    <div>
                        <Typography>
                            {demandante.persona.rut}
                        </Typography>
                    </div>
                    <div>
                        <Typography>
                            {demandante.persona.nombre + ' ' + demandante.persona.apellido} 
                        </Typography>
                    </div>
                    <div>
                        <Typography>
                            {demandante.contacto.fono + ' ' + demandante.contacto.email} 
                        </Typography>
                    </div>
                </>
            )
    }


    return (
        <div  className={classes.cont}>
            <div>
                {Data.cita.map(d=>(
                    d
                ))}
            </div>
    
        </div>
    )
}

export default DataRecopil;