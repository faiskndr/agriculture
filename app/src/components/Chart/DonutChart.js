import ReactApexChart from "react-apexcharts";


export default function DonutChart(data){
  console.log(data);
  let labels = [];
  let series = [];

  data?.data.forEach(val => {
      labels.push(val.status);
      series.push(val.total);
  }); 

  console.log(labels);

  const options = {
    chart: {
      type: 'donut',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    labels: labels
  }


return(
  <div id="chart" style={{backgroundColor:'white'}}>
  <ReactApexChart
    options={options}
    series={
      series
    }
    type="donut"
    height={200}
  />
  </div>
  )
}