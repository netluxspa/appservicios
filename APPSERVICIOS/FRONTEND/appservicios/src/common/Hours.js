import { makeStyles, Typography } from "@material-ui/core"
import { formatHour } from "./DaysFunctions"



const OneHour = ({h, classes, clickHour}) => {

    return (
        <div className={classes.item}>
            <div >
                <div>
                    <Typography color='textPrimary' variant='h6'>
                         {formatHour(h)}
                    </Typography>
                </div>
            </div>
            <div style={{cursor:'pointer'}} onClick={()=>clickHour(h)}>

            </div>
        </div>
    )
}



const Hours = ({start, end, height, clickHour}) => {

    const useStyles = makeStyles((theme)=>({
        cont: {
            margin: '20px 0 0 0',
            '& .item:last-child':{
                borderBottom: 'solid 1px black',
            }
        },
        item: {
            display: 'grid',
            gridTemplateColumns:'1fr 10fr',
            height: `${height}px`,
            '& > div:last-child':{
                borderTop: 'solid 1px rgba(0,0,0,0.3)'
            },
            '& > div:first-child':{
                position: 'relative',
                '& > div':{
                    position: 'absolute',
                    right: '20px',
                    top:' -1em'
                }
            }
        },
       
    }))

    const classes = useStyles();


    const hoursset = () =>{
        var res = [];
        for (let i = start; i < end + 1; i++) {
            res.push(i)
        }
        return res
    }


    const renderHours = (
        hoursset().map(h=>(
            <OneHour clickHour={h=>h < end ? clickHour(h) : null} classes={classes} key={h} h={h} />
        ))
    )

    return (
        <div className={classes.cont}>
            {renderHours}
        </div>
    )
}

export default Hours;