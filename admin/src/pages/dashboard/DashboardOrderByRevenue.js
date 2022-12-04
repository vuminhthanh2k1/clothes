import { Card, Table } from "@themesberg/react-bootstrap";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import { request } from "../../helper/request.helper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default () => {
  const [year, setYear] = useState(new Date());
  const [dataAmount, setDataAmount] = useState([]);
  const search = async () => {
    request({
      method: "GET",
      url: "Carts/statistic-revenue",
      params: {
        year: year.getFullYear(),
      },
    }).then((result) => {
      setDataAmount(result.data);
    });
  };
  useEffect(() => {
    search();
  }, [year]);
  return (
    <>
      <div>
        <DatePicker
          onChange={(value) => setYear(value)}
          value={year}
          onlyYearPicker
          format="YYYY"
        />
      </div>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">#</th>
                <th className="border-bottom">Tháng</th>
                <th className="border-bottom">Giá vốn</th>
                <th className="border-bottom">Doanh thu</th>
                <th className="border-bottom">Lợi nhuận</th>
              </tr>
            </thead>
            <tbody>
              {dataAmount &&
                dataAmount.map((dataItem, index) => {
                  return (
                    <TableItem
                      index={index + 1}
                      dataItem={dataItem}
                      key={index}
                    />
                  );
                })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <div style={{ height: 30 }}></div>
    </>
  );
};

function TableItem({ index, dataItem }) {
  return (
    <tr>
      <td>
        <Card.Link href="#" className="text-primary fw-bold">
          {index}
        </Card.Link>
      </td>
      <td>{dataItem?.label}</td>
      <td>{dataItem?.revenue?.totalInputPrice}</td>
      <td>{dataItem?.revenue?.totalPrice}</td>
      <td>{dataItem?.revenue?.profit}</td>
    </tr>
  );
}
