// import img5 from "../images/breathtaking_illustration_of_s.jpeg";
import img5 from "../../images/breathtaking_illustration_of_s.jpeg"

export default function warehouse(props){
    return(
        <div class="item relative ">
            <a class="" href="/warehouse">
            <img class="max-h-80" src={img5} alt=""/>
            <div class="opacity-0 mb-2 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-end text-3xl text-white font-semibold">{props.region}</div>
            </a>
         </div>
    )
}