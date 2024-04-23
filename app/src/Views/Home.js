import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import img1 from "../images/1702550147683.png"
import img2 from "../images/breathtaking_illustration_of_s.jpeg"
import img3 from "../images/image 20.png"
import img4 from "../images/breathtaking_illustration_of_s(1).jpeg";
import useFetchData from "../hooks/useFetchData";
import Warehouse from "../components/Card/warehouse";

function Home() {


  const warehouse = useFetchData('http://localhost:8000/api/warehouse');
  const comoditys = useFetchData('http://localhost:8000/api/category');
  var isLoading =  true;
  if(warehouse != null){
    isLoading = false
  }

  // console.log(comoditys);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const warehouseList = warehouse?.data.map(w=>(<Warehouse region={w.region}/>))
console.log(comoditys);
  return (
    <div>
        <section id="home" style={{backgroundColor:'#263C28'}}>
    <div class="container mx-auto px-24 py-10">
      <div class="flex flex-wrap justify-center items-center">
        <div class="w-full py-10 md:w-1/2 md:py-0">
          <h1 class="text-white text-5xl font-bold">Agriculture Peduli</h1>
          <h1 class="text-white text-5xl font-bold">Penyimpanan Komoditas</h1>
          <button class="py-3 px-10 rounded-md mt-2" style={{backgroundColor:'#F7C35F'}}>Join Now</button>
        </div>
        <div class="w-full md:w-1/2">
          <img  src={img1} alt=""/>
        </div>
      </div>
    </div>
  </section>

  <section id="about" style={{backgroundColor:'#263C28'}}>
    <div class="container  mx-auto px-24">
      <div class="flex">
        <div class="w-full md:w-1/2 p-12">
          <img class="h-96 rounded-md" src={img2} alt=""/>
        </div>
        <div class="w-full md:w-1/2 py-12">
          <p class="text-md font-thin text-white">OUR INTRODUCTION</p>
          <h1 class="text-4xl font-bold text-white mt-4">Pure Agriculture</h1>
          <h2 class="text-xl mt-10" style={{color:'#F7C35F'}}>We're leader in Agriculture</h2>
          <p class="font-light text-white">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, accusamus. Adipisci consec</p>
          <div class="mt-4">
            <div class="flex space-x-4 items-center">
              <div class="h-4 w-4 rounded-full bg-yellow-600"></div>
              <p class="">Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section style={{backgroundColor:'#263C28'}}>
    <div class="container mx-auto py-24  px-24">
      <h1 class="text-4xl text-white text-center font-bold">Daftar Komoditas Untuk Disimpan</h1>
      <div class="flex justify-evenly mt-12">
        {
          comoditys?.map(comodity=>{
            return <div class="w-32 h-32 rounded-md text-center" style={{backgroundColor:'#445945'}}><p className="mt-[45%] text-white font-bold text-lg">{comodity.name}</p></div>          
        })}
      </div>
    </div>
</section>

  <section>
    <div style={{backgroundColor:'#6D8C54'}}>
      <div class="flex flex-wrap">
        <div class="w-[45%]" >
            <img src={img3} alt=""/>
        </div>
        <div class="w-[55%] p-24">
          <p class="text-md text-white font-light">Agriculture</p>
          <div class="w-[70%] mt-2">
          <h1 class="text-4xl text-white font-bold">Menyediakan Produk Berkualitas Tinggi</h1>
        </div>
        </div>
      </div>
    </div>
  </section>

  <section id="Service" style={{backgroundColor:'#263C28'}}>
    <div class="container mx-auto py-24 p-24 ">
      <h1 class="text-center text-4xl font-bold text-white">Temukan Gudang Kami</h1>
      <div class=" mt-12">
        <Carousel responsive={responsive}> 
              {isLoading? <div>Loading...</div>  : warehouseList}
              {/* <div class="item relative ">
                  <a class="" href="">
                  <img class="max-h-80" src={img5} alt=""/>
                  <div class="opacity-0 mb-2 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-end text-3xl text-white font-semibold">Banyumas</div>
                </a>
              </div>
              <div class="item relative ">
                  <a class="" href="">
                  <img class="max-h-80" src={img5} alt=""/>
                  <div class="opacity-0 mb-2 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-end text-3xl text-white font-semibold">Banyumas</div>
                </a>
              </div>
              <div class="item relative ">
                  <a class="" href="">
                  <img class="max-h-80" src={img5} alt=""/>
                  <div class="opacity-0 mb-2 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-end text-3xl text-white font-semibold">Banyumas</div>
                </a>
              </div> */}
        </Carousel>
      </div>
    </div>
  </section>

  <section class="pb-28" style={{backgroundColor:'#263C28'}}>
    <div class="bg-gradient-to-r from-[#F8CC77] from-70% to-[#2D442F] w-full h-56">
      <img class=" w-full h-full object-cover opacity-20" src={img4} alt=""/>
    </div>
  </section>

    </div>
  )
}

export default Home;