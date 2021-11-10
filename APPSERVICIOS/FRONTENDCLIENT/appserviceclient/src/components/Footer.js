import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';


const useStyles = makeStyles((theme)=>({
    contFooter: {
        padding: '20px 100px 80px 100px',
        background: '#f6f6f6',
        '@media (max-width:780px)': {
            padding: '0 16px 60px 16px'
        }
    },
    contCentros: {
        padding: '0 16px',
        background: '#f6f6f6',
        '@media (max-width:780px)': {
            padding: '0 8px',
        }
    },
    contItem: {
        display: 'flex',
        alignItems:'center',
        '& >div:first-child': {
            margin: '0 8px 0 0',
        },
        '& >div': {
            margin: '0 0 8px 0',
        }
    }
}))

const Footer = ({centros}) => {

    const classes = useStyles();

    const Sucursales = () => {


        return (
            <>
            <br />
            <br />
                <div>
                    <div style={{background: 'rgba(0,0,0,0.2)', height: '1px', width: '100%' }} ></div>
                    <br />
                    <br />  

                    <div>
                        <Typography variant='h5' color='textSecondary'>
                            Sucursales
                        </Typography>
                    </div>
                    <br />
                    {centros?  centros.map(c=>(
                        <div key={c.id} className={classes.contCentros}>
                     
                                <div className={classes.contItem}>
                                    <div>
                                        <HomeIcon color="disabled" />
                                    </div>
                                    <div>
                                        <Typography style={{fontWeight: 'lighter'}} variant='h6' color='textSecondary'>
                                            {c.nombre}
                                        </Typography>
                                    </div>
                                </div>
                               
                    
                        


                            <div className={classes.contItem}>
                                <div>
                                    <LocationOnIcon color="disabled" />
                                </div>
                                <div>
                                    <Typography style={{fontWeight: 'lighter'}} variant='h6' color='textSecondary'>
                                    {c.direccion.calle + ' ' + c.direccion.numero + ' ' + c.direccion.comuna + ' ' + c.direccion.region}
                                    </Typography>
                                </div>
                            </div>



                            <div className={classes.contItem}>
                                <div>
                                    <MailOutlineIcon color="disabled" />
                                </div>
                                <div>
                                    <Typography style={{fontWeight: 'lighter'}} variant='h6' color='textSecondary'>
                                        {c.contacto.email}
                                    </Typography>
                                </div>
                            </div>
                            

                            <div className={classes.contItem}>
                                <div>
                                    <LocalPhoneIcon color="disabled" />
                                </div>
                                <div>
                                    <Typography style={{fontWeight: 'lighter'}} variant='h6' color='textSecondary'>
                                        {c.contacto.fono}
                                    </Typography>
                                </div>
                            </div>
                            <br></br> 
                            <div style={{background: 'rgba(0,0,0,0.1)', height: '1px', width: '100%' }} ></div>
         
                        </div>
                    )) : null}
                </div>
            </>
        )
    }

    return (
        <div className={classes.contFooter}>
            <Sucursales />
        </div>
    )
}
export default Footer;