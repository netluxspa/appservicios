import { useState } from 'react';

import SelectorOferente from "../oferente/SelectorOferente";
import DatePicker from '../../common/DatePicker';
import { formatDate } from '../../common/DaysFunctions';
import { Typography, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';


const FinderDisponibilidad = ({sendQueryParams, queryParams}) => {


    const [oferente, setOferente] = useState(
        queryParams && queryParams.oferente
        ?
        queryParams.oferente
        :
        null
    )
    const [date, setDate] = useState(
        queryParams && queryParams.date
        ?
        queryParams.date
        :
        (new Date()).getFullYear() + '-' + formatDate((new Date()).getMonth() + 1) + '-' + formatDate((new Date()).getDate())
    )

    const params = {
        oferente: oferente ? oferente : null,
        date: date,
    }

    return (
        <div 
        style={{padding:'40px', display: 'flex', justifyContent:'center'}}
        >
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr',gap:'20px 100px'}}>
                <div style={{gridColumn: '1/4'}}>
                    <Typography color='textSecondary' style={{fontSize: '0.9em'}}>
                        Defina parámetros de búsqueda
                    </Typography>
                    <hr />
                </div>
                <div>
                    <Typography color='textSecondary' style={{fontSize: '0.9em'}}>
                        Oferente
                    </Typography>
                </div>
                <div style={{margin:'0 8px'}}>
                    <SelectorOferente send={o=>setOferente(o)} selected={oferente && oferente.id ? oferente.id : null} />
                </div>
                <div>
                    <Typography color='textSecondary' style={{fontSize: '0.9em'}}>
                        Fecha
                    </Typography>
                </div>
                <div>
                    <DatePicker sendDate={d=>setDate(d)} />
                </div>
                <div style={{gridColumn:'3/4', gridRow:'2/3'}}>
                    <Button 
                        color='primary'
                        variant='contained'
                            onClick={()=>{sendQueryParams(params)}}
                        >
                        <SearchIcon />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FinderDisponibilidad;