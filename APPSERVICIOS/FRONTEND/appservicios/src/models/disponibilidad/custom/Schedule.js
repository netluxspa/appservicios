
import Day from './Day';

import './Schedule.css'





const Schedule = ({days, clickHour, clickDisponibilidad}) => {
    

    
        const Days = () => {
            if (days && days.length){
                return (
                    days.map((d, i)=>(
                        <div key={i}>
                            <Day clickDisponibilidad={d=>clickDisponibilidad(d)}  day={d} clickHour={h=>clickHour(h)} />
                        </div>
                    ))
                )
            } else {
                return null
            }
        } 
        

    return (
        <div className='contSchedule'>
            {Days()}
        </div>
    )
}

export default Schedule;