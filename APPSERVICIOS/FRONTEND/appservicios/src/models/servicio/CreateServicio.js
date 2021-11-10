import FormServicio from "./FormServicio";
import { Button } from "@material-ui/core";
import { useState } from "react";
import RenderErrors from "../../common/RenderErrors";
import { Alert } from "@material-ui/lab";
import api from "../../config/api";

const CreateServicio = ({create}) => {

    const [data, setData] = useState({})

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
            return <Alert severity='success'>Servicio creado con éxito.</Alert>
        } else if (error500){
            return <Alert severity='error'>Revise la conexión a internet.</Alert>
        } else {
            return null
        }
    }

    const save = () => {
        api.post('/main/servicio/', 
            data, 
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

    const recibeData = d => {
        if (typeof d === 'object'){
            const key = Object.keys(d)[0];
            setData({...data, [key]: d[key]})
        }
    }

    return (
        <div style={{display:'grid', gap:'10px 0', padding: '10px 0'}}>
            <div>
                <div style={{textAlign: 'right'}}>
                    <Button onClick={()=>save()}  color='primary' variant='contained' size='small'>Guardar</Button>
                </div>
            </div>
            <div>
               <RenderApiResults apiResults={apiResults} />
            </div>
            <div>
                <FormServicio send={d=>recibeData(d)}  data={data} />
            </div>
        </div>
    )
}

export default CreateServicio;