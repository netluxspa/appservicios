import { useEffect, useState } from "react";
import { ApiService } from "../../services";
import RenderErrors from '../../common/RenderErrors';
import Loading from '../../common/Loading';
import { dateTimeObj, fullDate } from '../../common/DaysFunctions'
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles(()=>({
    cont: {
        display: 'grid',
        gridTemplateColumns: '2fr 3fr',
        '@media(max-width: 780px)': {
            gridTemplateColumns: '1fr',
        }
    },
    text: {
        padding: '35px 30px',
        '@media(max-width: 780px)': {
            padding: '10px 15px 20px 15px',
        }
    },
    contItems: {
        padding: '35px 30px',
        '@media(max-width: 780px)': {
            padding: '10px 15px 20px 15px',
        }
    }
}))

const ClientOptions = ({match, service, selectOption}) => {

    const classes = useStyles();

    const date = match.params.date

    
    const [state, setState] = useState(
        {
            data: {
                date: '',
                options: []
            },
            loading: false,
            errors: false,
        }
    )


    // GET DATA 
    useEffect(()=>{
        setState(s=>({...s, loading:true}))
        const getOptions = ApiService.post('/agenda/get-client-options/', JSON.stringify({date: date, servicio: service.id})).subscribe({
            next(x) {
                setState(s=>({
                    ...s,
                    data: x,
                    loading: false,
                    errors: false
                    
                }))
            },
            err(x) {
                setState(s=>({
                    ...s,
                    loading: false,
                    errors: x,
                }))
            }
        })
        return (
            ()=> {
                getOptions.unsubscribe()
            }
        )
    },[date, service])


    const RenderContent = ({data}) => {
            

        return (
            <>
              
                <div className={classes.cont}>
                    <div className={classes.text}>
                        <Typography color='textPrimary' variant='h6'>Selecciona una hora</Typography>
                        <Typography color='textPrimary' variant='paragraph'>
                            Selecciona una  hora disponible para continuar.
                        </Typography>
                        <br />
                    </div>
                    <div >
                        <div className={classes.contItems}>
                            <div>
                                <Typography variant='overline' color='textPrimary'>
                                    {fullDate(data.date)}
                                </Typography>
                            </div>
                            <div >
                                {data.options.map((o, i)=>(
                                    <div key={i} style={{borderBottom: 'solid 1px rgba(0,0,0,0.08)', padding: '10px 0', display:'grid', gap:'10px', gridTemplateColumns:'1fr 2fr 1fr'}}>
                                        <div>
                                            <Typography  color='textPrimary'>
                                                {dateTimeObj(o.form.inicio).hour} 
                                            </Typography>
                                            
                                        </div>
                                        <div>
                                            <Typography color='textSecondary' style={{fontSize:'0.8em'}}>
                                                {o.extra.oferenteName} 
                                            </Typography>
                                            
                                        </div>
                                        <div>
                                            <Button onClick={()=>selectOption(o)} size='small' color='primary' variant='outlined'>
                                                <Typography variant='overline' color='primary' style={{fontSize:'0.75em'}}  >
                                                    Seleccionar
                                                </Typography>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </>

           
        )
    }


    const renderReturn = () => {
        const { loading, errors, data } = state
        if (loading){
            return <Loading />
        } else {
            if (errors) {
                return <RenderErrors errors={errors} />
            } else  {
                return <RenderContent data={data} /> 
            }
        }
    }

    return renderReturn();
}

export default ClientOptions;