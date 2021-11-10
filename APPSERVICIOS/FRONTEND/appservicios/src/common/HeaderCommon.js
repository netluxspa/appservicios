import { Button, Typography } from '@material-ui/core';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { makeStyles } from "@material-ui/core/styles";
import history from '../config/history';

const useStyles = makeStyles((theme) => ({
  cont: {
    display: 'flex',
    alignItems: 'center',
    '& div': {
        margin: '0 10px 0 0'
    }   
    },


}));

const HeaderCommon = ({out, label}) => {

    const classes = useStyles();

    return (
        <div>
        <div className={classes.cont}>
            <div>
                <Button onClick={()=>out ? out() : history.goBack()} color='primary' variant='contained' size='small'>
                    <KeyboardReturnIcon />
                </Button>
            </div>
            <div>
                <Typography variant='h5' color='textPrimary' >
                    {label ? label : ''}
                </Typography>
            </div>
        </div>
        <hr />
        </div>
    )
}

export default HeaderCommon;