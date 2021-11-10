import HeaderCommon from "../../common/HeaderCommon";

const EditCita = ({out, data}) => {
    return (
        <div>
            <HeaderCommon label='Editar cita' out={()=>out()}/>
        </div>
    )
}

export default EditCita;