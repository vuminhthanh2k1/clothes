import axios from "axios";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { apiUrl } from "../../enviroments";
// const access_token = localStorage.getItem("token");
import Logo1 from '../../assets/images/logo-godrej.png'
import Logo2 from '../../assets/images/logo-oppo.png'
import Logo3 from '../../assets/images/logo-coca-cola.png'
import Logo5 from '../../assets/images/logo-philips.png'
export default function Brands() {

    return (
        <>
            <div className="brands">
                <div className="small-container">
                    <div className="row flex justify-between">
                        <div className="col-5">
                            <img src={Logo1} />
                        </div>
                        <div className="col-5">
                            <img src={Logo2} />
                        </div>
                        <div className="col-5">
                            <img src={Logo3} />
                        </div>
                        <div className="col-5">
                            <img src={Logo1} />
                        </div>
                        <div className="col-5">
                            <img src={Logo5} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}