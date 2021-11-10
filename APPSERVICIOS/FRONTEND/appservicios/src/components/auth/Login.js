import { ApiService } from "../../services";

const Login = ({goRegister}) => {
    return (
        <div>
             <div onClick={()=>goRegister()}>
                <button onClick={()=>goRegister()}>
                    register
                </button>  
            </div>  
             <div>
                Login
            </div>  
        </div>  
    )
}

export default Login;