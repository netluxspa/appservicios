import { useEffect, useState } from "react";
import { ApiService } from "./services/api.service";
import { makeStyles } from '@mui/styles';
import Container from "./components/Container";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Router, Route } from 'react-router-dom';
import history from "./config/history";
import ScrollToTop from "./common/ScrollToTop";

import ClientSchedule from "./components/clientSchedule/ClientSchedule";

import Alert from '@mui/material/Alert';



const useStyles = makeStyles({
  container: {
    '&:nth-child(odd)': {
      background:  '#f6f6f6',
    },
    '&:nth-child(even)': {
      background:'#FFFFFF',
    },
  },

});


const App = () => {

  const classes = useStyles();

  const [pagina, setPagina] = useState(null)

  useEffect(()=>{
      const pagina = window.location.host;
      localStorage.setItem('site', pagina)
      const params = {codigo: pagina};
      const getPagina = ApiService.get(`/content/pagina/`, params).subscribe({
        next(x) {
          console.log(x)
          setPagina(x[0])
        },
        error(x) {
          console.log(x)
        }
      })
      return ()=> getPagina.unsubscribe()
      
  },[])

  const Seccion = () => {
    if (pagina && pagina.secciones.length > 0 &&  pagina.secciones[0].containers.length > 0){
      return pagina.secciones[0].containers.map((c,i)=>(
        <div key={c.id}  className={classes.container}>
          <Container par={i%2===0 ? true : false} container={c} />
        </div>
      ))
    } else {
      return null
    }
  }



  return (
    <Router history={history}> 
     <ScrollToTop />
     <Alert severity="info">Esta página es una versión de muestra.</Alert>
        {pagina ? <Nav 
          pagina={pagina}
        /> : null}
        <Route
            path='/' exact 
            render={()=>
              <div >
                <div>
                  {pagina ? <Seccion /> : null}
                </div>
               
              </div>
            }
        />

        <Route
            path='/reservar'  
            component={(props)=>
              <div >
                <ClientSchedule {...props}/>
              </div>
            }
        />
         <Footer centros={pagina && pagina.centros ? pagina.centros : null} />
    </Router>



  );
}

export default App;
