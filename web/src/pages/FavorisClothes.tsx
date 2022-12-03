import {
  Card,
  Col,
  Container,
  Nav,
  Row,
  Table,
} from "@themesberg/react-bootstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import BannerHome from "../components/home/BannerHome";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { apiUrl } from "../enviroments";
import { ProductInterface } from "../models/product.interface";
// import OrderEdit from './OrderEdit';

const access_token = localStorage.getItem("token");
export default () => {
  let history = useHistory();
  const [clothes, setClothes] = useState({
    total: 0,
    data: [],
  });
  const [textSearch, setTextSearch] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState<any>(5);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: any) => state.auth.data);

  useEffect(() => {
    search();
  }, [activePage, limit]);
  const search = () => {
    setLoading(true);
    axios({
      method: "GET",
      url: `${apiUrl}/FavorisClothes`,
      params: {
        access_token: access_token,
        filter: {
          limit: limit,
          skip: limit * (activePage - 1),
          where: {
            accountId: user?.id,
          },
          include: "clothes",
        },
      },
    })
      .then((result) => {
        setLoading(false);
        setClothes(result.data);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div className="mt-7">
      <div className="banner-home">
        <Header title="" />
      </div>
      <Container>
        <Row className="mb-4 mt-7" style={{ marginTop: 20 }}>
          <Col>Sản phẩm yêu thích</Col>
        </Row>
        {clothes.data.length > 0 ? (
          <Row>
            <Card
              border="light"
              className="table-wrapper table-responsive shadow-sm"
            >
              <Card.Body className="pt-0">
                <div className="feedback">
                  <Table
                    hover
                    className="user-table align-items-center styled-table"
                  >
                    <thead>
                      <tr>
                        <th className="border-bottom">#</th>
                        <th className="border-bottom">Sản phẩm</th>
                        <th className="border-bottom">Size</th>
                        <th className="border-bottom">Loại</th>
                        <th className="border-bottom">Hình ảnh</th>
                        <th className="border-bottom">Cài đặt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clothes &&
                        clothes.data.map((clotherItem, index) => {
                          return (
                            <TableItem
                              index={index + 1}
                              clothes={clotherItem}
                              key={index}
                              search={search}
                            />
                          );
                        })}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
              <Card.Footer className="mb-4 border-0 d-lg-flex align-items-center justify-content-between">
                <Nav>
                  <div className="wrapper-paginate">
                    {clothes && (
                      <Pagination
                        activePage={activePage}
                        itemsCountPerPage={limit | 5}
                        totalItemsCount={clothes.total}
                        pageRangeDisplayed={3}
                        onChange={(value) => setActivePage(value)}
                      />
                    )}
                  </div>
                </Nav>
              </Card.Footer>
            </Card>
          </Row>
        ) : (
          <div style={{height:500}} >Chưa có sản phẩm yêu thích!</div>
        )}
      </Container>
      <Footer />
    </div>
  );
};

function TableItem({
  index,
  clothes,
  search,
}: {
  index: number;
  clothes: any;
  search: any;
}) {
  let { addToast } = useToasts();

  let deleteClothes = () => {
    axios({
      method: "DELETE",
      url: `${apiUrl}/FavorisClothes/${clothes.id}`,
      params: {
        access_token: access_token,
      },
    })
      .then(() => {
        search("");
        addToast("Xóa sản phẩm yêu thích thành công!", {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((error) => {
        addToast("Error", { appearance: "error", autoDismiss: true });
      });
  };

  return (
    <>
      <tr>
        <td>
          <div className="text-black font-bold">{index}</div>
        </td>
        <td>
          <div className="text-black font-bold">{clothes?.clothes?.title}</div>
        </td>
        <td>
          <div className="text-black font-bold">{clothes?.clothes?.size}</div>
        </td>
        <td>
          <div className="text-black font-bold">{clothes?.clothes?.type}</div>
        </td>
        <td>
          <img src={clothes?.clothes?.photoURL} />
        </td>
        <td>
          <div style={{ cursor: "pointer" }} onClick={deleteClothes}>
            Xóa
          </div>
        </td>
      </tr>
    </>
  );
}
