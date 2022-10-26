import axios from "axios";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { apiUrl } from "../../enviroments";
// const access_token = localStorage.getItem("token");
import Offer1 from '../../assets/images/exclusive.png'
export default function Offer() {

    return (
        <>
            <div className="offer">
                <div className="small-container">
                    <div className="row">
                        <div className="col-2"><img src={Offer1} className="offer-img" /> </div>
                        <div className="col-2">
                            <p>Exclusive Availabble on RedStore</p>
                            <h1>Smart Band 4</h1>
                            <small>
                                The Mi Smart Band 4 features a 39.9% larger (than Mi Band 4) AMOLED color full-touch display
                                with
                                adjustable brightness, so everything is clear as can be</small>
                            <a href="#" className="btn">Buy Now →</a>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}