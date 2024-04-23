// import { redirect } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData"
import user from "../../utils/user"

export default function List(){

  const token = user.token_type + ' ' + user.access_token;
  const reciepts = useFetchData('http://localhost:8000/api/comodity/reciept',{
    method:'get',
    headers:{
      'Authorization':token
    }
  })

 


  const viewReciept = (id)=>{
    console.log(id);
   window.location.href= `http://localhost:8000/resi/${id}`
  }

  return(
    <section style={{backgroundColor:'#334B35'}}>
    <div className="container flex flex-wrap mx-auto p-24">
      <h1 className="font-bold text-2xl text-white">Daftar Resi</h1>
     <div className="w-full h-96 mt-4">
          <table className="text-white w-full border-collapse border border-slate-400 table-auto">
            <thead>
              <tr>
              <th className="p-4 border border-slate-300 bg-slate-400">Nama</th>
                <th className="p-4 border border-slate-300 bg-slate-400">Jumlah</th>
                <th className="p-4 border border-slate-300 bg-slate-400">Biaya Penyimpanan</th>
                <th className="p-4 border border-slate-300 bg-slate-400">Detail</th>
              </tr>
            </thead>
          <tbody>
          {reciepts?.data.map(com=>{
            console.log(com);

            return(
            <tr className="text-center">
              <td className="p-4 border-b">{com.comodity}</td>
              <td className="p-4 border-b">{com.amount}</td>
              <td className="p-4 border-b">{com.storage_cost}</td>
              <td className="p-4 border-b">
                <button onClick={()=>viewReciept(com.id)}>detail</button>
              </td>
            </tr>
            )
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