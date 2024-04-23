import useFetchData from "../hooks/useFetchData";
import Price from "./Price";


export default function Markets(){

  const user = JSON.parse(sessionStorage.getItem('auth'));
  const token = user.token_type + ' ' + user.access_token;

  const comodity = useFetchData('http://localhost:8000/api/comodity/market',{
    method:'get',
    headers:{
      "Authorization": token
    }
  });
// console.log(comodity);
  return(
    <div>
      <Price/>
      <div className="p-24" style={{backgroundColor:"#334B35"}}>
        <div class="container mx-auto bg-white relative flex flex-col w-full h-full overflow-scroll text-gray-700 shadow-md bg-clip-border rounded-xl">
          <table class="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Gudang
                  </p>
                </th>
                <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Alamat
                  </p>
                </th>
                <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Komoditi Tersedia
                  </p>
                </th>
                <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
                </th>
              </tr>
            </thead>
            <tbody>
             {comodity?.data.map(com=>{
              return <tr class="even:bg-blue-gray-50/50">
                <td class="p-4">
                  <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {com.region}
                  </p>
                </td>
                <td class="p-4">
                  <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {com.address}
                  </p>
                </td>
                <td class="p-4">
                  <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {com.comodity.length}
                  </p>
                </td>
                <td class="p-4">
                  <a href={"/market/"+com.id} class={com.comodity.length >0 ?"block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900" : "block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 pointer-events-none"}>detail</a>
                </td>
              </tr>
            })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}