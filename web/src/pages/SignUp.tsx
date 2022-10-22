import axios from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
// import '../assets/css/signin.scss';
import { apiUrl } from '../enviroments';
import { Routes } from '../routes';
export default function Signup() {
    let history = useHistory();
    const { control, handleSubmit, formState: { errors } } = useForm();
    useEffect(() => {
        searchLocation()
    }, [])
    const [check, setCheck] = useState<boolean>(false)
    let { addToast } = useToasts();
    let signup = async (form: any) => {
        if (!check) {
            addToast("Bạn cần đồng ý với điều khoản của chúng tôi", { appearance: 'warning', autoDismiss: true });
        } else {
            if (form.password !== form.confirmPassword) {
                addToast("Mật khẩu nhập lại chưa đúng", { appearance: 'warning', autoDismiss: true });
            } else {
                let { confirmPassword, ...other } = form;
                axios.post(`${apiUrl}/Accounts`, { city: Number(citySelect), district: Number(districtSelect), ...other })
                    .then((result) => {
                        addToast("Signup success", { appearance: 'success', autoDismiss: true });
                        history.push(Routes.Login.path)
                    })
                    .catch(function (error) {
                        addToast("Signup failed", { appearance: 'error', autoDismiss: true });
                    })
            }
        }

    }
    const [city, setCity] = useState<any[]>([]);
    const [district, setDistrict] = useState<any[]>([]);
    const [citySelect, setCitySelect] = useState<any>();
    const [districtSelect, setDistrictSelect] = useState<any>();

    let searchLocation = async () => {
        let responsive = await axios.get('https://provinces.open-api.vn/api/?depth=2');
        if (responsive.status === 200) {
            setCity(responsive.data);
            setCitySelect(responsive.data[0].code)
            setDistrict(responsive.data[0].districts);
            setDistrictSelect(responsive.data[0]?.districts?.[0]?.code)
        }
    }
    let searchDistrict = async (code: any) => {
        let cityDistricts = city.filter(item => item.code === code)?.[0];
        setDistrict(cityDistricts.districts);
        setDistrictSelect(cityDistricts.districts?.[0]?.code)
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
                        Đăng ký
                    </h1>
                    <div className="wrap__form">
                        <form method="get">
                            <label htmlFor="username"><b>Tên</b></label>
                            <Controller
                                control={control}
                                name="firstName"
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
                            <label htmlFor="username"><b>Họ</b></label>
                            <Controller
                                control={control}
                                name="lastName"
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
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }} >
                                <label htmlFor="username"><b>Tỉnh/Thành phố:</b></label>
                                <select
                                    onChange={e => {
                                        setCitySelect(e.target.value)
                                        searchDistrict(e.target.value)
                                    }}
                                    value={citySelect}
                                >
                                    {city.map((item, index) => {
                                        return (
                                            <option key={index} value={item.code} >{item.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }} >
                                <label htmlFor="username"><b>Huyện:</b></label>
                                <select
                                    onChange={e => {
                                        setDistrictSelect(e.target.value)
                                    }}
                                    value={districtSelect}
                                >
                                    {district?.map((item, index) => {
                                        return (
                                            <option key={index} value={item.code} >{item.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <label htmlFor="username"><b>Số điện thoại:</b></label>
                            <Controller
                                control={control}
                                name="phoneNumber"
                                render={({
                                    field: { onChange, onBlur, value }
                                }) => (
                                    <input
                                        className={errors.username ? "errorInput text w3lpass" : "text w3lpass"}
                                        type="text"
                                        name="phoneNumber"
                                        placeholder='Phone Number'
                                        id="phoneNumber"
                                        onChange={e => onChange(e.target.value)}
                                        onBlur={onBlur}
                                    />
                                )}
                                rules={{ required: true }}
                            />
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
                            <label htmlFor="email"><b>Email</b></label>
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
                            <div className="flex justify-between mt-2">
                                <div className="wthree-text ">
                                    <label className="anim">
                                        <input type="checkbox" className="checkbox mr-2" onChange={() => setCheck(!check)} />
                                        <span className="">Tôi đồng ý với các điều khoản & điều kiện</span>
                                    </label>
                                    <div className="clear"></div>
                                </div>
                                <a className='login-btn flex items-center' href='/login'>
                                    <span>Đăng nhập</span>
                                </a>
                            </div>
                            <button onClick={handleSubmit(signup)} className="submit-btn">Đăng ký</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}