import { useEffect, useState } from "react"
import user from "../../utils/user"
import useFetchData from "../../hooks/useFetchData"


export default function Sale(){
  
  const token = user.token_type + ' ' + user.access_token;
 
  const [comodity,setComodity] = useState();

  const [com,setCom] = useState(0);

  const sale = (id)=>{
    fetch(`http://localhost:8000/api/comodity/${id}`,{
      method:'put',
      headers:{
        "Authorization":token
      },
      body:JSON.stringify({
        status:'store'
      })
    })
    .then(response=>{
      setCom(id)
    });
  }

  useEffect(()=>{
    fetch('http://localhost:8000/api/comodity/list',{
      method:'get',
      headers:{
        "Authorization":token
      }
    })
    .then(response=>response.json())
    .then(result=>setComodity(result));
  },[com]);
  console.log(comodity);
  return(
    // <ComodityTableComponent/>
    <section style={{backgroundColor:'#334B35'}}>
    <div className="container flex flex-wrap mx-auto p-24">
      <h1 className="font-bold text-2xl text-white">Daftar Pengajuan Komoditas</h1>
     <div className="w-full h-96 mt-4">
        
          <table className="text-white w-full border-collapse border border-slate-400 table-auto">
            <thead>
              <tr>
                <th className="p-4 border border-slate-300 bg-slate-400">Jenis</th>
                <th className="p-4 border border-slate-300 bg-slate-400">Jumlah</th>
                <th className="p-4 border border-slate-300 bg-slate-400">Status</th>
                <th className="p-4 border border-slate-300 bg-slate-400">Harga Simpan</th>
                <th className="p-4 border border-slate-300 bg-slate-400">Lokasi Gudang</th>
              </tr>
            </thead>
          <tbody>

          {comodity?.data.map(com=>{
            console.log(com.comodity);

            return<tr className="text-center">
              <td className="p-4 border-b">{com.comodity_type.name}</td>
              <td className="p-4 border-b">{com.amount}</td>
              <td className="p-4 border-b">{com.status}</td>
              <td className="p-4 border-b">{com.price==null? '-': com.price}</td>
              <td className="p-4 border-b">
                <ul>
                  <li>{com.warehouse.region}</li>
                  <li>{com.warehouse.address}</li>
                </ul>
              </td>
            </tr>
          })}
          </tbody>
          <tfoot>
            <td></td>
            <td></td>
            <td></td>
          </tfoot>
          </table>
        
     </div>
    </div>
  </section>
  )
}