import { useState } from "react";
import img from "../images/1702550147683.png"


export default function SignUp(){
  const [username,setUsername] =useState();
  const [password,setPassword] = useState();
  return(
    <section class="" style={{backgroundColor:'#334B35',height:'100vh'}}>
    <div class="container mx-auto h-full p-24">
      <div class="w-full h-full mt-2 rounded-md drop-shadow-md  flex justify-center" style={{backgroundColor:'#38553a'}}>
        <div class="flex w-1/2 relative p-8 justify-center">
          <h1 class="text-4xl font-bold text-center absolute mt-12" style={{color:'#F7C35F'}}>Sign in to Get Full Access</h1>
          <img src={img} class="max-w-[550px] mt-4" alt=""/>
        </div>
        <form class="flex justify-center items-center  w-full">
          <div class="mt-10 p-24 space-y-4 w-full ">
            <div class="">
              <label for="username" class="block text-md font-medium leading-6 text-white">Username</label>
              <div class="mt-2">
            
                  <input onChange={e=>setUsername(e.target.value)} type="text" name="username" id="username" autocomplete="username" class="w-full rounded-md pl-2 -0 t py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="username"/>
                
              </div>
            </div>
            <div class="">
              <label for="password" class="block text-md font-medium leading-6 text-white">Password</label>
              <div class="mt-2">
            
                  <input onChange={e=>setPassword(e.target.value)} type="password" name="password" id="password" autocomplete="password" class="w-full rounded-md pl-2 -0 t py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="password"/>
                
              </div>
            </div>
            <div class="py-2 text-center">
              <button class="w-full py-2 px-6 rounded-md mt-2" style={{backgroundColor:'#F7C35F'}}>Sign up</button>
                <p class="text-center mt-2 text-white mb-2">Or</p>
              <a href="/login" class="w-full py-2 px-6 rounded-md" style={{backgroundColor:'#F7C35F'}}>Sign in</a>
            </div>
            
  
          </div>
        </form>
      </div>
    </div>
    </section>
  )
}