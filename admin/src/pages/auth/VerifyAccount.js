
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Container, Image, Row } from '@themesberg/react-bootstrap';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ErrorImage from "../../assets/img/illustrations/bs5-illustrations.svg";
import { apiUrl } from "../../enviroment";
import { Routes } from "../../routes";
import NotFound from "../layout/NotFound";



export default (props) => {
  let { confirmationCode } = props.match.params;
  const [checkVerify, setCheckVerify] = useState(false);

  let searchVerifyEmail = async () => {
    axios.get(`${apiUrl}/user/confirm/${confirmationCode}`)
      .then(() => {
        setCheckVerify(true)
      })
      .catch(() => {
        setCheckVerify(false)
      })
  }
  useEffect(() => {
    searchVerifyEmail()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {checkVerify ? <main>
        < section className="vh-100 d-flex align-items-center justify-content-center" >
          <Container>
            <Row className="align-items-center">
              <Col xs={12} lg={5} className="order-2 order-lg-1 text-center text-lg-left">
                <h1 className="text-primary mt-5">
                  Thank you for using our service!
                </h1>

                <Button as={Link} variant="primary" className="animate-hover" to={Routes.Signin.path}>
                  <FontAwesomeIcon icon={faChevronLeft} className="animate-left-3 me-3 ms-2" />
                  Go back to Sign in
                </Button>
              </Col>
              <Col xs={12} lg={7} className="order-1 order-lg-2 text-center d-flex align-items-center justify-content-center">
                <Image src={ErrorImage} className="img-fluid w-75" />
              </Col>
            </Row>
          </Container>
        </section >
      </main >
        : <NotFound />
      }
    </>

  );
};
