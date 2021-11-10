import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';


const TextCard = ({text_card}) => {



    const useStyles = makeStyles({
        gridCont: {
            padding: '0 80px',
            display: 'grid',
            gap: '40px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            '@media (max-width: 780px)': {
                padding: '0 16px',
            }
        },
        cont: {
            padding: '70px 0',
            '@media (max-width: 780px)': {
                padding: '50px 0',
            }
        }
      });

    const classes = useStyles();

    return (
        <div className={classes.cont}>
            {
                text_card && text_card.titulo_main ? 
                <Typography align='center' variant='h3' style={{fontWeight: 'lighter'}} color='textPrimary'>
                   {text_card.titulo_main}
                </Typography>
                :
                null
            }
               
        <br />
        <br />
               <div className={classes.gridCont}>
                    <div>
                        <Typography style={{fontWeight: 'normal'}} variant='h5' color='textPrimary'>{text_card.titulo1}</Typography>
                        <br />
                        <Typography style={{fontWeight: 'lighter'}} paragraph color='textSecondary'>{text_card.parrafo1}</Typography>
                    </div>
                    <div>
                        <Typography style={{fontWeight: 'normal'}} variant='h5' color='textPrimary'>{text_card.titulo2}</Typography>
                        <br />
                        <Typography style={{fontWeight: 'lighter'}} paragraph color='textSecondary'>{text_card.parrafo2}</Typography>
                    </div>
                    <div>
                        <Typography style={{fontWeight: 'normal'}} variant='h5' color='textPrimary'>{text_card.titulo3}</Typography>
                        <br />
                        <Typography style={{fontWeight: 'lighter'}} paragraph color='textSecondary'>{text_card.parrafo3}</Typography>
                    </div>
               </div>
        </div>
    )
}

export default TextCard;