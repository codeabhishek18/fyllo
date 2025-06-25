import { useState, useMemo, useEffect } from "react";
import "./Bigchart.css";

import {
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  YAxis,
  Legend,
} from "recharts";

function Bigchart({
  title,
  data,
}) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const states = [
    "All",
    "Andaman & Nicobar",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chattishgarh",
    "Dadra & Nagar Haveli",
    "Delhi",
    "Goa",
    "Gujarat",
    "Harayana",
    "Himachal Pradesh",
    "Jammu & Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharastra",
    "Manipur",
    "Megalaya",
    "Mizoram",
    "Nagaland",
    "Orissa",
    "Pondicherry",
    "Punjab",
    "Rajasthan",
    "Tamil Nadu",
    "Tripura",
    "Telangana",
    "Uttar Pradesh",
    "Uttaranchal",
    "West Bengal",
    "Daman & Diu",
    "Lakshadweep",
    "Sikkim",
  ];

  const [stateValue, setStateValue] = useState("All");
  const [productValue, setProductValue] = useState("All");
  // const [monthValue, setMonthValue] = useState("All");
  const [productList, setProductList] = useState(null);

  useEffect(()=>
  {
    const productList = data.reduce((carry, item)=>
    {
      const { product } = item;
      if(!(carry.includes(product)))
        carry.push(product);
      return carry
    },[])
    productList.unshift("All")
    setProductList(productList);
  },[]);

  console.log(productList)

  const filteredData = useMemo(() => 
  {
    const monthlyData = data
      .filter((item) => 
      {
        const matchState = stateValue === "All" || item.state === stateValue;
        const selectedProduct = productValue === 'All' || item.product === productValue;
        // const matchMonth = monthValue === "All" || item.month === monthValue;
        return selectedProduct && matchState;
      }).map((item) => ({
        ...item,
        requirement_in_mt_: parseFloat(item.requirement_in_mt_ || 0),
        availability_in_mt_: parseFloat(item.availability_in_mt_ || 0),
      })).reduce((carry, item)=>
      {
        const { month, requirement_in_mt_, availability_in_mt_ } = item;
        if(!carry[month])
          carry[month] = { month, requirement_in_mt_ : 0, availability_in_mt_:0 }
        carry[month].requirement_in_mt_ += requirement_in_mt_
        carry[month].availability_in_mt_ += availability_in_mt_
        return carry
      },[]);

      const finalData = months.map((m) => monthlyData[m] || { month: m, requirement_in_mt_: 0, availability_in_mt_:0 });
      return finalData
  }, [data, stateValue, productValue]);

  console.log(filteredData)

  return (
    <div className="bigchart">
      <h3 className="bigchartTitle">{title}</h3>

      <div className="bigchartSelect">
        {/* <h5>Month</h5>
        <select value={monthValue} onChange={(e) => setMonthValue(e.target.value)}>
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select> */}

        <h5>Product</h5>
        {productList && 
        <select value={productValue} onChange={(e) => setProductValue(e.target.value)}>
          {productList.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>}


        <h5>State</h5>
        <select value={stateValue} onChange={(e) => setStateValue(e.target.value)}>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {filteredData.length === 0 ? (
        <h6 className="errordata">No data available to show</h6>
      ) : (
        <ResponsiveContainer width="100%" height="100%" aspect={2 / 1}>
          <BarChart
            width={700}
            height={300}
            data={filteredData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="months" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="requirement_in_mt_" fill="#60AC4A" name="Requirement" />
            <Bar dataKey="availability_in_mt_" fill="#FF6347" name="Availability" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default Bigchart;
