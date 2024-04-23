

export default function comodityMean(comodity){
  var mean = [];
  // console.log(comodity);
  comodity.data.map(d=>{
    if (d.by_date.length !== 0 && d.type == 'national') {
        d.by_date.map(m=>{  
          // console.log(m.date + ' ' + m.geomean);
          mean.push({'date':m.date,'mean':m.geomean})
        
          
          
        })
    }
  })
  return mean;
}