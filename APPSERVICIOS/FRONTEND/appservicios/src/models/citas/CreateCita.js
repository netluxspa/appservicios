import FormCita from "./FormCita";
import HeaderCommon from "../../common/HeaderCommon";
import history from "../../config/history";
import { Route } from "react-router-dom";
import SelectorDemandanteModule from "../demandante/crud/SelectorDemandanteModule";
import SelectorServicioModule from "../servicio/crud/SelectorServicioModule";
import { useState } from "react";
import api from "../../config/api";
import { Alert } from "@material-ui/lab";
import RenderErrors from "../../common/RenderErrors";
import {Headers} from '../../config/headers';
import { Button } from "@material-ui/core";

const CreateCita = ({match, out, dataInit, create}) => {

    const [data, setData] = useState(dataInit);

    const [apiResults, setApiResults] = useState({
        errors: null, 
        success: null,
        error500: null
    })

    const RenderApiResults = ({apiResults}) => {
        const {errors, success, error500} = apiResults
        if (errors){
            return <RenderErrors errors={errors} />
        } else if (success) {
            return <Alert severity='success'>Cita creada con éxito.</Alert>
        } else if (error500){
            return <Alert severity='error'>Revise la conexión a internet.</Alert>
        } else {
            return null
        }
    }

    const dataPrepared = data => {
        var response = {}

        if (typeof data === 'object'){
            const keys = Object.keys(data)
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                if (typeof data[key] === 'object'){
                    response = {...response, [key]: data[key].id}
                } else {
                    response = {...response, [key]: data[key]}
                }
            }
            return response;
        }else {
            return {}
        }
    }

    const save = () => {
        api.post('/agenda/cita/', 
            dataPrepared(data), 
            Headers
        ).then(res=>{
            create(res.data)
            setApiResults({
                errors: null, 
                success: true,
                error500: null
            })
        }).catch(err=>{
            if (err && err.response && err.response.data) {
                setApiResults({
                    errors: err.response.data, 
                    success: null,
                    error500: null
                })
            } else {
                setApiResults({
                    errors: null, 
                    success: null,
                    error500: true
                })
            }
        })
    }


    const clickCliente = c => {
        setData({...data, demandante: c});
        history.push(match.url)
    }

    const clickServicio = s => {
        setData({...data, servicio: s});
        history.push(match.url)
    }

    const recibeData = d => {
        console.log('recibeData', d)
        if (typeof d==='object') {
            const key = Object.keys(d);
            setData({...data, [key]:d[key]})
        }
    }



    return (
        <div>
            

            <Route exact path={match.url} render={()=>
                <>
                    <HeaderCommon label='Nueva cita' out={()=>out()} />
                    <div>
                        <div style={{textAlign:'right'}}>
                            <Button onClick={()=>save()} color='primary' size='small' variant='contained'>Guardar</Button>
                            <br/>
                            <br/>
                        </div>
                        <div>
                            <RenderApiResults apiResults={apiResults} />
                        </div>
                    </div>
                    <div>
                        <FormCita 
                        findCliente={()=>history.push(match.url + '/cliente')} 
                        findServicio={()=>history.push(match.url + '/servicio')} 
                        send={d=>recibeData(d)}
                        data={data} 
                        />
                    </div>
                </>
            } />
             <Route  path={match.url + '/cliente'} render={(props)=>
                <>
                    <SelectorDemandanteModule 
                        create={c=>{setTimeout(() => {
                            clickCliente(c)
                            }, 2000); }} 
                        clickCliente={c=>clickCliente(c)} 
                        out={()=>history.push(match.url)} 
                        {...props} 
                    />
                </>
            } />
              <Route  path={match.url + '/servicio'} render={(props)=>
                <>
                    <SelectorServicioModule 
                        create={c=>{setTimeout(() => {
                                clickServicio(c)
                            }, 2000); }} 
                        clickServicio={c=>clickServicio(c)} 
                        out={()=>history.push(match.url)} {...props} 
                    />
                </>
            } />

            
        </div>
    )
}
export default CreateCita;