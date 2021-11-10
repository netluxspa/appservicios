const Register = ({goLogin}) => {
    return (
        <div>
            <div>
               <button onClick={()=>goLogin()}>Login</button>
            </div>  
            <div>
                Register
            </div>  
        </div>  
    )
}

export default Register;