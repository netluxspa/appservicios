import HeaderCommon from "../../common/HeaderCommon";
import ContainerLabel from "../../common/ContainerLabel";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { dateTimeObj } from '../../common/DaysFunctions'
import { useState } from "react";
import api from "../../config/api";
import { Headers } from "../../config/headers";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme)=>({
    cont: {
        display: 'grid',
        gap: '20px 0'
    },
    contData: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap:'20px'
    },
    contTime: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap:'0 20px'
    },
    contCancel: {
        display:'grid',
        gap: '15px 0',
        '& > div': {
            // textAlign:'center'
        }
    },

}))

const CancelCita = ({cita, out, cancel}) => {


    const classes = useStyles();

    const [openCancel, setOpenCancel] = useState(false);

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)


    const cancelCitaApi = () => {
        setOpenCancel(false)
        setLoading(true)
        api.patch('/agenda/cita/' + cita.id +'/', 
            {...cita, cancel: true},
            Headers
        ).then(res=> {
            setLoading(false)
            setSuccess(true)
            cancel(res.data)
        }).catch(err=>{
            console.log('eRROR', err)
            setLoading(false)
            setError(true)
        })
    }


    const DataCita = ({cita}) => {


        return (
            <div className={classes.contData}>
                <div>
                    <ContainerLabel label='Cliente'>
                        <Typography color='textPrimary'>
                            {cita.demandante_detail.persona.nombre_completo}
                        </Typography>
                    </ContainerLabel>
                </div>
                <div>
                    <ContainerLabel label='Servicio'>
                        <Typography color='textPrimary'>
                            {cita.servicio_detail.titulo}
                        </Typography>
                    </ContainerLabel>
                </div>
                <div>
                    <ContainerLabel label='Inicio'>
                    <div className={classes.contTime}>
                            <div>
                                <Typography color='textSecondary'>
                                    Día:
                                </Typography>
                                <Typography color='textPrimary'>
                                     {dateTimeObj(cita.inicio).date}
                                </Typography>
                            </div>
                            <div>
                                <Typography color='textSecondary'>
                                    Hora:
                                </Typography>
                                <Typography color='textPrimary'>
                                     {dateTimeObj(cita.inicio).hour}
                                </Typography>
                            </div>
                        </div>
                    </ContainerLabel>
                </div>
                <div>
                    <ContainerLabel label='Final'>
                        <div className={classes.contTime}>
                            <div>
                                <Typography color='textSecondary'>
                                    Día:
                                </Typography>
                                <Typography color='textPrimary'>
                                     {dateTimeObj(cita.final).date}
                                </Typography>
                            </div>
                            <div>
                                <Typography color='textSecondary'>
                                    Hora:
                                </Typography>
                                <Typography color='textPrimary'>
                                     {dateTimeObj(cita.final).hour}
                                </Typography>
                            </div>
                        </div>
                    </ContainerLabel>
                </div>
            </div>
        )
    }

    const RenderCancel = () => {
        return (
            <div className={classes.contCancel}>
                <div style={{textAlign:'center'}}>
                    <Typography color='textPrimary' variant='h6'>
                        Antes de cancelar la cita asegurese de informar a su cliente
                    </Typography>
                </div>
                <div>
                    <ContainerLabel label='Datos de contacto'>
                    <div className={classes.contTime}>
                            <div>
                                <Typography color='textSecondary'>
                                    Fono:
                                </Typography>
                                <Typography color='textPrimary'>
                                     {cita.demandante_detail.contacto.fono}
                                </Typography>
                            </div>
                            <div>
                                <Typography color='textSecondary'>
                                    Correo:
                                </Typography>
                                <Typography color='textPrimary'>
                                    {cita.demandante_detail.contacto.email}
                                </Typography>
                            </div>
                        </div>
                    </ContainerLabel>
                </div>
                <div  style={{textAlign:'center'}}>
                    <Button onClick={()=>setOpenCancel(true)} style={{width:'100%'}} color='secondary'  variant='contained'>Anular cita</Button>
                </div>
            </div>
        )
    }

    const renderReturn = (
        <div className={classes.cont}>
            <div>
                <HeaderCommon out={()=>out()} label='Anular de cita'/>
            </div>

            <div>
            <DataCita cita={cita} />
            </div>

            <div>
                <RenderCancel />
            </div>
        </div>
    )

    const renderConfirmation = (
        <div className={classes.contCancel}>
            <div style={{marginLeft: '15px'}}>
                <Typography color='textPrimary' variant='h6'>
                    Si ya informó a su cliente confirme la anulación
                </Typography>
            </div>
            <div>
                <ContainerLabel label='Datos de contacto'>
                    <div className={classes.contTime}>
                            <div>
                                <Typography color='textSecondary'>
                                    Fono:
                                </Typography>
                                <Typography color='textPrimary'>
                                     {cita.demandante_detail.contacto.fono}
                                </Typography>
                            </div>
                            <div>
                                <Typography color='textSecondary'>
                                    Correo:
                                </Typography>
                                <Typography color='textPrimary'>
                                    {cita.demandante_detail.contacto.email}
                                </Typography>
                            </div>
                        </div>
                    </ContainerLabel>
            </div>
            <div className={classes.contTime}>
                <div style={{textAlign: 'center'}}><Button onClick={()=>setOpenCancel(false)} color='primary'  variant='outlined'>Cancelar</Button></div>
                <div disabled={loading} style={{textAlign: 'center'}}><Button onClick={()=>cancelCitaApi()} color='secondary' variant='contained'>Confirmar anulación</Button></div>
            </div>
        </div>
    )


    const render = () => {
        if (openCancel) {
            return renderConfirmation
        } else {
            if (loading){
                return (
                    <Alert severity='info'>Cancelando Cita</Alert>
                )
            } else if (error){
                console.log('ERROR', error)
                return (
                    <Alert severity='error'>Ocurrio un error</Alert>
                )
            } else if (success) {
                return  <Alert severity='success'>Cita cancelada con exito</Alert>
            } else {
                return renderReturn
            }
        }
    }

    return render()
}

export default CancelCita;