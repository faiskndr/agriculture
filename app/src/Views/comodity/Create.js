import {useState } from "react";
import GeoChart from "../../components/D3/GeoChart";
import jateng from "../../jawa_tengah.json";
import useFetchData from "../../hooks/useFetchData";
import sendRequest from "../../utils/sendRequest";
import { useNavigate } from "react-router-dom";

export default function Create(){
  const navigate = useNavigate();
  const [warehouse,setWarehouse]= useState();
  const [amount,setAmount]= useState(0);
  const [category,setCategory] = useState();
  const [selectWarehouse,setSelectWarehouse] = useState();
  const categories = useFetchData('http://localhost:8000/api/category');
  const getWarehouse =(w)=>{
    setWarehouse(w);
  }

  const handleRequest = ()=>{
    const response = sendRequest('http://localhost:8000/api/comodity',{
      amount,
      category,
      selectWarehouse
    });
    if(response){
        navigate('/dashboard');
    }
    
  }

  return (
    <section style={{backgroundColor:'#334B35'}}>
    <div className="container flex flex-wrap mx-auto p-24">
     <form className="w-1/2 p-4 rounded-md" style={{backgroundColor:'#445945'}}>
      <h1 className="font-bold text-2xl text-white">Pengajuan Komoditas</h1>

        <div className="mt-10 grid grid-cols-1 gap-y-4">
            <div className="sm:col-span-3">
                <label for="" className="block text-sm font-medium text-white">Jumlah</label>
                <div class="mt-2">
                  <input onChange={e=>setAmount(e.target.value)} type="number" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400sm:text-sm sm:leading-6"/>
                </div>
            </div>
            <div className="sm:col-span-3">
                <label for="" className="block text-sm font-medium text-white">Jenis Komoditas</label>
                <div class="mt-2">
                 <select onChange={e=>setCategory(e.target.value)} className="block w-full rounded-md py-1.5 pl-2">
                  <option value="">Pilih Jenis Komoditas</option>
                  {categories?.map(categorie=>{
                      return <option value={categorie.id}>{categorie.name}</option>
                    })
                  }
                 </select>
                </div>
            </div>  
        </div>
     </form>
     <div className="w-1/2 border">
          <GeoChart data={jateng} parentCallback={getWarehouse}/>
     </div>
     <div className="w-full h-96">
        {warehouse?.data.length>0? 
          <table className="text-white w-full border-collapse border border-slate-400 table-auto">
            <thead>
              <tr>
                <th className="p-4 border border-slate-300 bg-slate-400">Daerah</th>
                <th className="p-4 border border-slate-300 bg-slate-400">Alamat</th>
                <th className="p-4 border border-slate-300 bg-slate-400">Kapasitas</th>
                <th className="p-4 border border-slate-300 bg-slate-400">Pilih</th>
              </tr>
            </thead>
          <tbody>

          {warehouse.data.map(wh=>            
            <tr className="text-center">
              <td className="p-4 border-b">{wh.region}</td>
              <td className="p-4 border-b">{wh.address}</td>
              <td className="p-4 border-b">{wh.available}</td>
              <td className="p-4 border-b">
                <input onChange={e=>setSelectWarehouse(e.target.value)} type="checkbox" value={wh.id}/>
              </td>
            </tr>
          )}
          </tbody>
          <tfoot>
            <td></td>
            <td></td>
            <td></td>
          <div className="sm:col-span-3 mt-4 pb-4 pr-2">
              <button onClick={handleRequest} className="w-full py-2 rounded-md" style={{backgroundColor:'#F7C35F'}}>Ajukan</button>
            </div>
          </tfoot>
          </table>
        :null}
     </div>
    </div>
  </section>
  )
}