import ComodityChart from "../components/Chart/ComodityChart";
import { useState } from "react";
import ExampleChart from "../components/Chart/ExampleChart";
import gabah from "../comodity.json";
import gabahPenggiling from "../gabah_penggiling.json";
import useFetchData from "../hooks/useFetchData";

function Price() {
  const category = useFetchData('http://localhost:8000/api/comodity/category');
  // console.log(category);
  const [c,selectC] = useState(1);
  // var comodity = gabah;
  
  return(
    // <ExampleChart/>
    <section class="p-24" style={{backgroundColor:"#334B35"}}>
    <div class="container shadow-md mx-auto border h-full p-24 bg-white rounded-md">
      <div class="flex justify-between">
      <h1 class="text-4xl font-bold" style={{color:'#F7C35F'}}>Comodity Price</h1>
      <select class="w-48 px-6" onChange={e=>selectC(e.target.value)}>
       {
        category?.map(com=>{
          return <option value={com.id}>{com.name}</option>
        })
       }
      </select>
      </div>
      
      <div class="w-full h-full mt-2 rounded-md drop-shadow-md" >
        <ComodityChart comodity={c}/>
      </div>
    </div>
  </section>
  )
}

export default Price;