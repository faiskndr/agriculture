import { createBrowserRouter } from "react-router-dom";
import User from "./Layouts/User";
import App from "./App";
import Home from "./Views/Home";
import Login from "./Views/Login";
import Price from "./Views/Price";
import Warehouse from "./Views/Warehouse";
import SignUp from "./Views/SignUp";
import Guest from "./Layouts/Guest";
import Dashboard from "./Views/Dashboard";
import Create from "./Views/comodity/Create";
import Markets from "./Views/Markets";
import Store from "./Views/comodity/Store";
import Market from "./Views/Market";
import Checkout from "./Views/Checkout";
import Sale from "./Views/comodity/Sale";
import List from "./Views/reciept/List";
import Transactions from "./Views/Transactions";
import Buy from "./Views/comodity/Buy";
  

const routes = createBrowserRouter([
  {
    path:'/',
    element:<Guest/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/sign-up',
        element:<SignUp/>
      },
      {
        path:'/price',
        element:<Price/>
      },
      {
        path:'/warehouse',
        element:<Warehouse/>
      }
    ]
  },
  {
    path:'/',
    element:<User/>,
    children:[
      {
        path:'/dashboard',
        element:<Dashboard/>
      },
      {
        path:'/comodity/add',
        element:<Create/>
      },
      {
        path:'comodity/store',
        element:<Store/>
      },
      {
        path:'comodity/list',
        element:<Sale/>
      },
      {
        path:'/market',
        element:<Markets/>,
      },
      {
        path:'/market/:id',
        element:<Market/>
      },
      {
        path:'/checkout/:id',
        element:<Checkout/>
      },
      {
        path:'/comodity/reciept',
        element:<List/>
      },
      {
        path:'comodity/transactions',
        element:<Transactions/>
      },
      {
        path:'comodity/buy',
        element:<Buy/>
      }
    ]
  },
  {
    path:'/admin/*',
    element:<App/>,
  }
])

export default routes;