import { TextField, Typography } from "@material-ui/core";


const FilterDemandantes = ({applayFilter, data}) => {
    return (
        <div style={{width:'100%'}}>
            <div style={{padding:'0 0 0 10px'}}>
                <Typography variant='overline' color='textPrimary'>Ingrese rut del cliente (sin puntos con guión)</Typography>
            </div>
            <TextField onChange={v=>applayFilter(v.target.value)} style={{width:'100%'}} variant='outlined' label='Rut' size='small' value={data}/>
        </div>
    )
}

export default FilterDemandantes;