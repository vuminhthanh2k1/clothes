import axios from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
// import '../assets/css/signin.scss';
import { apiUrl } from '../enviroments';
import { Routes } from '../routes';
export default function NewPassword() {
    let history = useHistory();
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [check, setCheck] = useState<boolean>(true)
    let { addToast } = useToasts();
    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token');
    let reset = async (form: any) => {
        setCheck(false);
        if (!check) {
            const body = {
                newPassword: form.password
            }
            axios({method: "post",url: `${apiUrl}/Accounts/reset-password?access_token=${token}`, data: body,headers: { "Content-Type": "multipart/form-data" }})
                .then((result) => {
                    addToast("Change password success", { appearance: 'success', autoDismiss: true });
                    history.push(Routes.Login.path)
                })
                .catch(function (error) {
                    addToast("Change password failed", { appearance: 'error', autoDismiss: true });
                })
        }
    }
    return (
        <>
            <div className="wrap-signup">
                <div className="form__signup">
                    <div className="wrap__form">
                        <form method="get">
                            <label htmlFor="password"><b>Mật khẩu mới</b></label>
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
                            <label htmlFor="repeatpassword"><b>Nhập lại mật khẩu</b></label>
                            <Controller
                                control={control}
                                name="confirmPassword"
                                render={({
                                    field: { onChange, onBlur, value }
                                }) => (
                                    <input
                                        className={errors.username ? "errorInput text w3lpass" : "text w3lpass"}
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        id="confirmPassword"
                                        onChange={e => onChange(e.target.value)}
                                        onBlur={onBlur}
                                    />
                                )}
                                rules={{ required: true }}
                            />
                            <button onClick={handleSubmit(reset)} className="submit-btn">Reset</button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}