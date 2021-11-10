import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import  { Alert } from '@material-ui/lab';


const borderStyle = 'solid 1px rgba(0,0,0,0.3)'

const useStyles = makeStyles((theme)=>({
    wrap: {
        padding: '20px 0',
        display: 'grid', 
        gap: '30px 0'
    },
    cont: {
        display:'grid', 
        gridTemplateColumns: '1fr',
        '& > div': {
            display:'grid', 
            borderRadius: '4px',
            gridTemplateColumns: '1fr 5fr 4fr',
            borderBottom: borderStyle,
            '& > div': {
              borderRight: borderStyle,
              padding:'0 16px',
              height: '50px',
              display: 'flex',
              alignItems:'center'
            },
            '& > div:last-child': {
              },
            '& > div:first-child': {
                borderLeft: borderStyle,
            }
        },
        '& > div:first-child': {
            borderTop: borderStyle,
        }
    
    },

}))

const ListDemandante = ({data, clickCliente}) => {

    const classes = useStyles();
    
    const headers = ['Seleccionar', 'Nombre', 'Rut'];

    const Headers = ({headers}) => {
        return (
            <div>
            { headers.map(h=>(
                    <div key={h}>
                        <Typography color='textSecondary'>
                            {h}
                        </Typography>
                        
                    </div>
                ))}
            </div>
        )
    }
    
    const OneDemandante = ({demandante}) => {
        return (
            <div>
                <div>
                    <Button onClick={()=>clickCliente(demandante)} color='primary' size='small' variant='contained'>
                        <ArrowForwardIosIcon  />
                    </Button>
                </div>
                <div>
                     <Typography color='textPrimary'>
                        {demandante.persona.nombre_completo}
                    </Typography>
                </div>
                <div>
                    <Typography color='textPrimary'>
                        {demandante.persona.rut}
                    </Typography>
                </div>
            </div>
        )
    }

    const renderData = (
        <div className={classes.cont}>
            <Headers headers={headers} />
            { data.map(d=>(
                    <OneDemandante key={d.id} demandante={d} />
                ))}
        </div>
    )


    const NoData = () => {
        return (
            <div>
                <Alert severity='info'>
                    No hay clientes asociados a este rut. Compruebe que esté bien escrito o cree un nuevo cliente.
                </Alert>
             
            </div>
        )
    }

    return (
        <>
        <div className={classes.wrap}>
            <div>
                {data.length ? renderData : <NoData ></NoData>}
            </div>
        </div>
        </>
    )
}

export default ListDemandante;