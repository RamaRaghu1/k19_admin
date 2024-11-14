
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {store} from "./redux/store.js"
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UsersList from './components/UsersList.jsx'
import ViewUser from './pages/ViewUser.jsx'
import Events from './pages/Events.jsx'
import CreateEvent from './pages/CreateEvent.jsx'
import Login from './pages/Login.jsx'
import Homepage from './pages/Homepage.jsx'
import { jwtDecode } from "jwt-decode";
import { Toaster } from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (token === null || token === undefined) {
    console.log("tokentundefinedoken", token);
    return false;
  } else {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  }
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <App /> : <Navigate to={"/login"} />;
};


const router=createBrowserRouter([
  {
    path:"/",
    element:<ProtectedRoute/>,
    children:[
     
      {
        path:"/",
        element:<Homepage/>
    
      },
      {
        path:"/view-user/:id",
        element:<ViewUser/>
    
      },
      {
        path:"/events",
        element:<Events/>
    
      },
      {
        path:"/events/create-event",
        element:<CreateEvent/>
    
      }
    ]
  },
  {
    path:"/login",
    element:<Login/>
  },
 
])

createRoot(document.getElementById('root')).render(
  
  <Provider store={store}>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <RouterProvider router={router}/>
    </Provider>

)
