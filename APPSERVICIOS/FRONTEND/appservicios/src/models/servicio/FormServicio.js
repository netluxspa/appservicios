import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import ContainerLabel from "../../common/ContainerLabel";

const useStyles = makeStyles((theme)=>({
    cont:{
        padding: '20px 0',
        display:'grid',
        gridTemplateColumns: '1fr 1fr',
        gap:'30px'
    }
}))

const FormServicio = ({data, send}) => {

    const classes = useStyles();

    return (
        <div className={classes.cont}>
            <div>
                <ContainerLabel label='Servicio'>
                    <TextField onChange={e=>send({titulo: e.target.value})} value={data && data.titulo ? data.titulo : ''}  style={{width:'100%'}}  label='Nombre del servicio' size='small' type='text'/>
                </ContainerLabel>
            </div>
            <div>
                <ContainerLabel label='Duración'>
                    <TextField onChange={e=>send({tiempo: e.target.value})} value={data && data.tiempo ? data.tiempo : ''}   style={{width:'100%'}} label='Duración (minutos)' size='small' type='number' />
                </ContainerLabel>
            </div>
        </div>
    )
}

export default FormServicio;