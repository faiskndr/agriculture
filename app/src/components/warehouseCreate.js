import { useEffect, useState } from "react";
import { Create, SelectInput, SimpleForm, TextInput } from "react-admin";
import sendRequest from "../utils/sendRequest";

export default function WarehouseCreate(){
  const auth = JSON.parse(sessionStorage.getItem('auth'));
  const [regions,setRegion] = useState([]);
  var data =[];
  useEffect(()=>{
    fetch('http://127.0.0.1:8000/api/admin/regions',{
      method:'get',
      headers:{
        'Authorization': auth.token_type + ' ' + auth.access_token
      }
    })
    .then(response=>response.json())
    .then(result=>setRegion(result));
    
  },[]);
  
  if(regions.length > 0){
    regions?.map(region=>{
      if(region.id < 10 ){
        data.push({id:'0'+region.id,name:region.name});
      }else{
        data.push({id:region.id,name:region.name});
      }
    })
  }

  const warehouseStore = async (data)=>{
    console.log(data);
    const result = await sendRequest('http://127.0.0.1:8000/api/admin/warehouse',data);
    console.log(result);
  }

  console.log(data);
  return(
    <Create>
    <SimpleForm onSubmit={warehouseStore}>
         <SelectInput source="region" name="region_id" choices={data}/>
        <TextInput source="address"/>
        <TextInput source="capacity"/>
    </SimpleForm>
    </Create>
  )
}