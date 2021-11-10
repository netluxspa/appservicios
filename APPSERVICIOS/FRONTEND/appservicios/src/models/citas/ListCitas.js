import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


const styles = {
    item: {
        marginTop:'10px',
        padding:'10px'
    },
    header: {
        borderBottom: '1px solid gray'
    }
}

const OneCita = ({cita, goCita, i}) => {
    return (
        <>
        <div style={styles.item}>
                <Typography color='textPrimary'>
                    {i + 1}
                </Typography>
            </div>
            <div style={styles.item}>
                <Typography color='textPrimary'>
                    {cita.inicio}
                </Typography>
            </div>
            <div style={styles.item}>
                <Typography color='textPrimary'>
                    {cita.demandante_detail.persona.nombre}
                </Typography>
            </div>
            <div style={styles.item}>
                <Button onClick={()=>goCita(cita)} color='primary' size='small' variant='outlined'>
                    <SearchIcon color='primary' />
                </Button>
            </div>
        </>
    )
}

const ListCitas = ({citas, goCita, goCreateCita}) => {

    const labels = ['Nº' ,'inicio', 'paciente', 'detalle']

    const returnLabels = (
        labels.map((l, i)=>(
         
            <div key={'label_' + i} style={{...styles.item, ...styles.header}}>
                <Typography color='textSecondary'>
                    {l}
                </Typography>
            </div>
            
       
        ))
    )

    const renderReturn = (
        citas.map((c, i)=>(
            <OneCita key={c.id} i={i} cita={c} goCita={(c)=>goCita(c)}/>
        ))
    )

    return (
        <div>
            <div style={{display:'flex', justifyContent: 'flex-end', alignItems:'center'}}>
                
                <Button onClick={()=>goCreateCita()} style={{margin:'0 10px 0 0'}} color='primary' variant='contained' size='small'>Nueva cita</Button>
                <AddCircleOutlineIcon color='primary'/>
            </div>
            {citas.length ?
        
            <div style={{display:'grid', gridTemplateColumns:'1fr 2fr 5fr 1fr', gap:'10px 0', gridArea: '1 / 1 / 1 / 2'}}>
                {returnLabels}
            
                {renderReturn}
            </div>

            :

            <div>
                <Typography variant='h6' color='textSecondary'>
                    No hay citas para este período.
                </Typography>
            </div>}
        </div>
    )
}

export default ListCitas;