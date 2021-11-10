import { Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import history from "../config/history";

const shadow = '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'

const useStyles = makeStyles((theme)=>({
    contNav: {
        padding: '9px 9px 9px 30px',
        boxShadow: shadow,
        position:'sticky',
        display:'flex',
        justifyContent:'space-between',
        top: '0',
        zIndex:'90000',
        background: 'white',
        '@media(max-width: 780px)': {
            padding: '10px',
        }
    },
    logo: {
        cursor: 'pointer',
        padding: '5px 0px',
        display: 'flex',
        alignItems:'flex-end',
        '& > div:last-child': {
            margin: '0 0 0 7px'
        },
        '@media(max-width:780px)': {
            display: 'block',
            '& > div:last-child': {
                margin: '0 0 0 0px'
            },
        },
    
    },


}))

const Nav = ({pagina}) => {

    const classes = useStyles();

    const {titulo, subtitulo, extra_action_info} = pagina
 
    return (
        <div className={classes.contNav}>
            <div onClick={()=>history.push('/')}  className={classes.logo}>
                <div>
                    <Typography style={{fontWeight:'normal', margin:'0 !important', padding: '0'}} color='textPrimary' variant='h5'>{titulo}</Typography> 
                </div>
                <div>
                    <Typography style={{fontWeight:'lighter',  margin:'0 !important', padding: '0'}}  color='textSecondary'> {subtitulo}</Typography> 

                </div>
            </div>
           
            <div >
                
                <div>
                    <Button onClick={()=>history.push('/reservar')} color='primary' variant='contained' size='large'  style={{textTransform: 'none', position:'relative'}}> 
                        Reserva ahora
                        <div style={{position:'absolute', padding: '5px 10px',boxShadow: shadow,  background: 'white', zIndex: '7000', right: '0', left: '0', top: '100%', borderRadius: '4px'}}>
                            <Typography style={{fontWeight:'lighter', fontSize: '0.8em',  margin:'0 !important', padding: '0', textAlign: 'left'}}  color='textPrimary'> {extra_action_info}</Typography> 
                        </div>
                    </Button>
                </div>
            </div>
        </div>
        
    )
}

export default Nav;