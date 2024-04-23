import { Card, CardContent, CardHeader } from "@mui/material"
import DonutChart from "./Chart/DonutChart"
import useFetchData from "../hooks/useFetchData"
import { useEffect,useState } from "react";


export default function Dashboard(){
  const auth = JSON.parse(sessionStorage.getItem('auth'));
  const [comodity,setComodity] = useState([]);
  useEffect(()=>{
      fetch('http://127.0.0.1:8000/api/admin/comodity/count',{
        method:'get',
        headers:{
          'Authorization': auth.token_type + ' ' + auth.access_token
        }
      })
      .then(response=>response.json())
      .then(result=>setComodity(result));
  },[]);
console.log(comodity);
  
  return (
    <Card>
      <CardHeader title="Hello from dashboard"/>
      <CardContent>Example dashboard</CardContent>
      <DonutChart data={comodity}/>
    </Card>
  )
}