import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Admin,Resource, usePermissions } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import { fetchUtils } from 'react-admin';
import comodityList from './components/comodityList';
import comodityEdit from './components/comodityEdit';
import warehouseList from './components/warehouseList';
import warehouseEdit from './components/warehouseEdit';
import Dashboard from './components/Dashboard';
import comodityPriceList from './components/comodityPriceList';
import { useNavigate } from 'react-router-dom';
import WarehouseCreate from './components/warehouseCreate';


const auth = JSON.parse(sessionStorage.getItem('auth'));
const fetchJson = (url, options = {}) => {
  options.user = {
      authenticated: true,
      token: auth.token_type + ' ' + auth.access_token
  };
  return fetchUtils.fetchJson(url, options);
};

const getRole = ()=>{
  const auth = sessionStorage.getItem('auth');
  const role = JSON.parse(auth);
  console.log(JSON.parse(role.user.role_id));
  return role.user.role_id;
}


function App() {
  const navigate = useNavigate();
  // const {permision} = usePermissions();
  const authProvider = {
    // authentication
    login: params => Promise.resolve(/* ... */),
    checkError: error => Promise.resolve(/* ... */),
    checkAuth: () => sessionStorage.getItem('auth') ? Promise.resolve() : Promise.reject(),
    logout: () => {
      sessionStorage.clear();
      return Promise.resolve('/login');
      // return navigate('/login');
    },
    getIdentity: () => Promise.resolve(/* ... */),
    handleCallback: () => Promise.resolve(/* ... */), // for third-party authentication only
    // authorization
    getPermissions: () =>  {
      // const role = localStorage.getItem('auth');
      // console.log(role);
      // return role ? Promise.resolve(role) : Promise.reject();
  },
 
  };
  return (
      <Admin basename='/admin' authProvider={authProvider} dataProvider={restProvider('http://127.0.0.1:8000/api/admin',fetchJson)} dashboard={getRole()== 3?null :Dashboard}>
        {getRole() == 2&&
        <Resource name='comodity' list={comodityList} edit={comodityEdit} />
        }
        {getRole() == 3 &&
        <Resource name='warehouse' create={WarehouseCreate} list={warehouseList} edit={warehouseEdit}/>
        }
        <Resource name='comodity/price' list={comodityPriceList}/>
      </Admin>
  );
}

export default App;
