// import { Button, Typography } from "@material-ui/core"
// import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
// import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
// import ListCitas from "../citas/ListCitas"
import CitaScheduleList from '../citas/customList/DisponibilidadScheduleList';
import PairLabel from '../../common/PairLabel';
import HeaderCommon from "../../common/HeaderCommon"
import { dateTimeObj, formatHourDB } from "../../common/DaysFunctions"
import { Button } from "@material-ui/core";
import { formatHour } from '../../common/DaysFunctions';


const ViewDisponibilidad = ({data, goCita, out, edit, clickHour, cancel}) => {

    const date = data.inicio.split('T')[0]
    
    
    return (
        <>
        <HeaderCommon label='Disponibilidad'  out={()=>out()}/>
        <div style={{display:'flex', justifyContent:'flex-end'}}>
            <Button style={{margin: '0 10px 0 0'}} onClick={()=>cancel()} color='secondary' variant='contained' size='small'>Cancelar disponibilidad</Button>

            <Button style={{margin: '0 10px 0 0'}} onClick={()=>edit()} color='primary' variant='contained' size='small'>Editar</Button>
            <EditIcon color='primary' />
        </div>
        <div style={{display:'grid', gap:'20px', padding:'20px 0'}}>
            <div style={{display:'grid', gap:'20px', gridTemplateColumns:'1fr 1fr', padding:'20px 0'}}>
            <div>
                <PairLabel 
                    obj1={
                        {
                            label:'Inicio',
                            value: formatHourDB(dateTimeObj(data.inicio).hour)
                        }
                    } 
                    obj2={
                        {
                            label:'Fin',
                            value: formatHourDB(dateTimeObj(data.final).hour)
                        }
                    } 
                />
            </div>
            <div>
                <PairLabel 
                    obj1={
                        {
                            label:'Oferente',
                            value: data.oferente_detail.persona.nombre
                        }
                    } 
                    obj2={
                        {
                            label:'Box',
                            value: data.box_detail.codigo
                        }
                    } 
                />
            </div>
            </div>
            

             <div>
                {/* <ContainerLabel special={true} label='Citas' > */}
                    <CitaScheduleList 
                    clickHour={(h)=>
                        clickHour({
                            inicio:date + 'T' + formatHour(h),
                        })} 
                    goCita={c=>goCita(c)} 
                    data={data} />
                   
                {/* </ContainerLabel> */}
            </div>
           
            {/* <div>
                <ContainerLabel label='Inicio' >
                    {dateTimeObj(data.inicio).date} - {dateTimeObj(data.inicio).hour} 
                </ContainerLabel>
            </div>
            <div>
                <ContainerLabel label='Final' >
                {dateTimeObj(data.final).date} - {dateTimeObj(data.final).hour} 
                </ContainerLabel>
            </div>
            <div>
                <ContainerLabel label='Oferente' >
                    {data.oferente_detail.persona.nombre}
                </ContainerLabel>
            </div>

            <div>
                <ContainerLabel label='Box' >
                    {data.box_detail.codigo}
                </ContainerLabel>
            </div>
 */}
        </div>
        </>
    )
}

export default ViewDisponibilidad