import { useEffect } from "react";
import HeaderCommon from "../../../common/HeaderCommon";
import api from "../../../config/api";
import { Headers } from "../../../config/headers";
import ContainerLabel from "../../../common/ContainerLabel";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { dateTimeObj } from "../../../common/DaysFunctions";

const useStyles = makeStyles((theme)=>({
    cont: {
        display: 'grid',
        gap: '30px 0'
    },
    contCitas: {
        display: 'grid',
        '& >div:first-child': {
            borderTop: 'none',
        }
        
    },
    itemCitas: {
        display: 'grid',
        gridTemplateColumns: '1fr 7fr',
        borderTop: 'solid 1px rgba(0,0,0,0.2)',

    },
    textoCita:{
        padding:'0 20px 30px 20px'

    },
    dateCita:{
        borderRight: 'solid 1px rgba(0,0,0,0.2)',
        gridRow: '1/5',
        padding:'5px 20px'
    },
    servicioCita:{
        padding:'5px 20px'
    }

}))


const HistorialCitasList = ({demandante, out, data, send}) => {
    const classes = useStyles();

    useEffect(()=>{
        if (!data) {
            getData(demandante.id)
        }
    })

   const getData = id => {
       api.get('/agenda/cita/?demandante=' + demandante.id,
            Headers
       ).then(res=> {
           send(res.data)
       })
   }

   const OneCita = ({cita}) => {
       return (
           <div className={classes.itemCitas}>
               <div className={classes.dateCita}> 
                   <Typography color='textPrimary' variant='h6'>
                        {dateTimeObj(cita.inicio).date}
                   </Typography>
                </div>
                <div className={classes.servicioCita}>
                    <Typography color='textSecondary' variant='h6'>
                         {cita.servicio_detail.titulo}
                    </Typography>
                </div>
                <div className={classes.textoCita}>
                    <Typography color='textPrimary' >
                         {cita.observacion ? cita.observacion : 'Sin observaciónes.'}
                    </Typography>
                </div>
                
           </div>
       )
   }


   const ListCitas = ({citas}) => {
       if (citas && citas.length > 0){
           return (
               <div className={classes.contCitas}>
                   {citas.map(c=>(
                       <OneCita cita={c} />
                   ))}
               </div>
           )
       }else{
            return (
                <Typography color='textSecondary' variant='h6'>
                    No hay citas
                </Typography>
            )
       }
   }


    return (
        <div className={classes.cont}>
            <div>
                <HeaderCommon out={()=>out()} label='Historial de citas'/>
            </div>
            <div>
                <ContainerLabel label='Cliente'>
                    <Typography color='textPrimary' variant='h6'>
                        {demandante.persona.nombre_completo}
                    </Typography>
                </ContainerLabel>
            </div>
            <div>
                <ContainerLabel  label='Historial de citas'>
                   <ListCitas citas={data} />
                </ContainerLabel>
            </div>
        </div>
    )
}

export default HistorialCitasList;