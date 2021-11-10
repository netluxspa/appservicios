import api from '../../config/api';
import { Headers } from '../../config/headers';
import { useState, useEffect } from 'react';
import { Button, Typography } from '@material-ui/core';
import FindReplaceIcon from '@material-ui/icons/FindReplace';


const SelectorOferente = ({send, selected}) => {

    

    const [oferentes, setOferentes] = useState(null);

    const [openList, setOpenList] = useState(false)

    useEffect(()=>{
            getOferentes()
    }, [])

    useEffect(()=>{
        if (!selected && oferentes && oferentes.length === 1){
            send(oferentes[0])
        }
    }, [selected, oferentes, send])

    const getOferentes = () => {
        api.get('/main/oferente/', 
        Headers
        ).then(res=>{
            setOferentes(res.data)
           
        })
    }

    const showList = (
        <div>
            {
                oferentes && Array.isArray(oferentes) ?
                <div style={{display:'grid', gap: '10px'}}>
                    { oferentes.map(o=>(
                            <div  key={o.id} style={{display:'grid', gridTemplateColumns: '1fr 1fr'}}>
                                <div>
                                    {o.persona.nombre + ' ' + o.persona.apellido}
                                </div>
                                <div>
                                    <Button
                                        color='primary'
                                        variant='outlined'
                                        onClick={()=>{send(o); setOpenList(false)}}
                                    >
                                        <FindReplaceIcon />
                                    </Button>
                                </div>
                            </div>
                        ))}
                </div>
                :
                null
            }
        </div>
    )


    const selectedObject = selected && oferentes && oferentes.length ? oferentes.find(o=>o.id===selected) : null


    const showSelected = (
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div>
                <Typography color='textPrimary' style={{fontSize: '0.9em'}}>
                    {selectedObject && selectedObject.persona && selectedObject.persona.nombre ? selectedObject.persona.nombre : 'Selecciona un oferente'}
                </Typography>
            </div>
            <div style={{marginLeft:'20px'}}>
                <Button
                    disabled={!oferentes || oferentes.length <= 1}
                    color='primary'
                    variant='outlined'
                    onClick={()=>setOpenList(true)}
                >
                    <FindReplaceIcon />
                </Button>
            </div>
        </div>
    )

    return (
        openList ? showList : showSelected
    )
}

export default SelectorOferente;