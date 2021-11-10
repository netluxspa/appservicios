import api from '../../config/api';
import { Headers } from '../../config/headers';
import { useState, useEffect } from 'react';
import { Button, Typography } from '@material-ui/core';
import FindReplaceIcon from '@material-ui/icons/FindReplace';


const SelectorBox = ({send, selected}) => {

    

    const [data, setData] = useState(null);

    const [openList, setOpenList] = useState(false)

    useEffect(()=>{
            getData()
    }, [])

    useEffect(()=>{
        if (!selected && data && data.length === 1){
            send(data[0])
        }
    }, [selected, data, send])

    const getData = () => {
        api.get('/main/box/', 
        Headers
        ).then(res=>{
            setData(res.data)
           
        })
    }

    const showList = (
        <div>
            {
                data ?
                <div style={{display:'grid', gap: '10px'}}>
                    { data.map(o=>(
                            <div  key={o.id} style={{display:'grid', gridTemplateColumns: '1fr 1fr'}}>
                                <div>
                                    {o.id}
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


    const selectedObject = selected && data && data.length ? data.find(o=>o.id===selected) : null


    const showSelected = (
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div>
                <Typography color='textPrimary' style={{fontSize: '0.9em'}}>
                    Box Nº {selectedObject && selectedObject.codigo ? selectedObject.codigo : 'Selecciona un box'}
                </Typography>
            </div>
            <div style={{marginLeft:'20px'}}>
                <Button
                    disabled={!data || data.length <= 1}
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

export default SelectorBox;