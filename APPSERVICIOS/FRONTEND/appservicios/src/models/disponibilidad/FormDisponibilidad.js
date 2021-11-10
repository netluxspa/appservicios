// import { TextField } from '@material-ui/core';
import SelectorOferente from '../oferente/SelectorOferente';
import ContainerLabel from '../../common/ContainerLabel';
import DateTimePicker from '../../common/DateTimePicker';
import SelectorBox from '../box/SelectorBox';


const FormDisponibilidad = ({data, send}) => {

    console.log('ASDASDASDA', data)

    return (
        <div
            style={{display:'grid', gridTemplateColumns:'1fr', gap:'30px', padding:'30px 0'}}
        >
            <div>
                <ContainerLabel label='Inicio'>
                    <DateTimePicker send={d=>send({inicio: d})} dataInit={data && data.inicio ? data.inicio : ''} />
                </ContainerLabel>
            </div>
            <div>
                <ContainerLabel label='Final'>
                    <DateTimePicker send={d=>send({final: d})} dataInit={data && data.final ? data.final : ''} />
                </ContainerLabel>
            </div>
            <div>
                <ContainerLabel label='Oferente'>
                    <SelectorOferente send={o=>send({oferente: o.id})} selected={data && data.oferente ? data.oferente : null} />
                </ContainerLabel>
            </div>
            <div>
                <ContainerLabel label='Box'>
                    <SelectorBox send={o=>send({box: o.id})} selected={data && data.box ? data.box : null} />
                </ContainerLabel>
            </div>
            
            
        </div>
    )
}

export default FormDisponibilidad;