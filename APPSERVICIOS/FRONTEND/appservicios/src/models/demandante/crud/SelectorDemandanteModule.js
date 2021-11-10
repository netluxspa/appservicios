
import { Route } from "react-router-dom";
import ListDemandante from "../ListDemandante";
import CreateDemandante from "../CreateDemandante";
import HeaderCommon from "../../../common/HeaderCommon";
import FilterDemandantes from '../FilterDemandantes';
import api from '../../../config/api';
import { Headers } from "../../../config/headers";
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import history from "../../../config/history";

const SelectorDemandanteModule = ({match, out, clickCliente, create}) => {

    const [demandantes, setDemandantes] = useState([])
    const [filteredDemandantes, setFilteredDemandantes] = useState([])


    const [newDemandante, setNewDemandante] = useState(
        {
            persona: {
                nombre: '',
                apellido: '',
                rut: '',
                pagina: localStorage.getItem('site')
            },
            contacto: {
                fono: '',
                email: ''
            }
        }
    )

    useEffect(()=> {
        getDemandantes()
    }, [])

    const getDemandantes = () => {
        api.get('/main/demandante', 
            Headers
        ).then(res=>{
            setDemandantes(res.data)
            setFilteredDemandantes(res.data)
        })
    }

   const createCliente = () => {
        history.push(match.url + '/new')
   }

   const updateDemandante = d => {
       if (typeof d === 'object'){
            const key = Object.keys(d)[0];
            if (typeof d[key] === 'object'){
                const key2 = Object.keys(d[key]);
                setNewDemandante({...newDemandante, [key]: {...newDemandante[key], [key2]: d[key][key2]}})
            }
            
       } 
   }

   const applayFilter = f => {
        setNewDemandante({...newDemandante, persona: {...newDemandante.persona, rut: f}})
        if (!f){
            setFilteredDemandantes(demandantes)
        } else {
            var filterData = [...demandantes].filter(d=>d.persona.rut.includes(f))
            setFilteredDemandantes(filterData)
        }
}


    return (
        <div>
            <Route exact path={match.url} render={()=>
                demandantes ?
                <>
             
                    <HeaderCommon label='Seleccione un cliente' out={()=>out()}/>
                    <br />
                    <FilterDemandantes applayFilter={d=>applayFilter(d)} data={newDemandante.persona.rut}/>
                    <div style={{textAlign: 'right'}}>
                        <br />
                        <Button disabled={newDemandante.persona.rut ? false:true} onClick={()=>createCliente()} style={{marginBottom:'30px'}} color='primary' size='small' variant='contained'>Crear nuevo cliente</Button>
                    </div>
                    <ListDemandante createCliente={rut=>createCliente(rut)} clickCliente={c=>clickCliente(c)} data={filteredDemandantes} />
                </>:
                null
            } />
            <Route exact
                path={match.url + '/new'}
                render={()=>
                    <>
                        <HeaderCommon label='Nuevo cliente' out={()=>history.push(match.url)}/>
                        <CreateDemandante create={c=>create(c)} send={d=>updateDemandante(d)} data={newDemandante} />
                    </>
                }
            />
        </div>
    )
}

export default SelectorDemandanteModule;