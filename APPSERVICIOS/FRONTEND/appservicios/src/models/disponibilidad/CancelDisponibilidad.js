import { useEffect, useState } from "react";
import HeaderCommon from "../../common/HeaderCommon";
import { ApiService } from "../../services";
import { Button, makeStyles, Typography } from "@material-ui/core";
import ContainerLabel from '../../common/ContainerLabel';
import { dateTimeObj } from "../../common/DaysFunctions";
import RenderErrors from '../../common/RenderErrors';
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme)=>({
    cont: {
        display:'grid', 
        gridTemplateColumns: '1fr 1fr',
        gap:'20px',
        padding: '30px 0'
    },
    contTime: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap:'0 20px'
    },
    suggestion: {
        display: 'grid',
        gap: '20px 0'
    }
}))

const CancelDisponibilidad = ({data, out, anularDisponibilidad}) => {
    
    const [openCancel, setOpenCancel] = useState(null)
    const classes = useStyles();

    const [subscriptionPut, setSubscriptionPut] = useState(null)

    const [apiState, setApiState] = useState({
        loading: false, 
        error: false, 
        error505: false,
        success: false
    })


    const updateDisponibilidad = () => {
        setApiState({loading:true, success: false, error: false})
        setSubscriptionPut(
            ApiService.put(
                '/agenda/disponibilidad/' + data.id + '/',
                {oferente: data.oferente, box: data.box, inicio: data.inicio.replace('Z', ''), final: data.final.replace('Z', ''), cancel: true}
            ).subscribe({
                next(x) {
                    setApiState({loading:false, success: true, error: false})
                }, 
                error(err) {setApiState({loading:false, success: false, error: err})},
            })
        )
    }



    useEffect(()=>{
        return (()=>{
            if(apiState.success){
                anularDisponibilidad()
            }
            if (subscriptionPut){
                subscriptionPut.unsubscribe()
            }
        })
    }, [subscriptionPut, anularDisponibilidad, apiState.success]);



    const ShowData = () => {
        return (
            <div className={classes.cont}>
                <div>
                   <ContainerLabel label='Oferente'>
                       <Typography color='textPrimary'>
                            {data.oferente_detail.persona.nombre_completo}
                       </Typography>
                   </ContainerLabel>
                </div>
                <div>
                   <ContainerLabel label='Box'>
                       <Typography color='textPrimary'>
                            {data.box_detail.codigo}
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
                                        {dateTimeObj(data.inicio).date}
                                </Typography>
                            </div>
                            <div>
                                <Typography color='textSecondary'>
                                    Hora:
                                </Typography>
                                <Typography color='textPrimary'>
                                        {dateTimeObj(data.inicio).hour}
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
                                        {dateTimeObj(data.final).date}
                                </Typography>
                            </div>
                            <div>
                                <Typography color='textSecondary'>
                                    Hora:
                                </Typography>
                                <Typography color='textPrimary'>
                                        {dateTimeObj(data.final).hour}
                                </Typography>
                            </div>
                        </div>
                   </ContainerLabel>
                </div>
            </div>
        )
    }

    const Suggestion = () => {
        return (
            <div className={classes.suggestion}>
                <div>
                    <Typography align='center' color='textPrimary' variant='h6'>
                        Informe al oferente. Si hay citas agendadas deberá anularlas para continuar.
                    </Typography>
                </div>
                <div className={classes.cont}>
                    <div>
                        <ContainerLabel label='Fono'>
                            <Typography color='textPrimary'>
                                    {data.oferente_detail.contacto.fono}
                            </Typography>
                        </ContainerLabel>
                    </div>
                    <div>
                        <ContainerLabel label='Correo'>
                            <Typography color='textPrimary'>
                                    {data.oferente_detail.contacto.email}
                            </Typography>
                        </ContainerLabel>
                    </div>
                </div>
                <div align='center'>
                    <Button onClick={()=>setOpenCancel(true)} color='secondary' variant='contained'>Anular disponibilidad</Button>
                </div>
            </div>
        )
    }

    const Confirmation = () => {

        const confirmationContent = (
            <div>
                <div>
                    <Typography align='center' color='textPrimary' variant='h6'>
                         Si la disponibilidad no tiene citas agendadas podrá ser anulada. Recuerde notificar al oferente.
                    </Typography>
                </div>
                <div className={classes.cont}>
                    <div>
                        <ContainerLabel label='Fono'>
                            <Typography color='textPrimary'>
                                    {data.oferente_detail.contacto.fono}
                            </Typography>
                        </ContainerLabel>
                    </div>
                    <div>
                        <ContainerLabel label='Correo'>
                            <Typography color='textPrimary'>
                                    {data.oferente_detail.contacto.email}
                            </Typography>
                        </ContainerLabel>
                    </div>
                    <div align='center'>
                        <Button disabled={ apiState.success === true} onClick={()=>{if(subscriptionPut){subscriptionPut.unsubscribe()}; setOpenCancel(false); setApiState({loading: false, error: false, success: false})}} color='primary' variant='outlined'>
                            Cancelar
                        </Button>
                    </div>
                    <div align='center'>
                        <Button disabled={apiState.loading ===true || apiState.success === true} onClick={()=>updateDisponibilidad()} color='secondary' variant='contained'>
                            Anular 
                        </Button>
                    </div>
                </div>
            </div>
        )

        return (
            <>
                {confirmationContent}
                <ApiResults />
            </>
        )
    }

    const ApiResults = () => {
        const { loading, error, success } = apiState;
        if (loading){
            return <Typography variant='h5' color='primary'>Anulando disponibilidad ...</Typography>
        } else if (error){
            return <RenderErrors errors={error} />
        } else if (success) {
            return (
                <div>
                    <div>
                        <Alert severity='success'>La disponibilidad ha sido anulada con éxito.</Alert>
                    </div>
                    <br />
                    <div align='center'>
                        <Button onClick={()=>anularDisponibilidad()} color='primary' variant='outlined'>Aceptar</Button>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }

    const renderBefore= (
        <div>
            <div>
                <HeaderCommon label='Anular disponibilidad' out={()=>out()} />
            </div>
            <ShowData />
            <Suggestion />
        </div>
    )




    return openCancel ? <Confirmation /> : renderBefore
}

export default CancelDisponibilidad;