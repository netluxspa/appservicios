import { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import history from "../../config/history";
import ListService from "../../models/servicio/crud2/ListService";
import ClientCalendar from "./ClientCalendar";
import ClientData from "./ClientData";
import Confirmation from "./Confirmation";
import Steper from "./Steper";
import DataRecopil from "./DataRecopil";
import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";


import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import SuccessSchedule from "./SuccessSchedule";



const useStyles = makeStyles((theme)=>({
    contTotal: {
        padding: '30px',
        margin: '30px',
        borderRadius:'4px',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        background: 'white',
        '@media(max-width: 780px)': {
            padding: '0',
            margin: '0',
            boxShadow: 'none'
        }
    },
    dataRecopil: {
        borderRadius: '4px',
        margin: '10px 0 0 0',
        background: 'rgba(245, 245, 245)',
        // border: 'solid 1px rgba(0,0,0,0.09)',
        padding: '10px 30px',
        display:'grid',
        gridTemplateColumns: '4fr 1fr',
        gap: '10px',
        '@media (max-width: 780px)': {
            gridTemplateColumns: '1fr',
            padding: '10px 10px',
        }
    },
    contChildrens: {
        width: '70%',
        margin: 'auto',
        '@media(max-width: 780px)': {
            width: '100%',
            padding:'0 10px'
        }
    }
}))




const ClientSchedule = ({match}) => {



    const componentsOfModule = [
        {
            key: match.url + '/calendar',
            title: 'Hora',
        },
        {
            key: match.url + '/contact',
            title: 'Contacto',
        },
        {
            key: match.url + '/confirmation',
            title: 'Confirmar',
        }
    ]

    const componentActiveKey = history.location.pathname
    

    const classes= useStyles();
    
    const [selectedService, setSelectedService] = useState(null)

    const [form, setForm]  = useState(null)

    const [contact, setContact] = useState({
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
    })


    const [dataSuccess, setDataSuccess] = useState(null)

    const validateContact = contact => {
        
        if (typeof(contact)==='object'){
            
            const keys1 = Object.keys(contact);
            if (keys1.length > 1){
                for (let index = 0; index < keys1.length; index++) {
                    const key1 = keys1[index];
                    if (typeof(contact[key1])==='object'){
                        const keys2 = Object.keys(contact[key1]);
                        if (keys2.length > 1){
                            for (let index = 0; index < keys2.length; index++) {
                                const key2 = keys2[index];
                                if (contact[key1][key2]===''){
                                    console.log('wooork asdasdasd', contact[key1])
                                    return false
                                }
                            }
                        }else{
                            return false;
                        }
                    }else {
                        return false;
                    }
                }

                return true;

            } else {
                return false
            }
        } else {
            return false
        }
    }

    
    const dataRecopil = (
       <div style={{padding:'10px 0'}}>
           
                <div className={classes.dataRecopil}>
                    <div>
                        <DataRecopil servicio={selectedService}  form={form} demandante={contact}/>
                    </div>
                    <div>
                        <Button onClick={()=>history.push(match.url + '/confirmation')} disabled={!validateContact(contact)} color='primary' size='small' variant='contained'>
                            Reservar
                        </Button>
                    </div>
                </div>
         
        </div>
       
    ) 


    const formProcess = 
    history.location.pathname !== match.url + '/success' ?
    (
        <div className={classes.contTotal}>
       
            
        <Steper go={p=>{if(!history.location.pathname.includes(p))(history.push(p))}} items={componentsOfModule} activeItemKey={componentActiveKey} />

        {/* 1 SELECCIONAR SERVICIO  */}
        <div className={classes.contChildrens}>
        <Route 
            exact
            path={match.url}
            render={(props)=>
                !selectedService ?
                <>
                    <ListService {...props} 
                        params={{
                            agendable: true
                        }} 
                        select={d=>{setSelectedService(d); history.push(match.url + '/calendar')}}
                    />
                </> 
                :
                <Redirect to={match.url + '/calendar'} />
            }
        />

        <Route 
            
            path={match.url + '/calendar'}
            render={(props)=>
                selectedService ?
                <>
                    {dataRecopil}
                   
                    <ClientCalendar {...props} selectOption={o=>{ setForm(o); history.push(match.url + '/contact')}} service={selectedService} />
                </>
                :
                <Redirect to={match.url} />
            }
        />


        <Route path={match.url + '/contact'}
            render={()=>
                selectedService && form ?
                <>
                    {dataRecopil}
                    <div>
                        <Button onClick={()=>history.push(match.url)} color='primary' size='small'>
                            <KeyboardReturnIcon />
                        </Button>
                    </div>
                    <ClientData go={()=>history.push(match.url + '/confirmation')} send={d=>setContact(d)} contact={contact}/> 
                </>
                :
                <Redirect to={match.url} />
            }    
        />

        <Route 
            path={match.url + '/confirmation'}
            render={()=>
                validateContact(contact) && selectedService && form? 
                <>
                     <div style={{padding: '10px 0'}}>
                        
                        <Button onClick={()=>history.push(match.url + '/contact')} color='primary' size='small'>
                            <KeyboardReturnIcon />
                        </Button>
                    </div>
                    <Confirmation demandante={contact} servicio={selectedService} form={form} confirmate={d=>confirmateSuccess(d)}/>
                </>
                :
                <Redirect to={match.url  + '/contact'} />
            }
        />
        </div>

      


    </div>
    ) : null
    

    const confirmateSuccess = d => {
        setDataSuccess(d);
        history.push(match.url + '/success')
    }


    return (
       <div>
           <Route path={match.url} 
                render={()=>(
                    formProcess
                )}
           />

           <Route path={match.url + '/success'} 
                render={()=>
                    dataSuccess ?
                    <SuccessSchedule data={dataSuccess} /> :
                    <Redirect to={match.url} />
                }
           />
       </div>
    )
}

export default ClientSchedule;