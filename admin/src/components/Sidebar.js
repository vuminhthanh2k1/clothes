
import { faAddressBook, faMoneyBillAlt, faUser } from "@fortawesome/free-regular-svg-icons";
import { faBlog, faChartPie, faFeatherAlt, faSatellite, faShoppingBag, faSignOutAlt, faTags, faTimes, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Button, Image, Nav, Navbar } from '@themesberg/react-bootstrap';
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import SimpleBar from 'simplebar-react';
import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";
import ReactHero from "../assets/img/technologies/react-hero-logo.svg";
import { Routes } from "../routes";


export default (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";
  const role = localStorage.getItem("role");
  const onCollapse = () => setShow(!show);


  const NavItem = (props) => {
    const { title, link, external, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary" } = props;
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
            {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Brand className="me-lg-5" as={Link} to={Routes.DashboardOverview.path}>
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  <Image src={ProfilePicture} className="card-img-top rounded-circle border-white" />
                </div>
                <div className="d-block">
                  <h6>Xin chào, Jane</h6>
                  <Button as={Link} variant="secondary" size="xs" to={Routes.Signin.path} className="text-dark">
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Đăng xuất
                  </Button>
                </div>
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">

              <NavItem title="Tổng quan" link={Routes.DashboardOverview.path} icon={faChartPie} />
              <Dropdown.Divider className="my-3 border-indigo" />
              {role == 'SUPERADMIN' && <NavItem title="Người dùng" icon={faUser} link={Routes.Account.path} />}
              <NavItem title="Đơn hàng" icon={faMoneyBillAlt} link={Routes.Order.path} />
              <Dropdown.Divider className="my-3 border-indigo" />
              <NavItem title="Danh mục sản phẩm" icon={faSatellite} link={Routes.CategoryProduct.path} />
              <NavItem title="Sản phẩm" icon={faShoppingBag} link={Routes.Product.path} />
              <Dropdown.Divider className="my-3 border-indigo" />
              <NavItem title="Thẻ tag" icon={faTags} link={Routes.Tag.path} />
              <NavItem title="Bài viết" icon={faBlog} link={Routes.Blog.path} />
              <Dropdown.Divider className="my-3 border-indigo" />
              <NavItem title="Liên hệ" icon={faAddressBook} link={Routes.Contact.path} />
              <NavItem title="Phản hồi" icon={faFeatherAlt} link={Routes.Feedback.path} />

            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
