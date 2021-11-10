import { makeStyles, Typography } from "@material-ui/core";

const colorDefault = 'rgba(128,128,128,0.5)'

const useStyles = makeStyles((theme)=>({
    cont:{
        width:'100%',
        display:'flex',
        border: `1px solid ${colorDefault}`,
        borderRadius: '4px',
        '& > div': {
            width:'100%',
            padding:'10px 20px',
            '& > div:first-child': {
                padding:'0 0 5px 0',
            },
        },
        '& > div:last-child': {
            width:'100%',
            borderLeft: `1px solid ${colorDefault}`
        }
    } 
}))


const PairLabel = ({obj1, obj2}) => {



    const classes = useStyles();

    

    return (
        <div className={classes.cont}>
            <div>
                <div>
                    <Typography style={{fontSize:'0.9em'}}  color='textSecondary'>
                        {obj1.label}
                    </Typography>
                </div>
                <div>
                    <Typography color='textPrimary'>
                        {obj1.value}
                    </Typography>
                </div>
            </div>
            <div>
                <div>
                    <Typography  style={{fontSize:'0.9em'}} color='textSecondary'>
                        {obj2.label}
                    </Typography>
                </div>
                <div>
                    <Typography color='textPrimary'>
                        {obj2.value}
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default PairLabel;