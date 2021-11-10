import { Route } from "react-router-dom";
import HeaderCommon from "../../../common/HeaderCommon";
import { Headers } from "../../../config/headers";
import api from "../../../config/api";
import ListServicio from "../ListServicio";
import CreateServicio from "../CreateServicio";
import { useEffect, useState } from "react";
// import { Button } from "@material-ui/core";

import history from "../../../config/history";


const SelectorServicioModule = ({match, out, clickServicio}) => {

    const [servicios, setServicios] = useState([])

    useEffect(()=>{
        getServicios()
    }, [])


    const getServicios = () => {
        api.get('/main/servicio/',
            Headers
        ).then(res=>{
            setServicios(res.data)
        })
    }


    return (
        <div>
            <Route exact
                path={match.url}
                render={()=>(
                    <>
                        <HeaderCommon label='Seleccionar servicio' out={()=>out()} />
                        <div style={{textAlign: 'right'}}>
                            {/* <br />
                            <Button onClick={()=>history.push(match.url + '/new')} color='primary' size='small' variant='contained'>Crear nuevo servicio</Button>
                            <br /> */}
                            <br />
                        </div>
                        <ListServicio servicios={servicios} clickServicio={s=>clickServicio(s)}/>
                    </>
                )}
            />

            <Route exact
                path={match.url + '/new'}
                render={()=>(
                    <>
                        <HeaderCommon label='Nuevo servicio' out={()=>history.push(match.url)} />
                        <CreateServicio />
                    </>
                )}
            />
        </div>
    )
}

export default SelectorServicioModule;