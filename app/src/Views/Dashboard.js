import { useEffect, useState } from "react"
import data from "../comodity.json";
import comodityMean from "../utils/comodityMean";
import { useNavigate } from "react-router-dom";
import DonutChart from "../components/Chart/DonutChart";



export default function Dashboard(){
  const [comodity,setComodity] = useState();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('auth'));
  
  // const mean = comodityMean(data);
    useEffect(()=>{
      
      if(user === null){
        navigate('/');
      }else{
      const token = user.token_type + ' ' + user.access_token;
      fetch('http://localhost:8000/api/comodity/count',{
        method:'get',
        headers:{
          "Authorization": token
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
      .then(result=>setComodity(result));
      }
    },[])
  
  return(
    <section style={{backgroundColor:'#334B35'}}>
    <div class="container mx-auto p-24">
      <div class="flex flex-wrap w-full h-full ">
        <div class="md:w-[25%] w-full  p-4">
          <div class="flex flex-wrap justify-center w-full h-64 p-4"  style={{backgroundColor:'#445945'}}>
            <div class="text-center">
              <h2 class="font-bold text-xl text-white text-center mb-20">Tambah komoditas</h2>
              <a href="/comodity/add" class="w-full md:px-8 py-2 px-4 rounded-md" style={{backgroundColor:'#F7C35F'}}>Tambah</a>
            </div>
          </div>
        </div>
        <div class="md:w-[75%] w-full  py-4">
          <div class="flex flex-wrap gap-x-2 gap-y-4 justify-center ">
             <a href="/comodity/list" class="flex flex-wrap justify-center content-center max-w-48 rounded-md text-center p-4 shadow-md"  style={{backgroundColor:'#445945'}}>
              <div class="text-white p-4">
                <h2 class="font-bold">Pengajuan Komoditas</h2>
                <h2>{comodity?.request}</h2>
              </div>
            </a>  

            <a href="/comodity/store" class="flex flex-wrap justify-center content-center max-w-48 rounded-md text-center p-4 shadow-md"  style={{backgroundColor:'#445945'}}>
              <div class="text-white p-4">
                <h2 class="font-bold">Komoditas</h2>
                <h2>{comodity?.accepted}</h2>
              </div>
            </a>  

            <a class="flex flex-wrap justify-center content-center max-w-48 rounded-md text-center p-4 shadow-md"  style={{backgroundColor:'#445945'}}>
              <div class="text-white p-4">
                <h2 class="font-bold">Komoditas Dijual</h2>
                <h2>{comodity?.sale}</h2>
              </div>
            </a>  

            <a href="/comodity/reciept" class="flex flex-wrap justify-center content-center max-w-48 rounded-md text-center p-4 shadow-md"  style={{backgroundColor:'#445945'}}>
              <div class="text-white p-4">
                <h2 class="font-bold">Total Resi</h2>
                <h2>{comodity?.reciept}</h2>
              </div>
            </a>  

            <a class="flex flex-wrap justify-center content-center w-48 h-32 rounded-md text-center p-4 shadow-md"  style={{backgroundColor:'#445945'}}>
              <div class="text-white">
                <h2 class="font-bold">Total Pendapatan</h2>
                <h2>{comodity?.income}</h2>
              </div>
            </a>  

            <a href="/comodity/transactions" class="flex flex-wrap justify-center content-center w-48 h-32 rounded-md text-center p-4 shadow-md"  style={{backgroundColor:'#445945'}}>
              <div class="text-white">
                <h2 class="font-bold">Transaksi</h2>
                <h2>{comodity?.transactions}</h2>
              </div>
            </a>  
            <a href="/comodity/buy" class="flex flex-wrap justify-center content-center w-48 h-32 rounded-md text-center p-4 shadow-md"  style={{backgroundColor:'#445945'}}>
              <div class="text-white">
                <h2 class="font-bold">Total Pembelian</h2>
                <h2>{comodity?.buy}</h2>
              </div>
            </a>

            {/* <DonutChart data={comodity}/>    */}
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}