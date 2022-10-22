import axios from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
// import '../assets/css/signin.scss';
import { apiUrl } from '../enviroments';
import { Routes } from '../routes';
export default function ForgotPassWord() {
    let history = useHistory();
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [check, setCheck] = useState<boolean>(true)
    let { addToast } = useToasts();
    let reset = async (form: any) => {
        setCheck(false);
        if (!check) {

            axios.post(`${apiUrl}/Accounts/reset`, { email: form.email})
                .then((result) => {
                    addToast("Send email success", { appearance: 'success', autoDismiss: true });
                    history.push(Routes.Login.path)
                })
                .catch(function (error) {
                    addToast("Send email failed", { appearance: 'error', autoDismiss: true });
                })
        }
    }






    return (
        <>
            <div className="wrap-signup">
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
                        Quên mật khẩu
                    </h1>
                    {
                        check ?
                            <div className="wrap__form">
                                <form method="get">
                                    <div className="wthree-text ">
                                        <label className="anim">
                                            <span className="">Để thực hiện việc reset lại mật khẩu, bạn hãy nhập email đăng ký vào ô dưới</span>
                                        </label>
                                        <div className="clear"></div>
                                    </div>
                                    <Controller
                                        control={control}
                                        name="email"
                                        render={({
                                            field: { onChange, onBlur, value }
                                        }) => (
                                            <input
                                                className={errors.username ? "errorInput text w3lpass" : "text w3lpass"}
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                id="email"
                                                onChange={e => onChange(e.target.value)}
                                                onBlur={onBlur}
                                            />
                                        )}
                                        rules={{ required: true }}
                                    />
                                    <button onClick={handleSubmit(reset)} className="submit-btn">Reset</button>

                                </form>
                            </div> : <div className="wrap__form">
                                <form method="get">
                                    <div className="wthree-text ">
                                        <label className="anim">
                                            <span className="text-center"    >Reset link đã được gửi tới email của bạn</span>
                                        </label>
                                        <div className="clear"></div>
                                    </div>
                                </form>
                            </div>
                    }

                </div>
            </div>
        </>
    )
}