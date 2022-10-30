import axios from "axios";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { apiUrl } from "../../enviroments";
// const access_token = localStorage.getItem("token");
import User1 from '../../assets/images/user-1.png'
import User2 from '../../assets/images/user-2.png'
import User3 from '../../assets/images/user-3.png'
export default function Testimonial() {

    return (
        <>
            <div className="testimonial">
                <div className="small-container">
                    <div className="row flex justify-between">
                        <div className="col-3">
                            <i className="fa fa-qoute-lef" />
                            <p>Abilities or he perfectly pretended so strangers be exquisite. Oh to another chamber pleased
                                imagine do in. Went me rank at last loud shot an draw. Excellent so to no sincerity smallness.
                                Removal request delight if on he we</p>
                            <div className="rating">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star-o" />
                            </div>
                            <img src={User1} />
                            <h3>Đạt 1 Phích</h3>
                        </div>
                        <div className="col-3">
                            <i className="fa fa-qoute-lef" />
                            <p>Abilities or he perfectly pretended so strangers be exquisite. Oh to another chamber pleased
                                imagine do in. Went me rank at last loud shot an draw. Excellent so to no sincerity smallness.
                                Removal request delight if on he we</p>
                            <div className="rating">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star-o" />
                            </div>
                            <img src={User2} />
                            <h3>An Nguyen</h3>
                        </div>
                        <div className="col-3">
                            <i className="fa fa-qoute-lef" />
                            <p>Abilities or he perfectly pretended so strangers be exquisite. Oh to another chamber pleased
                                imagine do in. Went me rank at last loud shot an draw. Excellent so to no sincerity smallness.
                                Removal request delight if on he we</p>
                            <div className="rating">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star-o" />
                            </div>
                            <img src={User3} />
                            <h3>Quang Hoang</h3>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}