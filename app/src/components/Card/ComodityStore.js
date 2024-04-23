import { useEffect, useState } from "react"
import user from "../../utils/user"


export default function ComodityStore({comodity,onSale}){
  
  // const token = user.token_type + ' ' + user.access_token;

  // const [id,setId] = useState(0);
  // const [comodity,setComodity] = useState();


  // const sale = (id)=>{
  //   fetch(`http://localhost:8000/api/comodity/${id}`,{
  //     method:'put',
  //     headers:{
  //       "Authorization":token
  //     },
  //     body:JSON.stringify({
  //       status:'available'
  //     })
  //   })
  //   .then(response=>response.json())
  //   .then(result=>setId(id));
  // }


  

  // useEffect(()=>{
  //   fetch('http://localhost:8000/api/comodity/status/store',{
  //     method:'get',
  //     headers:{
  //       "Authorization":token
  //     }
  //   })
  //   .then(response=>response.json())
  //   .then(result=>setComodity(result));
  // },[id])

  // console.log(comodity);
  return(
    <div className="w-[45%] bg-white rounded-md">
        <div className="p-4">
          <h2>Komoditi Disimpan</h2>
        </div>
        <div className="p-4">
          
            {comodity?.data.map(com=>{
            return(
              com.comodity.status == 'store' ?
              <div className="flex justify-between mb-4">
                <div>
                  <h5 className="text-md font-bold">{com.comodity.name}</h5>
                  <p>Harga simpan</p>
                  <span>{com.comodity.price}</span>
                </div>
                <div className="px-4"> 
                  <p><span className={`${com.comodity.price > com.comodity.current_price ? 'bg-red-600' : 'bg-green-600'} px-4 py-1 rounded-xl text-white text-xs`}>{com.comodity.current_price}</span></p>
                  <p className="mt-2"><span className={`${com.comodity.price > com.comodity.current_price ? 'bg-red-600' : 'bg-green-600'} px-4 py-1 rounded-xl text-white text-xs`}>{com.comodity.ratio}</span></p>
                  <button type="" className="bg-red-500 px-4 py-1 mt-2 text-white hover:bg-red-700 text-sm rounded-2xl" onClick={()=>onSale(com.comodity)}>jual</button>
                </div>
              </div>
            :false
            )
            })}
        
        </div>
    </div>
  )
}