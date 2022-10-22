import axios from 'axios';
import {
  BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
  Tooltip
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import DatePicker from "react-multi-date-picker";
import { apiUrl } from '../../enviroment';
import { request } from '../../helper/request.helper';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const access_token = localStorage.getItem("token");
export default () => {
  const [year, setYear] = useState(new Date());
  const [labels, setLabels] = useState([]);
  const [dataAmount, setDataAmount] = useState([]);
  useEffect(() => {
    search()
  }, [year])

  const search = async () => {
    request({
      method: 'GET',
      url: 'Orders/statistic-amount',
      params: {
        year: year.getFullYear()
      }
    }).then(result => {
      let respLabels = [];
      let respData = [];
      result.data.forEach(item => {
        respLabels.push(item.label)
        respData.push(item.amount)
      })
      setLabels(respLabels)
      setDataAmount(respData)
    })
  }

  const data = {
    labels,
    datasets: [{
      label: 'Thống kê đơn hàng theo số lượng',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: dataAmount,
    }]
  };

  return (
    <>
      <div>
        <DatePicker onChange={(value) => setYear(value)} value={year}
          onlyYearPicker
          format='YYYY'
        />
      </div>
      <Bar
        data={data}
      />
    </>
  )
}