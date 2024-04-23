import { useEffect, useState } from "react"
import user from "../../utils/user"
import useFetchData from "../../hooks/useFetchData"
import useComodityFetch from "../../hooks/useComoditiyFetch";
import ComodityStore from "../../components/Card/ComodityStore";
import ComoditySale from "../../components/Card/ComoditySale";

export default function Store(){
  
  const token = user.token_type + ' ' + user.access_token;

  
  // const initialComoditys = useComodityFetch('http://localhost:8000/api/comodity/all',{
  //     method:'get',
  //     headers:{
  //       "Authorization":token
  //     }})

  const [id,setId] = useState(0);
  const [comoditys,setComodity] = useState(null)

  useEffect(()=>{
    fetch('http://localhost:8000/api/comodity/all',{
      method:'get',
      headers:{
        "Authorization":token
      }
    })
    .then(response=>response.json())
    .then(result=>setComodity(result));

 

  },[id])
  

  function hadleChangeStatus(comodity){
    return comoditys.data.map(c=>{
      if(c.comodity.id == comodity.id){
        console.log(comodity.status);
        const current = comodity.status == 'store' ? 'available' : 'store'
        fetch(`http://localhost:8000/api/comodity/${comodity.id}`,{
              method:'put',
              headers:{
                "Authorization":token
              },
              body:JSON.stringify({
                status:current
              })
            })
            .then(response=>response.json())
            .then(result=>id == comodity.id ? setId(0): setId(comodity.id));
      }
  
    })
  }
console.log(comoditys);

  return(

    <section style={{backgroundColor:'#334B35'}}>
    <div className="container flex flex-wrap mx-auto p-24 justify-between border">
      {/* <h1 className="font-bold text-2xl text-white">Daftar Komoditas</h1> */}
     {/* <div className="w-full h-96 mt-4"> */}
      
    <ComodityStore comodity={comoditys} onSale={hadleChangeStatus}/>
    <ComoditySale comodity={comoditys} onStore={hadleChangeStatus}/>
    
      {/* <ComoditySale comodity={comodity}/> */}
          {/* <table className="text-white w-full border-collapse border border-slate-400 table-auto">
            <thead>
              <tr>
                <th className="p-4 border border-slate-300 bg-slate-400">Jenis</th>
                <th className="p-4 border border-slate-300 bg-slate-400">Jumlah</th>
                <th className="p-4 border border-slate-300 bg-slate-400">Status</th>
                <th className="p-4 border border-slate-300 bg-slate-400">Harga Simpan</th>
                <th className="p-4 border border-slate-300 bg-slate-400">Harga</th>
                <th className="p-4 border border-slate-300 bg-slate-400">Rasio</th>
                <th className="p-4 border border-slate-300 bg-slate-400">Lokasi Gudang</th>
                <th className="p-4 border border-slate-300 bg-slate-400">Opsi</th>
              </tr>
            </thead>
          <tbody>

          {comodity?.data.map(com=>{
            console.log(com.comodity);

            return<tr className="text-center">
              <td className="p-4 border-b">{com.comodity.name}</td>
              <td className="p-4 border-b">{com.comodity.amount}</td>
              <td className="p-4 border-b">{com.comodity.status}</td>
              <td className="p-4 border-b">{com.comodity.price==null? '-': com.comodity.price}</td>
              <td className="p-4 border-b">{com.comodity.current_price}</td>
              <td className="p-4 border-b">{com.comodity.ratio==null? '-': com.comodity.ratio <0 ? <span className="text-red-500">{com.comodity.ratio}</span>: <span className="text-green-500">{com.comodity.ratio}</span>}</td>
              <td className="p-4 border-b">
                <ul>
                  <li>{com.comodity.warehouse.region}</li>
                  <li>{com.comodity.warehouse.address}</li>
                </ul>
              </td>
              <td className="p-4">
                <button type="" onClick={()=>sale(com.comodity.id)} className="px-4 rounded-md text-sm bg-red-600 text-white">jual</button>
              </td>
            </tr>
          })}
          </tbody>
          <tfoot>
            <td></td>
            <td></td>
            <td></td>
          </tfoot>
          </table> */}
        
     </div>
    {/* </div> */}
  </section>
  )
}


