import { useEffect,useRef } from "react"
import { select, hierarchy,tree,linkVertical } from "d3"

export default function TreeChart({data}){
    const svgRef = useRef();
    const wrapperRef = useRef();

    useEffect(()=>{
        const svg = select(svgRef.current);
        
        const root = hierarchy(data);
        // console.log(data);
        const generateLinkVertical = linkVertical().x(node=>node.y).y(node=>node.x);

        const treeLayout = tree().size([200,400]);
        treeLayout(root);
        console.log(root.descendants());
        console.log(root.links());
        svg.selectAll('.node')
        .data(root.descendants())
        .join('circle')
        .attr('class','node')
        .attr('r',4)
        .attr('fill','white')
        .attr('cx',node=>node.y)
        .attr('cy',node =>node.x)
       
        svg.selectAll('.link')
        .data(root.links())
        .join('path')
        .attr('class','link')
        .attr('fill','none')
        .attr('stroke','white')
        .attr('d',generateLinkVertical)

        svg.selectAll('.label')
        .data(root.descendants())
        .join('text')
        .style('fill','white')
        .attr('class','label')
        .text(node=>node.data.name)
        .attr('text-anchor','middle')
        .attr('font-size',20)
        .attr('x',node=>node.y)
        .attr('y',node=>node.x-10)

        svg.selectAll('.labelQty')
        .data(root.descendants())
        .join('text')
        .style('fill','white')
        .attr('class','labelQty')
        .text(node=>node.data.qty)
        .attr('text-anchor','middle')
        .attr('font-size',20)
        .attr('x',node=>node.y)
        .attr('y',node=>node.x-10)
    },[data])

    return(
        // <div ref={wrapperRef} className="bg-black overflow-auto h-[400px]">
        //     <svg ref={svgRef} className="w-full h-full"></svg>
        // </div>
        <div class="max-h-[200px] overflow-y-auto w-full">
            <svg ref={svgRef} className="w-full" style={{height:'500px'}}></svg>    
        </div>
      );
}