// import api from "./api";
import { useEffect, useState } from "react";
// import Schedule from "./components/Schedule";
import { Router, Route, Redirect } from 'react-router-dom';
import history from "./config/history";
import ScheduleModule from "./moduls/schedule/ScheduleModule";
import ScrollToTop from "./common/ScrollToTop";
import { Alert } from "@material-ui/lab";
import Nav from "./components/Nav";
import ClientSchedule from "./moduls/clientSchedule/ClientSchedule";

import AuthModule from "./components/auth/AuthModule";
import DashboardModule from "./components/dashboard/DashboardModule";



const App = () => {

  const [center_date] = useState(new Date(2021, 7, 23));

  const [user, setUser] = useState(null)


  useEffect(()=>{
      if (!localStorage.getItem('site')){
        localStorage.setItem('site', window.location.host);
        
      }
  }, [center_date]);

  
  useEffect(()=>{
      history.push('/auth')
  }, [])



const InfoDev = () => {
  return (
    <div >
      <Alert severity='warning'>
        Esta página es una versión de prueba.
      </Alert>
    </div>
  )
}


const goDashboard = user => {
  setUser(user);
  history.push('/dashboard')
}



  return (
    <>
    <InfoDev />
    <Router history={history}>
      <ScrollToTop />
      <Nav />
      <br />
      <br />
      {/* <Route path=''>
        <Redirect to='/auth'></Redirect>
      </Route> */}
      <Route path='/schedule' component={ScheduleModule}></Route>
      <Route path='/client-schedule' component={ClientSchedule}></Route>
      <Route path='/auth' render={(props)=>(
            <AuthModule
                goDashboard={(user)=>goDashboard(user)}
                {...props} 
            />
          )} 
      />
      <Route path='/dashboard' render={(props)=>
          user ?
            <DashboardModule
                {...props} 
            />
            :
            <Redirect to='/auth' />
          } 
      />
    </Router>
    </>
  )
}

export default App;