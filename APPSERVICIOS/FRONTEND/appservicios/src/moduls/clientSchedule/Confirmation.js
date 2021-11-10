import { useState } from "react";
import { ApiService } from "../../services"
import { Button, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core";
import { fullDate, dateTimeObj } from "../../common/DaysFunctions";
import RenderErrors from "../../common/RenderErrors";
import Loading from "../../common/Loading";

const useStyles = makeStyles((theme)=>({
   cont: {
       padding: '0 30px',
    display: 'grid',
    gridTemplateColumns: '4fr 3fr',
    '@media(max-width: 780px)': {
        gridTemplateColumns: '1fr',
        padding: '0 10px',
    },
},
contButton: {
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center'
}
}));

const Confirmation = ({demandante, servicio, form, confirmate}) => {

    const classes= useStyles();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(false);

    const body = JSON.stringify({
        demandante: demandante,
        inicio: form.form.inicio.replace('Z', ''),
        disponibilidad: form.form.disponibilidad,
        servicio: servicio.id,
    })

    console.log('body', body)


    const saveCita = body => {
        setLoading(true)
        setTimeout(() => {
            ApiService.post('/agenda/cita-by-demandante/', body).subscribe({
                next(x) {
                    setLoading(false)
                    setErrors(false)
                    confirmate(x)
                },
                error(x) {
                    setLoading(false)
                    setErrors(x)
                }
            })
        }, 1000);
       
    }


    function capitalize(word) {
        return word[0].toUpperCase() + word.slice(1);
      }

    const OFUpper = value =>{
        return capitalize(value.toLowerCase())
    }


    return (
        <div className={classes.cont}>
            <div>
                <Typography variant='h5'>
                    Confirma tu reserva
                </Typography>
                <br />
                <Typography  parapgraph>
                    <b> {OFUpper(demandante.persona.nombre)+ ' ' + OFUpper(demandante.persona.apellido)} </b>
                    estás punto de reservar una hora para <b>{servicio.titulo}</b> con <b>{form.extra.oferenteName}</b> el 
                    dia  <b>{fullDate(dateTimeObj(form.form.inicio).date)} a las {dateTimeObj(form.form.inicio).hour} </b>
                </Typography>
                <br />
                <br />
            </div>
            <div className={classes.contButton}>
                <div>
                    <RenderErrors errors={errors} />
                    <br/>
                </div>
                <div style={{display:'flex', justifyContent:'center', alignItems: 'center'}}>
                    
                    {loading ?  <Loading /> : <Button disabled={loading || !(errors===false)} onClick={()=>saveCita(body)} color='primary' size='small' variant='contained'>
                        Confirmar
                    </Button>}
                </div>
            </div>
        </div>
    )
}

export default Confirmation;