
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import history from '../config/history';

const MainCard = ({main_card, par}) => {



    const useStyles = makeStyles({
        mainCard: {
            padding: '0 40px 20px 0',
            display:'grid',
            gridTemplateColumns: '1fr 1fr',
            '& > div:first-child': {
                gridColumn: !par ? '2/3' : '1/2',
                gridRow: '1'
            },
            '& > div:last-child': {
                gridColumn:  !par ? '1/2' : '2/3',
                gridRow: '1',
                // padding: '0px 40px'
            },
            '@media(max-width: 780px)': {
                padding: '0',
                gridTemplateColumns: '1fr',
                '& > div:first-child': {
                    gridColumn: '1',
                    gridRow: '2'
                },
                '& > div:last-child': {
                    gridColumn:  '1',
                    gridRow: '1',
                    padding: '30px 16px'
                },
            }
        },
        wrapTitle: {
            display:'grid',
            gridTemplateColumns:'1fr'
        },
        contText: {
            padding: '40px 60px'
        },
        wrapIcon: {
            margin: '3px 20px 0 0',
            width:'42px',
            height:'42px',
            textAlign:'right',
            overflow:'hidden',
            '& > img': {
                width: '100%',                
            }
        },
        contImage: {
            position: 'relative',
            padding: '0 0 0 0',
            '& > img': {
                width: '100%',
                borderRadius: '0 0 4px 0',
                '@media (max-width: 780px)': {
                    borderRadius: '0',
                }
               
            },
            '@media(max-width: 780px)': {
                padding: '50px 0    ',
            }
        }

      });

    const classes = useStyles();

    return (
        <div className={classes.mainCard}>
            <div className={classes.contImage}>
                <img alt='' src={main_card.imagen_main} />
            </div>
            <div className={classes.contText}>
                    <div className={classes.wrapTitle}>
                        <div>
                            <Typography style={{fontWeight:'normal'}} variant="h2" color='textPrimary' gutterBottom component="div">
                                {main_card.titulo}
                            </Typography>
                        </div>
                    </div>
          
                    <Typography style={{fontWeight:'lighter'}} variant="h6" color='textPrimary' paragraph >
                        {main_card.subtitulo}
                    </Typography>
                    <Typography style={{fontWeight:'lighter'}} color='textSecondary' paragraph>
                        {main_card.parrafo}
                    </Typography>
                    <br />
                    <div>
                        <Button onClick={()=>history.push('/reservar')} color='primary' size='large' variant='contained'  style={{textTransform: 'none'}}> 
                          Reserva ahora
                        </Button>
                    </div>
            </div>
        </div>
    )
}

export default MainCard;