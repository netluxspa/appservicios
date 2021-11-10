
import { TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

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
    },
    form: {
        display: 'grid',
        gap: '10px 0',
        '& > div': {
            display: 'flex',
            justifyContent: 'center'
        }
    }
}))

const ClientData = ({contact, send, go}) => {

    const classes = useStyles();

    return  (
        <div className={classes.cont}>
            <div className={classes.text}>
                <Typography color='textPrimary' variant='h6'>Datos de contacto</Typography>
                <Typography color='textPrimary' variant='paragraph'>
                    Ingresa tus datos de contacto para continuar.
                </Typography>
                <br />
            </div>
            <div className={classes.contItems}>
                <form>
                    <div className={classes.form}>
                        <div>
                            <TextField autoFocus label='RUT' value={contact.persona.rut} onChange={e=>send({...contact, persona: {...contact.persona, rut: e.target.value}})} variant='outlined' size='small'  />
                        </div>
                        <div>
                            <TextField label='NOMBRE' value={contact.persona.nombre} onChange={e=>send({...contact, persona: {...contact.persona, nombre: e.target.value}})} variant='outlined' size='small'  />
                        </div>
                        <div>
                            <TextField label='APELLIDO' value={contact.persona.apellido} onChange={e=>send({...contact, persona: {...contact.persona, apellido: e.target.value}})} variant='outlined' size='small'  />
                        </div>
                        <div>
                            <TextField label='CORREO' value={contact.contacto.email} onChange={e=>send({...contact, contacto: {...contact.contacto, email: e.target.value}})} variant='outlined' size='small'  />
                        </div>
                        <div>
                            <TextField label='TELEFONO' value={contact.contacto.fono} onChange={e=>send({...contact, contacto: {...contact.contacto, fono: e.target.value}})} variant='outlined' size='small'  />
                        </div>
                        <div>
                            <Button onClick={()=>go()} color='primary' size='small' variant='contained'>
                                Continuar
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
            
        </div>

       
    )
}

export default ClientData;