import FormDisponibilidad from "./FormDisponibilidad";
import { Button } from "@material-ui/core";
import { useState } from "react";
import { Alert } from "@material-ui/lab";
import RenderErrors from "../../common/RenderErrors";
import api from "../../config/api";
import HeaderCommon from "../../common/HeaderCommon";

const EditDisponibilidad = ({dataInit, send, id, out}) => {

    console.log('data Init Edit Disp', dataInit)

    const [data, setData] = useState(dataInit)

    const [apiResults, setApiRresults] = useState(
        { 
             apiSuccess: null,
             apiErrors: null,
        }
     ) 

     const update = () => {
        console.log('work success')

        api.patch('/agenda/disponibilidad/' + id + '/', 
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
                        Disponibilidad modificada con éxito.
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

    

    const recibeData = (d) => {
        const key = Object.keys(d)[0]
        setData({...data, [key]: d[key]})
    }


    return (
        <div>
            <HeaderCommon label='Editar disponibilidad' out={()=>out()} />
        <div style={{display: 'grid', gap:'10px', padding: '20px 0'}}>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
                <Button onClick={()=>update()} color='primary' size='small' variant='contained'>
                    Guardar cambios
                </Button>
            </div>
            {
                resultsApi()
            }
            <div>
                <FormDisponibilidad 
                data={
                    {...data, 
                        inicio: data.inicio.replace('Z', ''),
                        final: data.final.replace('Z', ''),
                    }
                    } 
                        send={d=>recibeData(d)} 
                />
            </div>
        </div>
        </div>
    )
}

export default EditDisponibilidad;