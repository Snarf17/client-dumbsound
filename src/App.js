import 'bootstrap/dist/css/bootstrap.min.css';
import './component/style.css'
import Home from './component/home';
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import Pay from './page/payment';
import ListTransaction from './page/list-transaction';
import AddMusic from './page/add-music';
import AddArtist from './page/add-artist';
import { API, setAuthToken } from './config/api';
import { useContext, useEffect} from 'react';
import { UserContext } from './context/UserContext';
import PrivateUser from './privateRoute/PrivateUser';
import PrivateAdmin from './privateRoute/PrivateAdmin';

function App() {
  const [state, dispatch] = useContext(UserContext)
  
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

  const checkUser = async () => {
    try { 
      const response = await API.get('/check-auth');
  
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }
  
      let payload = response.data.data;

      payload.token = localStorage.token;
  
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });

    } catch (error) {
    }
  };
  
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}/>


            <Route element={<PrivateAdmin />}>
              <Route path='/list-transaction' element={<ListTransaction />}/>
              <Route path='/add-music' element={<AddMusic />}/>
              <Route path='/add-artist' element={<AddArtist />}/>
            </Route>
            
            <Route element={<PrivateUser />}>
              <Route path='/payment' element={<Pay />}/>
            </Route>
          </Routes>
        </BrowserRouter>
        
    </>
  );
}

export default App;
