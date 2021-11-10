import { useEffect, useState } from "react";
import { ApiService } from "../../services";
import { 
    subMonths, 
    addMonths, 
    format, 
    startOfWeek, 
    addDays, 
    startOfMonth,
    endOfMonth, 
    endOfWeek,
    isSameMonth

} from "date-fns";
import './calendar.css';
import { months, daysShort as weekdays, jsToPyDate } from "../../common/DaysFunctions";
import { Route } from 'react-router-dom';
import ClientOptions from "./ClientOptions";
import history from "../../config/history";
import { Typography, Button } from "@material-ui/core";
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(()=>({
    contCalendar: {
        display: 'grid',
        gridTemplateColumns: '2fr 3fr',
        '@media(max-width: 780px)': {
            gridTemplateColumns: '1fr',
        }
    },
    textCalendar: {
        padding: '35px 30px',
        '@media(max-width: 780px)': {
            padding: '10px 15px 20px 15px',
        }
    }
}))

const ClientCalendar = ({match, service, selectOption}) => {

    const classes = useStyles();

    const [state, setState] = useState({
        currentMonth: new Date(),
        availabesDates: []
    })


    useEffect(()=>{
        const params = {
            servicio: service.id
        }
        const getAvaiability =  ApiService.post('/agenda/get-calendar-client/', JSON.stringify(params)).subscribe({  
            next(x) {
                console.log(x)
                if (x.disponibilidades.length > 0){
                    setState(s=>({...s,currentMonth: new Date(x.disponibilidades[0].split('-')[0], x.disponibilidades[0].split('-')[1] -  1, x.disponibilidades[0].split('-')[2]), availabesDates: x.disponibilidades}))
                }
            },
            error(err) {
                console.log(err)
            },
        });

        return (
            ()=>{
                getAvaiability.unsubscribe()
            }
        )
    }, [service])



 

    const renderHeader = () => {

        return (
        <div className="header row flex-middle">
            <div className="col col-start">
            <div className="icon" onClick={()=>prevMonth()}>
                chevron_left
            </div>
            </div>
            <div className="col col-center">
            {/* <span>{format(state.currentMonth, dateFormat)}</span> */}
            <span>{months[state.currentMonth.getMonth()] + ' ' + state.currentMonth.getFullYear()} </span>
            </div>
            <div className="col col-end" onClick={()=>nextMonth()}>
            <div className="icon">chevron_right</div>
            </div>
        </div>
        );
    }

    const renderDays = () => {
        const days = [];


        for (let i = 0; i < 7; i++) {
        days.push(
            <div className="col col-center" key={i}>
            {weekdays[i]}
            </div>
        );
        }

        return <div className="days row">{days}</div>;
    }

    const renderCells = () => {
        const { currentMonth } = state;
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart, {weekStartsOn: 1});
        const endDate = endOfWeek(monthEnd, {weekStartsOn: 1});

        const dateFormat = "d";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                days.push(
                <div
                    className={`col cell ${
                    !isSameMonth(day, monthStart) | !state.availabesDates.includes(jsToPyDate(day))
                        ? "disabled"
                        : 'avaiable'
                    }`}
                    key={day}
                    onClick={() => onDateClick(cloneDay)}
                >
                    <span className="number">{formattedDate}</span>
                    <span className="bg">{formattedDate}</span>
                </div>
                );
                day = addDays(day, 1);
            }

            rows.push(
                <div className="row" key={day}>
                {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }

    const onDateClick = day => {
       const date = jsToPyDate(day);
    //    goToDate(date)
        history.push(match.url + '/' + date);
      };
    
      const nextMonth = () => {
        setState({
            ...state,
          currentMonth: addMonths(state.currentMonth, 1)
        });
      };
    
      const prevMonth = () => {
        setState({
            ...state,
          currentMonth: subMonths(state.currentMonth, 1)
        });
      };

    
      const renderCalendar = () => {
          return (
            <div className={classes.contCalendar}>
                <div className={classes.textCalendar}>
                    <Typography color='textPrimary' variant='h6'>Selecciona un día</Typography>
                    <Typography color='textPrimary' variant='paragraph'>
                    Para reservar una hora selecciona un dia disponible en el calendario.
                    </Typography>
                    <br />
                </div>
                <div className="calendar">
                    {renderHeader()}
                    {renderDays()}
                    {renderCells()}
                </div>
            </div>
          )
      }


    const renderReturn = () => {
        return (
            <Route path={match.url}>
                <Route exact path={match.url}  render={()=>renderCalendar()}/>
                <Route exact path={match.url + '/:date'}  render={(props)=>
                <>
                    <div>
                        <Button onClick={()=>history.push(match.url)} color='primary' size='small' >
                            <KeyboardReturnIcon />
                        </Button>
                    </div>
                    <ClientOptions {...props} service={service} selectOption={o=>selectOption(o)} />
                </>
                }/>
            </Route>
        )
    } 

    return renderReturn()
}

export default ClientCalendar;