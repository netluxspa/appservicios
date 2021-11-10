import {  useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { limitWeek } from '../../common/DaysFunctions';
import api from '../../config/api'; 
import history from '../../config/history'
import Schedule from './Schedule';
import { Alert } from '@material-ui/lab';
import CreateDisponibilidad from '../../models/disponibilidad/CreateDisponibilidad';
import { makeStyles } from "@material-ui/core/styles";
// import ViewEditDisponibilidad from '../../models/disponibilidad/ViewEditDisponibilidad';
import CrudDisponibilidadModule from '../../models/disponibilidad/crud/CrudDisponibilidadModule';

import { formatHour } from '../../common/DaysFunctions';
import { Button, Typography } from '@material-ui/core';

import  { days } from '../../common/DaysFunctions'



const useStyles = makeStyles((theme) => ({
    headerDisponibilidad: {
      backgroundColor: theme.palette.primary.main,
      borderRadius: '4px',
      padding: '10px 20px',
      color:'white',
      margin:'0 0 20px 0',
      fontWeight:'bold'
  }
  }));


const ScheduleModule = ({match}) => {



    const [data, setData] = useState(null);

    const [queryParams, setQueryParams] = useState(null);


        const getSchedule = (params) => {
            if (params && params.oferente && params.date){
                var body = limitWeek(new Date(params.date))
                body.oferente = params.oferente.id 
                api.post('/agenda/get-schedule/', 
                body,
                {
                headers: {"Content-Type": "application/json"}
                }
                ).then(res=>{
                    setData(res.data)
                })
            }

        }

        const recibeQueryParams = (params) => {
            setQueryParams(params)
            getSchedule(params);
        }

        const [initDisponibilidad, setInitDisponibilidad] = useState(null)

        const clickHour = h => {
            console.log('hour', h)
            const new_disponibilidad = {
                inicio:h.day.day.date + 'T' + formatHour(h.hour),
                final:h.day.day.date + 'T' + formatHour(h.hour + 1)
            }

            setInitDisponibilidad({data:new_disponibilidad, data2: h.day.day})
            history.push(match.path + '/disponibilidad/new')
        }

        const [selectedDisponibilidad, setSelectedDisponibilidad] = useState(null)
        


        const addNewDisponibilidad = (d) => {
            setSelectedDisponibilidad({...selectedDisponibilidad, data: d})
            console.log('selectedDisponibilidad', selectedDisponibilidad)
            const hint = d.inicio.split('T')[0]
            var new_data = [...data]
            var change_this = new_data.find(i=>i.day.date === hint)
            var edit = change_this.disponibilidades.find(i=>i.id===d.id)
            if (edit){
                let pos = change_this.disponibilidades.indexOf(edit)
                change_this.disponibilidades[pos] = d
                setTimeout(() => {
                    setData(new_data)
                    history.push(match.path + '/disponibilidad/view/' + d.id)
                }, 1000);
            } else{
                change_this.disponibilidades.push(d)
                setTimeout(() => {
                    setData(new_data)
                    history.push(match.path)
                }, 1000);
            }
            
            
            
        }

        const addCita = c => {
            getSchedule(queryParams)
            setClienteSelected(null)
            const cita = selectedDisponibilidad.data.cita.find(i=>i.id === c.id)
            if (cita){
                var new_citas = [...selectedDisponibilidad.data.cita];
                const pos = new_citas.indexOf(cita);
                new_citas[pos] = c;
                setSelectedDisponibilidad({...selectedDisponibilidad, data: {...selectedDisponibilidad.data, cita: new_citas}})
            } else {
                setSelectedDisponibilidad({...selectedDisponibilidad, data: {...selectedDisponibilidad.data, cita: [...selectedDisponibilidad.data.cita, c]}})
            }
                        
        }


        const [clienteSelected, setClienteSelected] = useState(null)

        const handleCliente = c => {
            console.log('handleCliente', c)
            setClienteSelected(c)
            history.push(match.url)
        }

        const ClienteSelected = ({c}) => {
            if (c){
                return (
                    <div style={{margin: '0 0 20px 0', display:'flex', justifyContent:'space-between', width:'100% important'}}>
                        <div style={{width:'100%'}}>
                            <Alert style={{display:'flex'}} severity='info'>
                                <Typography style={{fontSize:'0.9em'}} color='textSecondary'>Cliente seleccionado: {c.demandante.persona.nombre}</Typography>
                                <Typography style={{fontSize:'0.9em'}} color='textSecondary'>Oferente seleccionado: {c.oferente.persona.nombre}</Typography>
                                <Typography style={{fontSize:'0.9em'}} color='textPrimary'>Seleccione un período disponible para crear la cita.</Typography>
                                
                            </Alert>
                        </div>
                        <div style={{padding:'5px 0 0 10px'}}>
                            <Button onClick={()=>setClienteSelected(null)} variant='outlined' size='small' color='primary'>Remover</Button>
                        </div>
                        
                    </div>
                )
            }else{
                return null
            }
            
        }





        const HeaderDisponibilidad = ({day}) => {
            const classes = useStyles();
            if (day){

                
                return (
                    <div>
                        <div className={classes.headerDisponibilidad}>
                            <Typography>
                                {days[day.day]}    {' '}{' '}  {day.date} 
                           </Typography>
                        </div>
                    
                    </div>
                )
            } else{
                return null
            }
        }


        const cancelCita = c => {
            getSchedule(queryParams);
            setSelectedDisponibilidad({
                ...selectedDisponibilidad,
                data: {
                    ...selectedDisponibilidad.data,
                    cita: [...selectedDisponibilidad.data.cita].filter(i=>i.id!==c.id),
                    cita_cancel: Array.isArray(...selectedDisponibilidad.data.cita_cancel) ?
                        [...selectedDisponibilidad.data.cita_cancel].push(c) 
                        :
                        [c]
                }
            })
            
        }

        const anularDisponibilidad = () =>{
            getSchedule(queryParams)
            setSelectedDisponibilidad(null)
        }


    return (
        <div style={{padding: '10px 20px'}}>
            <ClienteSelected c={clienteSelected} />
            <Route exact path={match.path} component={()=><Schedule clickDisponibilidad={d=>{setSelectedDisponibilidad(d); console.log('asdasddASDASD', d);history.push(match.url + '/disponibilidad/view/' + d.data.id)}} clickHour={h=>clickHour(h)} data={data} queryParams={queryParams} sendQueryParams={d=>recibeQueryParams(d)}/>}></Route>
            
            <div>
  
                
                <Route exact path={match.path + '/disponibilidad/new'} 
                render={
                    ()=>
                    initDisponibilidad ?
                    <div>
                        <HeaderDisponibilidad day={initDisponibilidad.data2} />
                        <CreateDisponibilidad 
                        send={d=>addNewDisponibilidad(d)} 
                        dataInit={initDisponibilidad.data} 
                        out={()=>history.push(match.path)}/> 
                     </div>
                     :
                    <Redirect to={match.path}></Redirect>}></Route>
                {/* <Route  path={match.path + '/disponibilidad/view/:id'} component={(props)=>selectedDisponibilidad ? <ViewEditDisponibilidad {...props} send={d=>addNewDisponibilidad(d)} out={()=>history.push(match.path)} data={selectedDisponibilidad} />: <Redirect to={match.path}></Redirect>}></Route> */}
                <Route  path={match.path + '/disponibilidad/view/:id'} 
                render={
                    (props)=>selectedDisponibilidad ? 
                 
                       <div>
                            <HeaderDisponibilidad day={selectedDisponibilidad.data2} />
                            <CrudDisponibilidadModule 
                            anularDisponibilidad = {()=>anularDisponibilidad()}
                            cancelCita={c=>cancelCita(c)}
                            updateCita={c=>addCita(c)}
                            createCita={c=>addCita(c)}
                            cita_dataInit={clienteSelected ? clienteSelected : { oferente: selectedDisponibilidad.data.oferente_detail, disponibilidad: selectedDisponibilidad.data.id }}
                            handleCliente={c=>handleCliente(c)} 
                            send={d=>addNewDisponibilidad(d)} {...props} 
                            out={()=>history.push(match.path)} 
                            data={selectedDisponibilidad.data} />
                        </div>
                   
     
                    : 
                    <Redirect to={match.path}></Redirect>}>

                 </Route>
            </div>
        </div> 
    )
}

export default ScheduleModule;

