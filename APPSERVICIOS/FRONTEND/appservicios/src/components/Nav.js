import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme)=>({
    cont: {
        display: 'flex',
        '& > div': {
            padding: '10px 20px'
        }
    }
}))

const Nav = () => {

    const classes = useStyles();
    return (
        <div className={classes.cont}>
            <div>
                <Link to='/schedule'>Agenda</Link>
            </div>
            <div>
                <Link to='/client-schedule'>Agenda Cliente</Link>
            </div>
        </div>
    )
}

export default Nav;