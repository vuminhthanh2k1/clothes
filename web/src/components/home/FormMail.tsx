import axios from "axios";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { apiUrl } from "../../enviroments";
// const access_token = localStorage.getItem("token");
export default function FormMail() {

    return (
        <>
            <section className="section wrapper-home-newsletter">
                <div className="container-fluid">
                    <div className="content-newsletter">
                        <h2>Đăng ký</h2>
                        <p>Đăng ký nhận bản tin của Runner Inn để cập nhật những sản phẩm mới, nhận thông tin ưu đãi đặc biệt và thông
                            tin
                            giảm giá khác.</p>
                        <div className="form-newsletter">
                            <form action="" accept-charset="UTF-8" className="">
                                <div className="form-group">
                                    <input type="hidden" id="contact_tags" />
                                    <input type="email" value="" placeholder="Nhập email của bạn" aria-label="Email Address"
                                        className="" />
                                    <button type="submit" className=""><span>Gửi</span></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}