import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import  { Alert } from '@material-ui/lab';

const borderStyle = 'solid 1px rgba(0,0,0,0.3)'

const useStyles = makeStyles((theme)=>({
    cont: {
        display: 'grid', 
        gridTemplateColumns: '1fr 3fr 1fr',
        borderTop: borderStyle,
        borderLeft: borderStyle,
        borderRadius: '4px',
        backgrounColor:'rgba(0,0,0,0.3)',
        '& > div': {
            backgroundColor: 'white',
            padding: '15px',
            borderBottom: borderStyle,
            borderRight: borderStyle,
            display: 'flex',
            alignItems:'center'
        },
        '& > div:last-child': {
            borderRadius: '0 0 4px 0',
        }
    },

}))

const ListServicio = ({servicios, clickServicio}) => {

    const classes = useStyles();

    const headers = ['Seleccionar', 'Servicio', 'Duración (minutos)'];

    const Headers = ({headers}) => {
        return (
            <>
            { headers.map(h=>(
                    <div key={h} className={classes.header}>
                        <Typography color='textSecondary'>
                            {h}
                        </Typography>   
                        
                    </div>
                ))}
            </>
        )
    }

    const OneServicio = ({servicio}) => {
        return (
            <>
                <div>
                    <Button onClick={()=>clickServicio(servicio)} color='primary' size='small' variant='contained'>
                        <ArrowForwardIosIcon  />
                    </Button>
                </div>
                <div>
                     <Typography color='textPrimary'>
                        {servicio.titulo}
                    </Typography>
                </div>
                <div>
                    <Typography color='textPrimary'>
                        {servicio.tiempo}
                    </Typography>
                </div>
            </>
        )
    }

    const renderData = (
        <div className={classes.cont}>
            <Headers headers={headers} />
            { servicios.map(s=>(
                    <OneServicio key={s.id} servicio={s} />
                ))}
        </div>
    )

    const NoData = () => {
        return (
            <div>
                <Alert severity='info'>
                    No hay servicios. Cree un nuevo cliente.
                </Alert>
             
            </div>
        )
    }

    return (
        <>
            <div >
                <div>
                    {servicios.length ? renderData : <NoData />}
                </div>
            </div>
        </>
    )
}

export default ListServicio;