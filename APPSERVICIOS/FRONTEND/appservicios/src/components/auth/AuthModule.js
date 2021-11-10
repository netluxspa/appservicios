import { Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import history from "../../config/history";




const AuthModule = ({match, goDashboard}) => {
    return (
        <div>
            <div>
                <button onClick={()=>goDashboard()}>Go Dashboard</button>
            </div>
            <Route
                exact
                path={match.url}
                render={()=>(
                    <Login
                        goRegister={()=>history.push(match.url + '/register')}
                    />
                )}
            />
            <Route
                exact
                path={match.url + '/register'}
                render={()=>(
                    <Register
                        goLogin={()=>history.push(match.url)}
                    />
                )}
            />

        </div>
    )
}

export default AuthModule;