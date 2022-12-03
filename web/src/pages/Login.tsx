import { Controller, useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';

import axios from "axios";
import { useToasts } from 'react-toast-notifications';
// import '../assets/css/signin.scss';
import { apiUrl } from '../enviroments';
import { Routes } from '../routes';

export default function Login() {
    let history = useHistory();
    const { control, handleSubmit, formState: { errors } } = useForm();
    let { addToast } = useToasts();
    let signin = async (form: any) => {
        axios.post(`${apiUrl}/Accounts/login`, form)
            .then((result) => {
                localStorage.setItem("token", result.data.id);
                localStorage.setItem("userId", result.data.userId);
                addToast("Login success", { appearance: 'success', autoDismiss: true });
                history.push(Routes.Dashboard.path)
            })
            .catch(function (error) {
                addToast("Login failed", { appearance: 'error', autoDismiss: true });
            })
    }
    return (
        <>
            <div className="wrap-signup login">
                <div className="form__signup">
                    <a href="/">
                        <span className="flex items-center back-home">
                            <svg style={{ width: 20, height: 20 }} viewBox="0 0 24 24">
                                <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                            </svg>
                            Quay về
                        </span>
                    </a>
                    <h1 className="text-center font-semibold mb-3">
                        Đăng nhập
                    </h1>
                    <div className="wrap__form">
                        <form method="get">
                            <label htmlFor="username"><b>Tên đăng nhập</b></label>
                            <Controller
                                control={control}
                                name="username"
                                render={({
                                    field: { onChange, onBlur, value }
                                }) => (
                                    <input
                                        className={errors.username ? "errorInput text w3lpass" : "text w3lpass"}
                                        type="text"
                                        name="username"
                                        placeholder='username'
                                        id="username"
                                        onChange={e => onChange(e.target.value)}
                                        onBlur={onBlur}
                                    />
                                )}
                                rules={{ required: true }}
                            />

                            <label htmlFor="password"><b>Mật khẩu</b></label>
                            <Controller
                                control={control}
                                name="password"
                                render={({
                                    field: { onChange, onBlur, value }
                                }) => (
                                    <input
                                        className={errors.username ? "errorInput text w3lpass" : "text w3lpass"}
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        id="password"
                                        onChange={e => onChange(e.target.value)}
                                        onBlur={onBlur}
                                    />
                                )}
                                rules={{ required: true }}
                            />
                            <div className='wrap-sm-btn flex justify-end'>
                                <button className='signup-btn' onClick={() => history.push(Routes.Signup.path)}>
                                    <span>Đăng ký tài khoản</span>
                                </button>
                                <div className='border-r mx-2'></div>

                                <button className='forgot-pass' onClick={() => history.push(Routes.ForgotPassword.path)}>
                                    <span>Quên mật khẩu?</span>
                                </button>
                            </div>

                            <button className="submit-btn"
                                data-bs-toggle="modal"
                                type="submit"
                                onClick={handleSubmit(signin)}
                                id="submit">
                                Đăng nhập
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}