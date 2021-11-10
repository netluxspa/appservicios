import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from "@mui/material";


const Loading = ({message}) => {
    return (
        <div style={{display:'flex', alignItems:'center', padding: '10px'}}>
            <div>
                <CircularProgress />
            </div>
            <div style={{marginLeft:'20px'}}>
                <Typography color='primary'>
                    {message}
                </Typography>
            </div>
        </div>
    )
}

export default Loading;