import HeaderCommon from "../../common/HeaderCommon";
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { Button, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core";
import ContainerLabel from "../../common/ContainerLabel";
import { TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import api from '../../config/api';
import {Headers} from '../../config/headers';
import PairLabel from '../../common/PairLabel';
import { dateTimeObj } from "../../common/DaysFunctions";

const useStyles = makeStyles((theme) => ({    
   contHeader: {
       display: 'flex',
       justifyContent: 'flex-end',
       '& > *': {
           margin: '0 10px 0 0'
       }
    },
    cont: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px'
    },
    text: {
        gridColumn: '1/3'
    },
    screeninfo: {
        width:'100%',
        height: '50px',
        display: 'flex', 
        alignItems: 'center',
        padding: '0 20px'
    }
   
}));

const ViewCita = ({data, match, out, edit, handleCliente, updateCita, goHistorial, cancelCita}) => {

    const classes = useStyles();

    const [observacion, setObservacion] = useState(data.observacion)
    const [observacionD, setObservacionD] = useState(false)
    const [savedObs, setSavedObs] = useState(false);

    useEffect(()=>{
        const x = setTimeout(() => {
        if (observacionD){
            patchObs(data, observacion, updateCita);
        }
        }, 1000);
        return (()=>{
            clearTimeout(x)
        })
    }, [data, observacion, updateCita, observacionD]);


    const patchObs = (data, observacion, update) => {
        setSavedObs(true);
        setTimeout(() => {
            api.patch('/agenda/cita/' + data.id + '/', 
        {...data, observacion: observacion},
        Headers
        ).then(res=> {
            setObservacionD(false)
            update(res.data)
            setSavedObs(false)
        })
        }, 1000);
        
    }

    const ShowData = (
        <div className={classes.cont}>
            <div style={{gridColumn: '1/3'}}>
                <PairLabel 
                    obj1={{label: 'Inicio', value: dateTimeObj(data.inicio).hour}}
                    obj2={{label: 'Final', value: dateTimeObj(data.final).hour}}
                />
            </div>
            <div>
                <ContainerLabel label='Cliente'>
                    <Typography color='textPrimary'>
                        {data.demandante_detail.persona.nombre}
                    </Typography>
                </ContainerLabel>
            </div>
            <div>
                <ContainerLabel label='Servicio'>
                    <Typography color='textPrimary'>
                        {data.servicio_detail.titulo}
                    </Typography>
                </ContainerLabel>
            </div>



            <div className={classes.text}>
                <div style={{textAlign: 'right'}}>
                    <Button onClick={()=>goHistorial()} color='primary' size='small' variant='contained'>Historial de citas</Button>
                </div>
                <div className={classes.screeninfo}>
                    {savedObs ? <>
                        <SaveIcon style={{marginRight:'8px'}} color='primary' /> 
                        <Typography variant='overline' color='textSecondary'>Guardando</Typography>
                    </> : null} 
                </div>
                <ContainerLabel label='Observacion' special={true}>
                    <TextField
                        style={{width: '100%'}}
                        multiline
                        maxRows={10}
                        minRows={4}
                        value={observacion ? observacion : ''}
                        onChange={e=>{setObservacion(e.target.value); setObservacionD(true)}}
                    />
                </ContainerLabel>
            </div>
        </div>
    )

    return (    
        <div>
            <HeaderCommon label='Cita' out={()=>out()} />
            <div className={classes.contHeader}>
                <Button onClick={()=>handleCliente({demandante: data.demandante_detail, oferente: data.disponibilidad_detail.oferente_detail})} color='secondary' variant='outlined' size='small'>Nueva cita</Button>
                <Button  onClick={()=>edit()} color='primary' variant='contained' size='small'>Editar</Button>
                <Button  onClick={()=>cancelCita()} color='secondary' variant='contained' size='small'>Cancelar cita</Button>
                <EditIcon color='primary' />
            </div>
            <br />
            <div>
                {data ? ShowData : null}
            </div>
        </div>
    )
}

export default ViewCita;