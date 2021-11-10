import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';


const SecondaryCard = ({secondary_card, par}) => {

    console.log('secondary_card', secondary_card)


    const useStyles = makeStyles({
        secondaryCard: {
            padding: '80px 40px 20px 40px',
            display:'grid',
            gridTemplateColumns: '1fr 1fr',
            '& > div:first-child': {
                gridColumn: !par ? '2/3' : '1/2',
                gridRow: '1',
                padding: '0px 60px'

            },
            '& > div:last-child': {
                gridColumn:  !par ? '1/2' : '2/3',
                gridRow: '1',
                padding: '0px 40px'
            },
            // '& > div': {
            //     display: 'flex',
            //     justifyContent: 'center',
            //     flexDirection: 'column'
            // },
            '@media(max-width: 780px)': {
                padding: '40px 0',
                gridTemplateColumns: '1fr',
                '& > div:first-child': {
                    gridColumn: '1',
                    gridRow: '2',
                    padding: '40px 16px'

                },
                '& > div:last-child': {
                    gridColumn:  '1',
                    gridRow: '1',
                    padding: '0 16px'
                },
            }
        },
        wrapTitle: {
            display:'grid',
            gridTemplateColumns:'1fr'
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
            margin: '15px 0 0 0',
            '& > img': {
                width: '100%',
                borderRadius: '4px',
               
            },
            '@media(max-width: 780px)': {
                padding: '50px 0    ',
            }
        }

      });

    const classes = useStyles();

    return (
        <div className={classes.secondaryCard}>
        <div className={classes.contImage}>
            <img alt='' src={secondary_card.imagen_main} />
        </div>
        <div>
     <br />
                <div className={classes.wrapTitle}>
                    <div>
                        <Typography style={{fontWeight:'normal'}} variant="h3" color='textPrimary' gutterBottom component="div">
                        {secondary_card.titulo}
                        </Typography>
                    </div>
                </div>
      

                <Typography style={{fontWeight:'lighter'}} variant="h6" color='textSecondary'>
                    {secondary_card.parrafo}
                </Typography>

        </div>
    </div>
    )
}

export default SecondaryCard;