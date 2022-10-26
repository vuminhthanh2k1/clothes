import axios from "axios";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { apiUrl } from "../../enviroments";
// const access_token = localStorage.getItem("token");
import Product1 from '../../assets/images/product-1.jpg'
import Product2 from '../../assets/images/product-4.jpg'

export default function LastestProduct() {

    return (
        <>
            <div className="small-container">
                <h2 className="title">Latest Products</h2>
                <div className="row">
                    <div className="col-4">
                        <img src={Product1}/>
                        <h4 className="name-product">Red Printed T-Shirt</h4>
                        <div className="rating">
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star-o" />
                        </div>
                        <p>$50.00</p>
                    </div>
                    <div className="col-4">
                        <img src={Product1}/>
                        <h4 className="name-product">Red Printed T-Shirt</h4>
                        <div className="rating">
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star-half-o" />
                            <i className="fa fa-star-o" />
                        </div>
                        <p>$50.00</p>
                    </div>
                    <div className="col-4">
                        <img src={Product1}/>
                        <h4 className="name-product">Red Printed T-Shirt</h4>
                        <div className="rating">
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star-half-o" />
                        </div>
                        <p>$50.00</p>
                    </div>
                    <div className="col-4">
                        <img src={Product1}/>
                        <h4 className="name-product">Red Printed T-Shirt</h4>
                        <div className="rating">
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star-o" />
                        </div>
                        <p>$50.00</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <img src={Product2}/>
                        <h4 className="name-product">Red Printed T-Shirt</h4>
                        <div className="rating">
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star-o" />
                        </div>
                        <p>$50.00</p>
                    </div>
                    <div className="col-4">
                        <img src={Product2} />
                        <h4 className="name-product">Red Printed T-Shirt</h4>
                        <div className="rating">
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star-half-o" />
                            <i className="fa fa-star-o" />
                        </div>
                        <p>$50.00</p>
                    </div>
                    <div className="col-4">
                        <img src={Product2} />
                        <h4 className="name-product">Red Printed T-Shirt</h4>
                        <div className="rating">
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star-half-o" />
                        </div>
                        <p>$50.00</p>
                    </div>
                    <div className="col-4">
                        <img src={Product2} />
                        <h4 className="name-product">Red Printed T-Shirt</h4>
                        <div className="rating">
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star-o" />
                        </div>
                        <p>$50.00</p>
                    </div>
                </div>
            </div>

        </>
    )
}