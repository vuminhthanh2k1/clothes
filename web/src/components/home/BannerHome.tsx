import axios from "axios";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { apiUrl } from "../../enviroments";
// const access_token = localStorage.getItem("token");
import HeaderBanner from '../../assets/images/image1.png'

export default function BannerHome() {

    return (
        <>
                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            <h1>Give Your Workout<br /> A New Style!</h1>
                            <p>Success ins't always about greatness. It's about
                                consistency. Consistent <br />hard work gains success. Greatness
                                will come. </p>
                            <a href="#" className="btn">Explore Now →</a>
                        </div>
                        <div className="col-2">
                            <img src={HeaderBanner} />
                        </div>
                    </div>
                </div>

        </>
    )
}