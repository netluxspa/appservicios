import ContainerLabel from '../../common/ContainerLabel';
import { makeStyles } from '@material-ui/core';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
    wrap:{
        display: 'grid',
        gap:'30px 0',
        padding: '30px 0',
      
    },
    cont: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > div': {
            padding: '5px 20px'
        }
    }
}))

const FormDemandante = ({data, send}) => {

    const classes = useStyles();

    return (
        <div className={classes.wrap}>
            <div>
                <ContainerLabel label='Datos personales'>
                    <div className={classes.cont}>
                        <div>
                            <TextField onChange={e=>send({persona: {rut: e.target.value}})} label='Rut (sin puntos con guión)'  value={data.persona.rut}/>
                        </div>
                        <div>
                            <TextField label='Nombre' onChange={e=>send({persona: {nombre: e.target.value}})}  value={data.persona.nombre}/>
                        </div>
                        <div>
                            <TextField label='Apellido' onChange={e=>send({persona: {apellido: e.target.value}})}  value={data.persona.apellido}/>
                        </div>
                    </div>
                </ContainerLabel>
            </div>
            <div>
                <ContainerLabel label='Datos de contacto'>
                    <div className={classes.cont}>
                        <div>
                            <TextField label='Fono' onChange={e=>send({contacto: {fono: e.target.value}})}  value={data.contacto.fono}/>
                        </div>
                        <div>
                            <TextField label='Email' onChange={e=>send({contacto: {email: e.target.value}})}  value={data.contacto.email}/>
                        </div>
                    </div>
                </ContainerLabel>
            </div>
        </div>
    )
}

export default FormDemandante;