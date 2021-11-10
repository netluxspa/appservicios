import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import history from "../config/history";

const useStyles = makeStyles((theme)=>({
    actionCard : {
        padding: '80px',
        '@media (max-width: 780px)': {
            padding: '80px 16px'
        }
    }
}))

const ActionCard = ({action_card}) => {

    const classes = useStyles();

    return (
        <div className={classes.actionCard}>
           <div>
               <Typography align='center' style={{fontWeight: 'lighter'}} variant='h3'>{action_card.titulo}</Typography>
               <br />
               <Typography align='center' style={{fontWeight: 'normal'}} variant='h6' >{action_card.parrafo}</Typography>
                <br />
                <br />
            <div style={{display: 'flex', justifyContent:'center'}}>
                <Button onClick={()=>history.push('/reservar')} style={{textTransform: 'none'}} color='primary' variant='contained' size='large'>Reservar ahora</Button>
            </div>
               
           </div>
        </div>
    )
}

export default ActionCard;