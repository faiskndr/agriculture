import {useEffect,useRef,useState } from "react";
import { select,geoPath, geoMercator,min,max,scaleLinear } from "d3";
// import useResizeObserver
import useGetWarehouse from "../../hooks/useGetWarehouse";
import useFetchData from "../../hooks/useFetchData";

function GeoChart({data,parentCallback}) {
  
  const svgRef = useRef();
  const wrapperRef = useRef();
  const [kab, setKab] = useState(null);
  const warehouse = useGetWarehouse(kab && kab.properties.KABKOTNO);
  const [total,setTotal] = useState([]); 
  

  
if(total.length>0){
  for(let t in total){
      for(let f in data.features){
        if(total[t].region_id === data.features[f].properties.KABKOTNO){
        data.features[f].properties.warehouse = total[t].total;
        break;
        }
      }  
    }
  console.log(total);
}

  parentCallback(warehouse);
  sessionStorage.setItem('warehouse',JSON.stringify(warehouse));

  useEffect(()=>{
    fetch('http://localhost:8000/api/warehouse/total')
    .then(response=>response.json())
    .then(result=>setTotal(result));
 
    const svg = select(svgRef.current);
    const minWarehouse = min(total,total=>total.total);
    const maxWarehouse = max(total,total=> total.total);
    
    const color = scaleLinear().domain([minWarehouse,maxWarehouse]).range(["#ccc",'green'])

    const {width, height} = wrapperRef.current.getBoundingClientRect();
    const projection = geoMercator().fitSize([width,height],kab||data);
    const pathGenerator = geoPath().projection(projection);
    svg.selectAll(".kab")
    .data(data.features)
    .join("path")
    .on("click",(feature,i)=>{
      setKab(kab===i?null:i);
    })
    .attr("class","kab")
    .attr("fill",feature=>color(feature.properties.warehouse))
    .transition()
    .attr("d",feature=>pathGenerator(feature.geometry));

    svg.selectAll(".label")
    .data([kab])
    .join("text")
    .attr("class","label")
    .text(
      res=> res && res.properties.KABKOT + ' ' + res.properties.KABKOTNO
            + ' Daftar Gudang ' + warehouse?.data.map(w=>{
            return  [`kapasitas ${w.capacity}`,`alamat ${w.address}`]
            }) 
    )
    .attr("x",10)
    .attr("y",20);
    

  },[data,kab,warehouse,total.length]);
  
    
  return(
    <div ref={wrapperRef} style={{marginBottom:"2rem"}}>
        <svg ref={svgRef} style={{width:"100%", height:"400px"}}></svg>
    </div>
  );
}

export default GeoChart;