import { useEffect, useState } from "react"
import { ApiService } from "../../../services";
import Loading from "../../../common/Loading";
import RenderErrors from "../../../common/RenderErrors";




const ListService = ({params, select}) => {

    const [data, setData] = useState([])

    const [loading, setLoading] = useState(false)

    const [errors, setErrors] = useState(false)

    useEffect(()=>{
        console.log('worroork')
        const subscription = getServices(params, select)
      

        return (
            ()=>{
                subscription.unsubscribe()
            }
        )
    }, [params, select])

    const getServices = (params, select) => {

        setLoading(true)
        
        return  ApiService.get('/main/servicio/', params).subscribe({
            next(x) {
                setLoading(false)
                setErrors(false)
                setData(x)
                if (x.length === 1){
                    select(x[0])
                }
            }, 
            error(err) {
                console.log(err)
                setLoading(false)
                setErrors(err)
            },
        })
    }

    const renderData = (
        data.map(d=>(
            <div key={d.id}>
                {d.id}
            </div>
        ))
    )

    const renderReturn = () => {
        if (loading){
            return (
                <Loading message='Cargando servicios' />
            )
        } else if (errors) {
            return <RenderErrors errors={errors} />
        }else if (data.length > 0){
            return (
                renderData
            )
        }else {
            return 'No data'
        }
    }

    return renderReturn()
}

export default ListService