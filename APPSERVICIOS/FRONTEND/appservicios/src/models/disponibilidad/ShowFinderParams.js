import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import FindReplaceIcon from '@material-ui/icons/FindReplace';

const ShowFinderParams = ({queryParams, sendQueryParams}) => {
    return (
        <div 
        style={{padding:'40px', display: 'flex', justifyContent:'center'}}
        >
        <div>
            
            <div style={{display:'grid', gridTemplateColumns: '1fr 1fr 1fr', gap:'10px 100px'}}>
                
                <div  style={{gridColumn:'1/4'}}>
                    <Typography color='textSecondary' style={{fontSize: '0.9em'}}>
                        Parámetros de búsqueda
                    </Typography>
                    <hr />
                </div>
                <div>
                    <Typography color='textSecondary' style={{fontSize: '0.9em'}}>
                        Fecha
                    </Typography>
                </div>
                <div>
                    <Typography color='textPrimary' style={{fontSize: '0.9em'}}>
                        {queryParams.date}
                    </Typography>
                </div>
                <div>
                    <Typography color='textSecondary' style={{fontSize: '0.9em'}}>
                        Oferente
                    </Typography>
                </div>
                <div>
                    <Typography color='textPrimary' style={{fontSize: '0.9em'}}>
                        {queryParams.oferente.persona.nombre}
                    </Typography>
                </div>
                <div style={{gridRow:'2/4', gridColumn:'3/4'}}>
                    <Button
                        variant='contained'
                        color='primary'
                        // size='small'
                        onClick={()=>sendQueryParams(null)}>
                        <FindReplaceIcon />
                    </Button>
                </div>
            </div>

            
        </div>
       
    </div>
    )
}

export default ShowFinderParams;