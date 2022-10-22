import axios from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import img from '../../assets/images/bg-img/40.png'
import { apiUrl } from '../../enviroments';

const access_token = localStorage.getItem("token");
export default function Overview() {
    let history = useHistory();
    const user = useSelector((state: any) => state.auth.data);
    const { control, handleSubmit, formState: { errors } } = useForm();
    const { addToast } = useToasts();
    const [city, setCity] = useState<any[]>([]);
    const [district, setDistrict] = useState<any[]>([]);
    const [citySelect, setCitySelect] = useState<any>();
    const [districtSelect, setDistrictSelect] = useState<any>();
    const [profile,setProfile] = useState<any>(null as any);

    useEffect(() => {
        searchLocation() // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    let searchLocation = async () => {
        if (user) {
            let responsive = await axios.get('https://provinces.open-api.vn/api/?depth=2');
            if (responsive.status === 200) {
                let cityDistricts = responsive.data.filter((item: any) => item.code == user.city)[0];
                setCity(responsive.data);
                setCitySelect(user.city);
                setDistrict(cityDistricts?.districts);
                setDistrictSelect(user.district)
            }
        }
    }
    let handleSelectCity = (e: any) => {
        setCitySelect(e.target.value);
        let cityDistricts = city.filter(item => item.code == e.target.value)?.[0];
        setDistrict(cityDistricts.districts);
        setDistrictSelect(cityDistricts.districts?.[0]?.code);

    }
    let handleSelectDistrict = (e: any) => {
        setDistrictSelect(e.target.value)
    }
    const changeProfile = (form: any) => {
        axios({
            method: 'PATCH',
            url: `${apiUrl}/Accounts/${user.id}`,
            data: {
                ...form,
                city: citySelect,
                district: districtSelect
            },
            params: {
                access_token: access_token
            }
        }).then(() => {
            addToast("Thay đổi thông tin thành công!", { appearance: 'success', autoDismiss: true });
        }).catch(() => {
            addToast("Failed", { appearance: 'error', autoDismiss: true });
        })
    }


 
    return (
        <>
            <div className='overview'>
                <form className='flex row'>
                    <div className='item-input mb-4'>
                        
                        <label htmlFor="firstName"><b>Tên:</b></label>
                        <Controller
                            control={control}
                            name="lastName"
                            render={({
                                field: { onChange, onBlur, value }
                            }) =>  (
                                <input
                                    className={errors.lastName ? "errorInput item-info " : "item-info"}
                                    type="text"
                                    onChange={e => onChange(e.target.value)}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                            rules={{ required: true }}
                            defaultValue={user?.lastName}
                        />
                    </div>
                    <div className='item-input mb-4'>
                    <label htmlFor="lastName"><b>Họ:</b></label>

                        <Controller
                            control={control}
                            name="firstName"
                            render={({
                                field: { onChange, onBlur, value }
                            }) => (
                                <input
                                    className={errors.firstName ? "errorInput item-info " : "item-info"}
                                    type="text"
                                    onChange={e => onChange(e.target.value)}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}

                            rules={{ required: true }}
                            defaultValue={user?.firstName}
                        />
                    </div>
                    <div className='item-input mb-4'>
                        <label htmlFor="email"><b>Email:</b></label>
                        <Controller
                            control={control}
                            name="email"
                            render={({
                                field: { onChange, onBlur, value }
                            }) => (
                                <input
                                    className={errors.email ? "errorInput item-info " : "item-info"}
                                    type="text"
                                    onChange={e => onChange(e.target.value)}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                            rules={{ required: true }}
                            defaultValue={user?.email}
                        />
                    </div>
                    <div className='item-input mb-4'>
                        <label htmlFor="phoneNumber"><b>Số điện thoại:</b></label>
                        <Controller
                            control={control}
                            name="phoneNumber"
                            render={({
                                field: { onChange, onBlur, value }
                            }) => (
                                <input
                                    className={errors.phoneNumber ? "errorInput item-info " : "item-info"}
                                    type="text"
                                    onChange={e => onChange(e.target.value)}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                            rules={{ required: true }}
                            defaultValue={user?.phoneNumber}
                        />
                    </div>
                    <div className='item-input' style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <label htmlFor="username"><b>Tỉnh/Thành phố:</b></label>
                        <select
                            onChange={e => handleSelectCity(e)}
                            value={citySelect}
                            className="form-control"
                        >
                            {city.map((item, index) => {
                                return (
                                    <option key={index} value={item.code} >{item.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div  className='item-input' style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <label htmlFor="username"><b>Huyện:</b></label>
                        <select
                            onChange={e => handleSelectDistrict(e)}
                            value={districtSelect}
                            className="form-control"
                        >
                            {district?.map((item, index) => {
                                return (
                                    <option key={index} value={item.code} >{item.name}</option>
                                )
                            })}
                        </select>
                    </div>
                </form>
                <div>
                    <button className='update-info mt-16' onClick={handleSubmit(changeProfile)}>
                        Update
                    </button>
                </div>
            </div>
        </>
    )

}