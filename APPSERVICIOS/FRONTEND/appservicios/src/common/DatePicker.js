import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { formatDate } from './DaysFunctions';



const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePicker({sendDate}) {
  const classes = useStyles();

  const today = new Date()

  const defaultDate = today.getFullYear() + '-' + formatDate((today.getMonth() + 1)) + '-' + formatDate(today.getDate()) 


  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        // variant='outlined'
        size='small'
        type="date"
        defaultValue={defaultDate}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={e=>sendDate(e.target.value)}
      />
    </form>
  );
}
