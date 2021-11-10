import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { dateTimeObj, fullDate } from "../../common/DaysFunctions";


const shadow = '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'


const useStyles = makeStyles((theme)=> ({
    contSuccess: {
        padding: '60px 80px',
        '& > div': {
            boxShadow:shadow,
            borderRaadius: '4px',
            padding: '80px',
            background: 'white',
            // display:'flex',
            // flexDirection: 'column',
            // alignItems: 'center',
            '@media (max-width:780px)': {
                padding: '20px 16px',
              
            }
        },
        '@media (max-width:780px)': {
            padding: '0',
        }
    },
    contItems: {
        borderRadius: '4px',
        margin:'auto',
        border: 'solid 1px rgba(0,0,0,0.1)',
        width: '60%',

        '& > div:not(:last-child)': {
            borderBottom: '1px solid rgba(0,0,0,0.1)',
        },
        '& > div': {
            padding: '8px 16px',
        },
        '@media (max-width:780px)': {
            width: '100%',
        }
    }
}));

const SuccessSchedule = (props) => {

    console.log(props)

    const classes = useStyles();

    const  demandante =  props.data.demandante_detail.persona.nombre_completo

    const  oferente =  props.data.disponibilidad_detail.oferente_detail.persona.nombre_completo

    const inicio = fullDate(dateTimeObj(props.data.inicio).date) + ' a las ' + dateTimeObj(props.data.inicio).hour

    const servicio = props.data.servicio_detail.titulo

    const direccion = props.data.direccion

    const Item = ({label, value}) => {
        return (
            <div>
                <div>
                    <Typography color='textSecondary'  style={{fontWeight: 'lighter'}}>{label}</Typography>
                </div>
                <div>
                <Typography color='textPrimary' variant='h6' style={{fontWeight: 'lighter'}}>{value}</Typography>
                </div>
            </div>
        )
    }

    const Items = () => {
        return (
            <div className={classes.contItems}>
                <Item label='Cliente' value={demandante} />
                <Item label='Prestado' value={oferente} />
                <Item label='Servicio' value={servicio} />
                <Item label='Hora' value={inicio} />
                <Item label='Dirección' value={direccion} />
            </div>
        )
    }


    return (
        <div className={classes.contSuccess}>
            <div>
                <br />
                <div>
                    <Typography align='center' style={{fontWeight: 'lighter'}} variant='h4'>
                        Tu cita ha sido reservada
                    </Typography>
                </div>
                <br />
                <br />
                <div>
                    <Items />
                </div>
                <br />
                <br />
                <div>
                    <Typography align='center' style={{fontWeight: 'lighter'}} variant='h4'>
                        Te esperamos!
                    </Typography>
                </div>
                <br />

            </div>
        </div>

    )
}

export default SuccessSchedule;