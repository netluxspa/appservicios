import { Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";







const ContainerLabel = ({label, children, special}) => {

    const useStyles = makeStyles((theme) => ({    
        cont: {
            margin: 'auto',
            position: 'relative', 
            borderRadius: '4px',
            padding: `${window.innerWidth > 760 ? '20px 20px' : '15px 15px'}`,
            border: `${special ? '3px solid' + theme.palette.primary.main : '1px solid rgba(128,128,128,0.5)'}` ,
            
        }
    }));

    const classes = useStyles();

    return (
        <div className={classes.cont}>
            <div
                style={{background: 'white', position: 'absolute', top: '-0.7em', left: '0.7em'}}
            >
                <Typography 
                    style={{fontSize:`${special ? '1em': '0.8em'}`, fontWeight:`${special ? 'bold': ''}`}}
                    color={`${special ? 'primary': 'textSecondary'}`}
                >{label ? label : null}</Typography>
            </div>
           {children}
        </div>
    )
}

export default ContainerLabel