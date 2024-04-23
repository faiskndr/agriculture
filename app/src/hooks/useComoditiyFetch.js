import { useEffect,useState } from "react";

function useComodityFetch(url,option = null) {
  const [data,setData] = useState(null);
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    (
        async function(){
            try {
                setLoading(true)
                const response = await fetch(url,option)
                const data = await response.json()
                setData(data)
            } catch (error) {
                setError(error)
            }finally{
                setLoading(false)
            }
        }
    )()
  },[url])
  
  return data;
}

export default useComodityFetch;