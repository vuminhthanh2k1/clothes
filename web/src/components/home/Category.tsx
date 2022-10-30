import axios from "axios";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { apiUrl } from "../../enviroments";
// const access_token = localStorage.getItem("token");
import Category1 from '../../assets/images/category-1.jpg'
import Category2 from '../../assets/images/category-2.jpg'
import Category3 from '../../assets/images/category-3.jpg'
export default function Category() {

    return (
        <>
            <div className="categories">
                <div className="small-container">
                    <div className="row flex justify-between">
                        <div className="col-3">
                            <img src={Category1} />
                        </div>
                        <div className="col-3">
                            <img src={Category2} />
                        </div>
                        <div className="col-3">
                            <img src={Category3} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}