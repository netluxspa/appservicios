import { Button } from "@material-ui/core";
import { useState } from "react";

import api from "../../config/api";
import { Headers } from "../../config/headers";
import FormDisponibilidad from "./FormDisponibilidad";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import RenderErrors from "../../common/RenderErrors";
import { Alert } from "@material-ui/lab";
import HeaderCommon from "../../common/HeaderCommon";

const CreateDisponibilidad = ({dataInit, out, send}) => {


    const [data, setData] = useState(dataInit)

    const [apiResults, setApiRresults] = useState(
        { 
             apiSuccess: null,
             apiErrors: null,
        }
     ) 


    const recibeData = (d) => {
        const key = Object.keys(d)[0]
        setData({...data, [key]: d[key]})
    }

    const save = () => {
        api.post('/agenda/disponibilidad/', 
        data,
        Headers
        ).then(res=>{
            send(res.data)
            setApiRresults({apiErrors: null, apiSuccess: true})
        }).catch(err=>{
            if ( err && err.response && err.response.data){
                setApiRresults({apiSuccess: null, apiErrors: err.response.data})
            }else {
                setApiRresults({apiSuccess: null, apiErrors: {'Internet': ['Compruebe conexión a internet']}})
            }
        })
    }

    const resultsApi = () => {
        if (apiResults.apiSuccess){
            return (
                <div  style={{marginTop:'10px'}}>
                    <Alert severity='success'>
                        Disponibilidad creada con éxito.
                    </Alert>
                </div>
            )
        } else if(apiResults.apiErrors){
            return (
                <div style={{marginTop:'10px'}}>
                    <RenderErrors  errors={apiResults.apiErrors} />
                </div>
            )
        } else {
            return null
        }
    }


    return (
        <div>
            <HeaderCommon label='Nueva disponibilidad' out={()=>out()} />
            <br />
            <div style={{display: 'flex', justifyContent:'flex-end', alignItems:'center'}}>
                
                <Button style={{margin:'0 10px 0 0'}} onClick={()=>save()} color='primary' size='small' variant='contained'>Crear</Button>
                <AddCircleOutlineIcon color='primary' />
            </div>
            {
                resultsApi()
            }
  
            <div>
                <FormDisponibilidad data={data} send={d=>recibeData(d)} />
            </div>
        </div>
    )
}

export default CreateDisponibilidad;