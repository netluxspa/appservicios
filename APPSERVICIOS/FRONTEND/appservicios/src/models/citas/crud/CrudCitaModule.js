import ViewCita from "../ViewCita";
import EditCita from "../EditCita";
import { Route } from "react-router-dom";
import history from "../../../config/history";
import { useState } from "react";
import HistorialCitasList from "../customList/HistorialCitasList";
import CancelCita from "../CancelCita";

const CrudCitaModule = ({match, data, out, handleCliente, updateCita, cancel}) => {

    const [hisotiralCitas, setHistorialCitas] = useState(null)

    return (
        <div>
            <Route 
                exact
                path={match.url}
                render={()=><ViewCita cancelCita={()=>history.push(match.url + '/cancel')} goHistorial={()=>history.push(match.url + '/historial')} updateCita={c=>updateCita(c)} handleCliente={c=>handleCliente(c)} data={data} out={()=>out()} edit={()=>history.push(match.url + '/change')} />}
            />
            <Route 
                exact
                path={match.url + '/change'}
                render={()=><EditCita data={data} out={()=>history.push(match.url)}/>}
            />
            <Route 
                exact
                path={match.url + '/historial'}
                component={()=>(
                    <HistorialCitasList out={()=>history.push(match.url)} data={hisotiralCitas} demandante={data.demandante_detail} send={d=>setHistorialCitas(d)} />
                )}
            />
            <Route 
                exact
                path={match.url + '/cancel'}
                render={()=>(
                    <CancelCita cancel={c=>cancel(c)} cita={data} out={()=>history.push(match.url)} />
                )}
            />
        </div>
    )
}

export default CrudCitaModule;