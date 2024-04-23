

export default function comodityPrice(comodity){
  let open = [];
  let close = [];
  let ohlc = [];
  comodity.comodity.data.map(d=>{
    if (d.by_date.length !== 0 && d.type == 'national') {
        d.by_date.map(m=>{  
          // console.log(m.date + ' ' + m.geomean);
          // mean.push({'date':m.date,'mean':m.geomean})
          m.raw_data.prices.every(p=>{
        
            if(p!== "-"){
            open.push(p);
            return false;
          }
          return true;
          });
          
          for(let i = m.raw_data.prices.length-1; i>0; i--){
            if(m.raw_data.prices[i] !== "-"){
              close.push(m.raw_data.prices[i]);
              break;
            }
          }
        })
       d.by_date.map((h,i)=>{
   
        let tmp = [];
        h.raw_data.prices.every(p=>{
        
          if(p!== "-"){
          tmp.push(p);
        }
        return true;
        });

        ohlc.push({x:h.date, y:[open[i],Math.max.apply(null,tmp),Math.min.apply(null,tmp),close[i]]});
       })
    }
  })
  return ohlc;
}