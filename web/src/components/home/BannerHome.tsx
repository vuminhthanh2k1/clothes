import axios from "axios";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { apiUrl } from "../../enviroments";
// const access_token = localStorage.getItem("token");
import HeaderBanner from '../../assets/images/logo_noel3.png'

export default function BannerHome() {

    return (
        <>
                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            <h1>Make Everything Popular...<br /> Christmas Collection</h1>
                            <p>Khám phá bộ sưu tập giáng sinh cùng SIMPLE nhé<br />Xmas is coming... </p>
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