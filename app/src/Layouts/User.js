import { Outlet, useNavigate } from "react-router-dom";
import auth from "../utils/auth";
import { useEffect } from "react";

function User() {
  const navigate=useNavigate();

  useEffect(()=>{
    if(!sessionStorage.getItem('auth')){
      navigate('/login');
    }
  },[])

  const handleSubmit = async () =>{
    const response = await auth('http://localhost:8000/api/logout')
    if(response){
      alert('succes logout');
      navigate('/login');
      sessionStorage.clear();
    }
  }
return(
  <div>
  <header>
    <nav class="" style={{backgroundColor: '#334B35'}}>
      <div class="flex justify-between container mx-auto p-4 px-24">
        <h1 class="font-bold" style={{color:'#F7C35F'}}>Example logo</h1>

      <div class="text-white text-sm font-medium my-auto space-x-12">
        <a href="/dashboard">Dashboard</a>
        <a href="/market">Market</a>
        <button onClick={handleSubmit}>Sign out</button>
      </div>
        
      </div>
    </nav>
  </header>
<Outlet/>
  <footer style={{backgroundColor:'#2D442F'}}>
    <div class="container mx-auto h-full">
      <div class="flex flex-wrap  h-full">
        <div class="w-[55%] p-24 space-y-4">
          <h1 class="text-4xl text-white font-bold">Agriculture</h1>
          <p class="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem possimus dolores hic!</p>
          <hr/>
        </div>
         <div class="w-[45%] p-24 ">
          <div class="flex">
            <div class="w-1/2 space-y-4">
              <h1 class="text-white text-2xl font-bold">Useful Links</h1>
              <div class="text-white space-y-4">
              <a class="block" href="">Comodity</a>
              <a class="block" href="">Service</a>
              <a class="block" href="">About Us</a>
              <a class="block" href="">Home</a>
              </div>
            </div>
            <div class="w-1/2 flex justify-center">
              <h1 class="text-white text-2xl font-bold">News</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>

  </div>
)
}

export default User;