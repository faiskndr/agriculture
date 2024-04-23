import useFetchData from "../hooks/useFetchData";
import TreeChart from "../components/D3/TreeChart";

export default function Transactions(){
  const user = JSON.parse(sessionStorage.getItem('auth'));
  const token = user.token_type + ' ' + user.access_token;
  const transactions = useFetchData('http://localhost:8000/api/comodity/transactions',{
    method:'get',
    headers:{
      "Authorization": token
    }
  })
  // console.log(transactions);
  let isLoading = true;
  if(transactions != null){
    isLoading = false
  }

console.log(transactions);

  return(
    <div className="p-24" style={{backgroundColor:"#334B35"}}>
    <div class="container text-white mx-auto relative flex flex-col w-full h-full overflow-scroll text-gray-700 shadow-md bg-clip-border rounded-xl" style={{backgroundColor:'#445945'}}>
      {isLoading? <div>Loading</div> :
      
        <TreeChart data={transactions}/>
      
      }
      <table class="w-full text-left table-auto min-w-max">
        <thead>
          <tr>
            <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p class="block font-sans text-sm antialiased font-normal leading-none">
                Id
              </p>
            </th>
            <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p class="block font-sans text-sm antialiased font-normal leading-none ">
                Komoditi
              </p>
            </th>
            <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p class="block font-sans text-sm antialiased font-normal leading-none">
                Transaksi
              </p>
            </th>
            <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p class="block font-sans text-sm antialiased font-normal leading-none"></p>
            </th>
          </tr>
        </thead>
        <tbody>
         {transactions?.children.map(transaction=>{
          return <tr class="even:bg-blue-gray-50/50">
            <td class="p-4">
              <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                {transaction.id}
              </p>
            </td>
            <td class="p-4">
              <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                {transaction.name}
              </p>
            </td>
            <td class="p-4">
              <ul>
                {transaction.children.map(t=>{
                return <li>
                  <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {t.qty}
                  </p>
                  <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {t.total}
                  </p>
                </li>
                })}
              </ul>
            </td>
            <td class="p-4">
              {/* <a href={"/market/"+com.id} class={com.comodity.length >0 ?"block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900" : "block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 pointer-events-none"}>detail</a> */}
            </td>
          </tr>
        })}
        </tbody>
      </table>
    </div>
  </div>
  );
}