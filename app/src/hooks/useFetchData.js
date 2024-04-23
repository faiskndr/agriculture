import { useEffect,useState } from "react";

function useFetchData(url,option = null) {
  const [data,setData] = useState(null);
  let isWait = true;
  useEffect(()=>{
    fetch(url,option)
    .then(response=>response.json())
    .then(res=>setData(res));
  },[url])
  
  return data && data;
}

export default useFetchData;