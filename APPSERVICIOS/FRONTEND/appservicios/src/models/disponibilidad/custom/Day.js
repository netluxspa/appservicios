import { Typography } from "@material-ui/core";
import Disponibilidades from "./Disponbilidad";
import { formatHour } from "../../../common/DaysFunctions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    position: 'sticky',
    top: '0',
    zIndex:'10000',
    borderRadius: '4px',
    color:'white',
    margin: '0 0 20px 0',
    padding:'10px 20px'
  
}
}));

const const_height = 40;



const days = [
    {dia: "Lunes"},
    {dia: "Martes"},
    {dia: "Miercoles"},
    {dia: "Jueves"},
    {dia: "Viernes"},
    {dia: "Sabado"},
    {dia: "Domingo"}
  ]

const Hours = (day, clickHour, clickDisponibilidad) =>{
    const render = []
    for (let i = 0; i < 25; i++) {
        render.push(
            <div key={i} style={{height: const_height, minWidth:'100px'}} className='hour'>
                <div style={{width:'40px', height: const_height, display: 'flex', alignItems:'center'}}>
                    
                        <span>
                            {formatHour(i)}
                        </span>
                
                </div>
                <div 
                    onClick={()=>clickHour({day: day, hour: i})}
                    style={{position:'relative', width:'100%', height: const_height}}>
                </div>
            </div>
            )
        }

    var disponibilidades_add = []       
    for (let i = 0; i < day.disponibilidades.length; i++) {
        const d = day.disponibilidades[i];
        disponibilidades_add.push(
                <Disponibilidades key={d.id} clickDisponibilidad={d=>clickDisponibilidad({data:d, data2:day.day})}  disponibilidad={d} height={const_height} />

        )
    }
    const smartAdd = (
        <div key={26} style={{position:'absolute', top: '0', left:'0', right:'0', bottom:'0', display:'flex', padding:'0 10px'}}>
            <div style={{width:'40px'}}></div>
            <div style={{position:'relative', width:'100%'}}>{disponibilidades_add}</div>
        </div>
    )

    render.unshift(smartAdd)
        
    

    return (
        render.map(i=>(
            i
        ))
    )
    
  

    // return (
    //     render.map((i, index)=>(
    //         <div key={i} style={{height: const_height, minWidth:'100px'}} className='hour'>
    //                 <div style={{width:'40px', height: const_height, display: 'flex', alignItems:'center'}}>
                        
    //                         <span>
    //                             {formatHour(i)}
    //                         </span>
                       
    //                 </div>
    //             <div 
    //                 onClick={()=>clickHour({day: day, hour: i})}
    //                 style={{position:'relative', width:'100%', height: const_height}}>
    //                 {
    //                 index === 1 
    //                 ? 
    //                 day.disponibilidades.map(d=>(
    //                     <div
    //                         key={d.id}
    //                         style={{zIndex:'1000'}}
    //                         onClick={()=>console.log('work disponibilidad')}>
    //                         <Disponibilidades   disponibilidad={d} height={const_height} />
    //                     </div>
    //                 ))
    //                 :
    //                 null}
    //             </div>
    //         </div>
    //     ))
    // )
}





const Day = ({day, clickHour, clickDisponibilidad}) => {
    const classes = useStyles();
    return (
        <div>

            <div className={classes.root}>
                
                    <div>   
                        <Typography
                            // color='textPrimary'
                        >
                            {days[day.day.day].dia}
                        </Typography>
                    </div>
                    <div>
                        <Typography
                            // color='textSecondary'
                            style={{fontSize:'0.8em'}}
                        >
                             {day.day.date}
                        </Typography>
                    </div>
                     
                
            </div>

            <div 
                style={{position: 'relative'}}
            >
                
                <div>
                    {Hours(day, clickHour, clickDisponibilidad)}
                </div>
            </div>


        </div>
    )
}

export default Day;