import { data } from "../../result.js"
import "./Featured.css"
import Chart from "../Chart/Chart"
import Bigchart from "../Bigchart"
import Piechart from "../Piechart"

function Featured() 
{
  return (
    <div className="featured">
      
      <div className="featuredpiechart">

        {/* Top 5 least available { default : desc } */}
        <Piechart
          data={data}
          title="Top 5 Required products"
          dataKey="requirement_in_mt_"
        />
        
        {/* Top 5 least available { order : asc } */}
        <Piechart
          data={data}
          title="Top 5 Least available products"
          dataKey="availability_in_mt_"
          order="asc"
        />   
      </div>

      <Bigchart
        data={data}
        title="Product Availability and Requirements"
        grid
      />

      <div className="featuredItem">
        <div className="widgetsm">
          <Chart
            data={data}
            title="Month wise product"
            grid
            parent="month"
            child="product"
            defaultValue={data[0]}
          />
        </div>

        <div className="widgetsm">
          <Chart
            data={data}
            title="State wise product"
            grid
            parent="state"
            child="product"
            defaultValue={data[0]}
          />
        </div>

        <div className="widgetsm">
          <Chart
            data={data}
            title="Year wise product"
            grid
            parent="year"
            child="product"
            defaultValue={data[0]}
          />
        </div>

      </div>
    </div>
  )
}

export default Featured
