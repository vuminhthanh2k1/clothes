import axios from "axios";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { apiUrl } from "../../enviroments";
// const access_token = localStorage.getItem("token");
import Offer1 from '../../assets/images/ao_footer.png'
export default function Offer() {

    return (
        <>
            <div className="offer">
                <div className="small-container">
                    <div className="row">
                        <div className="col-2"><img src={Offer1} className="offer-img" /> </div>
                        <div className="col-2">
                            <p>Christmas collection availabble on SIMPLE</p>
                            <h1>Xmas Green Jacket</h1>
                            <small>
                                The Xmas green jacket is best seller item in christmas collection 2022
                            </small>
                            <a href="#" className="btn">Buy Now →</a>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}