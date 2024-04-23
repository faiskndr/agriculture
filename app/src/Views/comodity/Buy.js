import useFetchData from "../../hooks/useFetchData";
import user from "../../utils/user";


export default function Buy(){
    const token = user.token_type + ' ' + user.access_token;
    const buys = useFetchData('http://localhost:8000/api/comodity/buy',{
        headers:{
            "Authorization":token
          },
    });
    console.log(buys);
    return(
        <div className="p-24" style={{backgroundColor:"#334B35"}}>
        <div class="container text-white mx-auto relative flex flex-col w-full h-full overflow-scroll text-gray-700 shadow-md bg-clip-border rounded-xl" style={{backgroundColor:'#445945'}}>
        <h1 className="font-bold text-2xl text-white">Daftar Pembelian Komoditas</h1>
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
                    Harga Beli
                  </p>
                </th>
                <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p class="block font-sans text-sm antialiased font-normal leading-none">
                    Kuantitas
                  </p>
                </th>
                <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p class="block font-sans text-sm antialiased font-normal leading-none">
                    Total
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
             {buys?.data.map(buy=>{
              return <tr class="even:bg-blue-gray-50/50">
                <td class="p-4">
                  <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {buy.id}
                  </p>
                </td>
                <td class="p-4">
                  <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {buy.comodity.comodity_type.name}
                  </p>
                </td>
                <td class="p-4">
                  <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {buy.total /buy.qty}
                  </p>
                </td>
                <td class="p-4">
                  <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {buy.qty}
                  </p>
                </td>
                <td class="p-4">
                  <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {buy.total}
                  </p>
                </td>
              </tr>
            })}
            </tbody>
          </table>
        </div>
      </div>
      );
}