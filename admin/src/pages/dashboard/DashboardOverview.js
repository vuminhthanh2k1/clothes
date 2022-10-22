import { Row } from '@themesberg/react-bootstrap';
import React from "react";
import DashboardOrderByAmount from './DashboardOrderByAmount';
import DashboardOrderByRevenue from './DashboardOrderByRevenue';


export default () => {
  return (
    <>
      <Row className="justify-content-md-center">
       

        <DashboardOrderByAmount />

        <DashboardOrderByRevenue />

       
      </Row>

      
    </>
  );
};
