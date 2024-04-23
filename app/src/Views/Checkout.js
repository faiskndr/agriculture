import { useParams } from "react-router-dom"
import useFetchData from "../hooks/useFetchData";
import { useState } from "react";


export default function Checkout(){
  const id = useParams();
  const user = JSON.parse(sessionStorage.getItem('auth'));
  const token = user.token_type + ' ' + user.access_token;
  const [qty, setQty] = useState(0);
  const [total,setTotal] = useState(0);

  const comodity = useFetchData(`http://localhost:8000/api/comodity/${id.id}`,{
    method:'get',
    headers:{
      'Authorization': token
  }});

  const handleSubmit = (e)=>{
    e.preventDefault();
    fetch('http://localhost:8000/api/comodity/checkout',{
      method:'post',
      headers:{
        'Authorization': token
      },
      body:JSON.stringify({
        'comodity_id':id.id,
        'qty':qty,
        'total':total
      })
    })
    .then(response=>response.json())
    .then(result=>console.log(result))
  }

  // console.log(comodity);

  return(
    <section style={{height:"100vh"}}>
        <div className="container flex flex-wrap mx-auto p-24">
          <div className="w-1/2 h-full border">
          <h1 className="text-2xl font-bold">Checkout Komoditas</h1>
            <form className="w-full h-full shadow-md p-4" onSubmit={handleSubmit}>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                  Pemilik
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={comodity?.data.comodity.seller} disabled/>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="stok">
                  Stok Tersedia
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={comodity?.data.comodity.amount} id="stok" type="number" disabled/>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="price">
                  Harga
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={comodity?.data.comodity.current_price} id="price" type="number" disabled/>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="price">
                  Kuantitas
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="number" onChange={e=>setTotal(e.target.value * comodity?.data.comodity.current_price)} onKeyUp={e=>setQty(e.target.value)}/>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="total">
                  Total
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="total" type="number" value={total} disabled/>
              </div>
              <div className="mb-4">
                  <button className="px-8 py-1.5 bg-green-700 hover:bg-green-800 text-white">Beli</button>
              </div>
            </form>
          </div>
        </div>
    </section>
  )
}