import { useState,useEffect } from "react";

function useGetWarehouse(id) {
  const [warehouse,setWarehouse] = useState(null);
useEffect(()=>{
  if(id != null){
  // console.log(id);
    fetch(`http://localhost:8000/api/warehouse/${id}`)
    .then(response=>response.json())
    .then(res=>setWarehouse(res));
    
  }
},[id])
return warehouse;

}

export default useGetWarehouse;