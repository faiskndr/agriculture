import { useParams } from "react-router-dom"
import useFetchData from "../hooks/useFetchData";
import img from "../images/1702550147683.png"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Market(){
  const navigate = useNavigate();
  const id = useParams();
  const user = JSON.parse(sessionStorage.getItem('auth'));
  const token = user.token_type + ' ' + user.access_token;
  const [query, setQuery] = useState(null);
  const [data,setData] = useState();
  // const data = useFetchData(`http://localhost:8000/api/comodity/market/${id.id}`,{
  //   method:'get',
  //   headers:{
  //     'Authorization': token
  //   }
  // });

  useEffect(()=>{
    fetch(`http://localhost:8000/api/comodity/market/${id.id}?q=${query}`,{
      method:'get',
      headers:{
        'Authorization': token
      }
    })
    .then(response=>{
      if(response.status == 401){
        navigate('/login');
        sessionStorage.clear();
      }
     else{
     return response.json()
    }})
    .then(result=>setData(result));
  },[query]);
  console.log(data?.data);
  return(
    <section style={{backgroundColor:"#334B35"}}>
    <div className="container  mx-auto text-white" >
    {data?.data.map(warehouse=>{
      return <div className="flex flex-wrap w-full h-full">
          <div className="w-full md:w-1/2 p-24">
              <h2 className="text-xl">Gudang {warehouse.region}</h2>
              <img src={img} alt=""/>
          </div>
          <div className="w-full md:w-1/2  p-24">
            <input className="text-slate-900" type="" onChange={e=>setQuery(e.target.value)}/>
            <table className="w-full text-left table-auto min-w-max">
              <tr>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Jenis</th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Jumlah</th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Harga</th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Opsi</th>
              </tr>
              {warehouse.comodity != null? warehouse.comodity.map(com=>{
                  return <tr> 
                <td className="p-4"> <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {com.comodity.name}
                </p></td>
                <td className="p-4"> <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {com.comodity.amount}
                </p></td>
                <td className="p-4"> <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {com.comodity.current_price}
                </p></td>
                <td className="p-4">
                  <a href={"/checkout/"+com.comodity.id} className={com.comodity.user_id !== user.user.id?"bg-green-600 py-2 px-4 text-white hover:bg-green-700":
                "bg-green-600 py-2 px-4 text-white hover:bg-green-700 cursor-not-allowed pointer-events-none"}>Beli</a>
                </td>
                </tr>
              }):null
              }
            </table>
          </div>
      </div>
    })}
    </div>
    </section>
  )
}