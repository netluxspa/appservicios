import { useState } from "react";
import ViewDisponibilidad from "./ViewDisponibilidad";
import EditDisponibilidad from "./EditDisponibilidad";
import ViewCita from "../citas/ViewCita";
import { Route, Redirect } from 'react-router-dom';

import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { Button, Typography } from "@material-ui/core";
// import VisibilityIcon from '@material-ui/icons/Visibility';
// import EditIcon from '@material-ui/icons/Edit';
import history from "../../config/history";


const classes = {
    itemHeader: {
        marginRight: '20px'
    }
} 


const ViewEditDisponibilidad = ({match, data, send, out}) => {

    console.log('match', match)

    const [openEdit, setOpenEdit] = useState(false)

    const [citaSelected, setCitaSelected] = useState(null)

    const header = (
        <div style={{display:'flex', alignItems:'center'}}>
            {out ?
                <div style={classes.itemHeader}>
                    <Button onClick={()=>out()} color='primary' variant='contained' size='small'>
                        <KeyboardReturnIcon />
                    </Button>
                </div>
                :
                null
            }
            
            {openEdit ?
                <>
                    <div style={classes.itemHeader}>
                        <Typography variant='h5' color='textPrimary'>
                            Modificar disponibilidad
                        </Typography>
                    </div>
                    {/* <div style={classes.itemHeader}>
                        <EditIcon color='primary' />
                    </div> */}
                    <div style={classes.itemHeader}>
                        <Button onClick={()=>setOpenEdit(false)} color='primary' variant='outlined' size='small'>
                            No modificar
                        </Button>
                    </div>
                </>
                :
                <>
                    <div style={classes.itemHeader}>
                        <Typography variant='h5' color='textPrimary'>
                            Disponibilidad
                        </Typography>
                    </div>
                    {/* <div style={classes.itemHeader}>
                        <VisibilityIcon  color='primary' />
                    </div> */}
                    <div style={classes.itemHeader}>
                        <Button onClick={()=>setOpenEdit(true)} color='primary' variant='outlined' size='small'>
                            Modificar
                        </Button>
                    </div>
                </>
            }

        </div>
    )

    const clickCita = cita => {
        console.log('"clickCita"', cita)
        console.log('"citaSelected"', citaSelected)
        setCitaSelected(cita);
        history.push(match.url + '/cita/'+cita.id )
    }

    const renderReturn = (
       
          <div style={{padding:'10px 30px'}}>
          {header}
          <hr />
          <div>
            {
                openEdit ?
                <EditDisponibilidad dataInit={data}  id={data.id} send={d=>send(d)}/>
                :
                <ViewDisponibilidad data={data} goCita={cita=>clickCita(cita)}/>
            }
        </div>
       </div>
    ) 

    return (
        <div>
            <Route exact path={match.url} component={()=>renderReturn}></Route>
            <Route exact  path={match.url + '/cita/:id'}  component={(props)=>citaSelected ? <ViewCita cita={citaSelected} {...props} out={()=>history.push(match.url)} /> : <Redirect to={match.url}></Redirect>}></Route>
        </div>
    )
}

export default ViewEditDisponibilidad;