import { TextField } from "@material-ui/core";

const DateTimePicker = ({dataInit, send}) => {


    return (
        <TextField
            label="fecha y hora"
            type="datetime-local"
            defaultValue={dataInit?dataInit:''}
            InputLabelProps={{
            shrink: true,
            }}
            onChange={e=>send(e.target.value)}
        />
    )
}

export default DateTimePicker;