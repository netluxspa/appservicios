import Alert from '@mui/material/Alert';





const RenderErrors = ({errors}) => {
    console.log('RenderErrors', errors)
    const renderErrors = (errors) => {
        const keys = Object.keys(errors)
        return (
            keys.map((k, i)=>(
                <div  key={i}>
                    {
                    
                    typeof errors[k] !== 'string' ?
                        
                        <>
                            {
                            Array.isArray(errors[k]) ?
                            errors[k].map((e,j)=>(
                                <div key={j}>
                                    {typeof e === 'string' 
                                    ?
                                    <Alert align='center' severity="error">{k} - {e}</Alert>
                                    :
                                    <div>
                                        {renderErrors(e)}
                                    </div>
                                 }
                                </div>
                             )) :
                             renderErrors(errors[k])
                            }
                        </>

                         :
                         <Alert align='center' severity="error">{k} - {errors[k]}</Alert>
                    }

                   
                </div>
            ))
        )
    }

    const MultiRender = ({errors}) => {
        errors.map(e=>(
            renderErrors(e)
        ))
    }

    if (Array.isArray(errors)){
        return <MultiRender errors={errors} />
    } else {
        return renderErrors(errors);
    }

}

export default RenderErrors;