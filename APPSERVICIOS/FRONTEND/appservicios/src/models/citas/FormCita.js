import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import ContainerLabel from '../../common/ContainerLabel';
import DateTimePicker from '../../common/DateTimePicker';

const useStyles = makeStyles((theme)=>({
    cont: {
        padding: '30px 0',
        display: 'grid', 
        gap: '30px 0'
    },
    itemForeing: {
        display:'flex',
        justifyContent:'space-between'
    }
}))

const FormCita = ({data, findCliente, findServicio, send}) => {

    console.log('FormCita data' , data)

    const classes = useStyles();;

    return (
        <div className={classes.cont}>

            <div>
               <ContainerLabel label='Inicio'>
                    <DateTimePicker send={d=>send({inicio: d})} dataInit={data.inicio} />
               </ContainerLabel>
            </div>

            <div >
                <ContainerLabel label='Cliente'>
                    <div className={classes.itemForeing}>
                        <div>
                            <Typography color='textPrimary'>
                                {data && data.demandante ? data.demandante.persona.nombre_completo : 'Seleccione un cliente'}
                            </Typography>
                        </div>
                        <div>
                            <Button onClick={()=>findCliente()} color='primary' variant='contained' size='small'>
                            { data && data.demandante ? 'Cambiar cliente' : 'Seleccionar cliente' }
                            </Button>
                        </div>
                    </div>
                </ContainerLabel>
            </div>


            <div >
                <ContainerLabel label='Servicio'>
                    <div className={classes.itemForeing}>
                        <div>
                            <Typography color='textPrimary'>
                                {data && data.servicio ? data.servicio.titulo : 'Seleccione un servicio'}
                            </Typography>
                        </div>
                        <div>
                            <Button onClick={()=>findServicio()} color='primary' variant='contained' size='small'>
                            { data && data.servicio ? 'Cambiar servicio' : 'Seleccionar servicio' }
                            </Button>
                        </div>
                    </div>
                </ContainerLabel>
            </div>

        </div>
    )
}

export default FormCita;