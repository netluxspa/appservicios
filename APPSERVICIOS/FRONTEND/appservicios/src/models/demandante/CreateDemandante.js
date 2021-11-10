import { Button } from "@material-ui/core";
import FormDemandante from "./FormDemandante";
import RenderErrors from '../../common/RenderErrors';
import { useState } from "react";
import api from "../../config/api";
import { Headers } from "../../config/headers";
import { Alert } from "@material-ui/lab";


const CreateDemandante = ({data, send, create}) => {


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
            return <Alert severity='success'>Cliente creado con éxito.</Alert>
        } else if (error500){
            return <Alert severity='error'>Revise la conexión a internet.</Alert>
        } else {
            return null
        }
    } 

    const save = () => {
        api.post('/main/demandante/', 
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

    return (
        <div style={{display:'grid', gap:'10px 0', padding: '10px 0'}}>
            <div style={{textAlign: 'right'}}>
                <Button onClick={()=>save()} color='primary' variant='contained' size='small'>Guardar</Button>
            </div>
            <div>
               <RenderApiResults apiResults={apiResults} />
            </div>
            <div>
                <FormDemandante send={d=>send(d)}  data={data} />
            </div>
        </div>
    )
}

export default CreateDemandante;