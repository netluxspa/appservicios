import { useEffect, useState } from "react";
import api from "../config/api";
// import RenderErrors from "./RenderErrors";
import { Headers } from "../config/headers";
import { Observable } from 'rxjs';
import axios from 'axios';


const cancelTokenSource = axios.CancelToken.source();


const ApiComponent = ({path, params, body, id, send}) => {

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)





    useEffect(()=>{
        const subscription = getData.subscribe(r=>console.log(r));
        return (()=>{
            subscription.unsubscribe();
        })
    });


    const getData = new Observable(observer=>{
            const request = api.get(path, {cancelToken: cancelTokenSource.token}, {params: params}, Headers)
            .then(res=> {
                observer.next(res.data);
                observer.complete()
            })
            .catch(err=> {
                observer.error(err)
            })
            return (()=>{cancelTokenSource.cancel()})

    })

 

    const renderReturn = () => {
        if (loading){
            return (
                <div>
                    Cargando...
                </div>
            )
        } else {
            if (error) {
                return (
                    <div>
                        Error api
                    </div>
                )
            } else if(success) {
                return (
                    <div>
                        Exito api
                    </div>
                )
            } else {
                return (
                    <div>
                        Error desconocido
                    </div>
                )
            }
        }
    }

    return renderReturn()


}

export default ApiComponent;