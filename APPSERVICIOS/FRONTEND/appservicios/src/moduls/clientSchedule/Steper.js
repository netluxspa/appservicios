import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme)=>({
    cont: {
        display: 'grid',
        background:'white',
        borderRadius: '4px',
        border: 'solid 1px rgba(0,0,0,0.1)', 
        gridTemplateColumns:'1fr 1fr 1fr'
    },
    item:{
        padding: '5px 10px',
        cursor:'pointer',
        display: 'flex',
        alignItems:'center'
    },
    activeItem: {
        borderRadius: '4px',
        border: `solid 2px ${ theme.palette.primary.main}`,
        padding: '5px 10px',
        display: 'flex',
        alignItems:'center'
    },
    circle: {
        width: '1em',
        height: '1em',
        padding: '0.2em',
        borderRadius: '1em',
        background:  theme.palette.primary.main,
        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
        color: 'white',
        '& > span': {
            fontSize: '0.7em'
        }
    }
}))

const Steper = ({items, activeItemKey, go}) => {

    console.log('items from Steper', items)


    console.log('activeItem from Steper', activeItemKey)


    const classes = useStyles();

    const isActiveItem = item => activeItemKey.includes(item.key) ? true : false

    return (
        <div className={classes.cont}>
            {items.map((i, index)=>(
                <div onClick={()=>go(i.key)} className={isActiveItem(i) ? classes.activeItem : classes.item}>
                    <div className={classes.circle}>
                        <span > {index + 1} </span>
                    </div>
                    <div style={{marginLeft:'5px'}}>
                        {i.title}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Steper;