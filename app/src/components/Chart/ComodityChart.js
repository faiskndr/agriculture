import ReactApexChart from "react-apexcharts";
import { ComodityChartOption } from "../../ComodityChartOption";
import comodityPrice from "../../utils/comidityPrice";
import useFetchData from "../../hooks/useFetchData";
import { ChartLineOptions } from "../../ComodityChartLineOpt";


function ComodityChart(comodity) {
  // console.log(comodity);
  // const ohlc = comodityPrice(comodity);
  const data = useFetchData(`http://localhost:8000/api/comodity/prices/${comodity.comodity}`);
  var prices = [];

  if(data?.length>0){
  data?.map(val=>{
    prices.push({x:val.created_at,y:val.price});
  })
  }
  
  return(
    <div id="chart">
     
    {/* <ReactApexChart
      series={
        [
          {
            data:ohlc
          }
        ]
        }
        options={ComodityChartOption}
        type="candlestick"
        height={350}
    /> */}

    <ReactApexChart
        series={
          [
            {
              data:prices
            }
          ]
        }
        options={ChartLineOptions}
        type="line"
        height={350}
    />
     </div>
  )
}

export default ComodityChart;