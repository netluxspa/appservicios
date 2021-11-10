import {  useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import ViewDisponibilidad from '../ViewDisponibilidad';
import EditDisponibilidad from '../EditDisponibilidad';
import CrudCitaModule from '../../citas/crud/CrudCitaModule';
import CancelDisponibilidad from '../CancelDisponibilidad';
import CreateCita from '../../citas/CreateCita';
import history from '../../../config/history';


const CrudDisponibilidadModule = ({match, data, out, send, handleCliente, cita_dataInit, createCita, updateCita, cancelCita, anularDisponibilidad}) => {

   

    const [citaSelected, setCitaSelected] = useState(null)

    const [local_cita_dataInit, setLocal_cita_dataInit] = useState({...cita_dataInit, disponibilidad: data.id})


    return (
        <>
        <div >
        
            <Route exact path={match.url} 
                render={()=>
                            <ViewDisponibilidad data={data}
                                cancel={()=>history.push(match.url + '/cancel')}
                                edit={()=>history.push(match.url + '/change')}
                                out={()=>out()}
                                clickHour={(h)=>{ console.log('HHH', h);setLocal_cita_dataInit({...local_cita_dataInit, ...h});history.push(match.url + '/new/cita')}}
                                goCita={c=>{setCitaSelected(c);history.push(match.url + '/cita/' + c.id)}}
                            />
                        }
            />
            <Route exact path={match.url + '/change'} 
                render={()=>
                            data ?
                            <EditDisponibilidad 
                                dataInit={data}
                                id = {data.id}
                                out={()=>history.push(match.url)}
                                send={d=>{send(d)}}
                                // goCita={c=>{setCitaSelected(c);history.push(match.url + '/cita/' + c.id)}}
                            />:
                            <Redirect to={match.url}></Redirect>
                        }
            />
            <Route  path={match.url+'/cita/:id'} 
                render={(props)=>
                            citaSelected ?
                            <CrudCitaModule 
                            cancel={c=>{
                                cancelCita(c); 
                                setTimeout(() => {
                                    history.push(match.url)
                                }, 2000);
                            }}
                            updateCita={c=>{updateCita(c); setCitaSelected(c)}} {...props} data={citaSelected}
                                handleCliente={c=>handleCliente(c)}
                            out={()=>history.replace(match.url)}
                            />:
                            <Redirect to={match.url}></Redirect>
                        }
            ></Route>
            <Route  path={match.url+'/new/Cita'} 
                render={(props)=><CreateCita 
                    create={c=>{
                        createCita(c);
                        setTimeout(() => {
                            history.push(match.url);
                        }, 2000);
                    }} 
                    {...props} 
                    dataInit={local_cita_dataInit} out={()=>history.push(match.url)} />}
            ></Route>

            <Route
                exact 
                path={match.url + '/cancel'}
                render={()=>(
                    <CancelDisponibilidad anularDisponibilidad={()=>anularDisponibilidad()} data={data} out={()=>history.push(match.url)} />
                )}
            />
            </div>
        </>
    )
}

export default CrudDisponibilidadModule;