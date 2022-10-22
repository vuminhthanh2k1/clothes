import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import img from '../../assets/images/bg-img/40.png'
import { apiUrl } from '../../enviroments';

const access_token = localStorage.getItem("token")
export default function ResetPass() {
    const { control, handleSubmit, formState: { errors } } = useForm();
    let { addToast } = useToasts();
    const changePassword = (form: any) => {
        if (form.newPassword !== form.repeatPassword) {
            addToast("Mật khẩu bạn nhập lại sai!", { appearance: 'warning', autoDismiss: true });
        } else {
            axios({
                method: 'POST',
                url: `${apiUrl}/Accounts/change-password`,
                data: {
                    oldPassword: form.oldPassword,
                    newPassword: form.newPassword
                },
                params: {
                    access_token
                }
            }).then(() => {
                addToast("Thay đổi mật khẩu thành công!", { appearance: 'success', autoDismiss: true });
            })
        }
    }
    return (
        <>

            <div>
                <form className='flex flex-col w-full gap-y-2'>
                    <label className='w-1/2 mb-20'>
                        Nhập mật khẩu cũ:
                        <Controller
                            control={control}
                            name="oldPassword"
                            render={({
                                field: { onChange, onBlur, value }
                            }) => (
                                <input
                                    className={errors.username ? "errorInput item-info" : "item-info"}
                                    type="password"
                                    onChange={e => onChange(e.target.value)}
                                    onBlur={onBlur}
                                />
                            )}
                            rules={{ required: true }}
                        />
                    </label>
                    <label className='w-1/2 mb-20'>
                        Nhập mật khẩu mới:
                        <Controller
                            control={control}
                            name="newPassword"
                            render={({
                                field: { onChange, onBlur, value }
                            }) => (
                                <input
                                    className={errors.username ? "errorInput item-info" : "item-info"}
                                    type="password"
                                    onChange={e => onChange(e.target.value)}
                                    onBlur={onBlur}
                                />
                            )}
                            rules={{ required: true }}
                        />
                    </label>
                    <label className='w-1/2 mb-20'>
                        Nhập lại mật khẩu mới:
                        <Controller
                            control={control}
                            name="repeatPassword"
                            render={({
                                field: { onChange, onBlur, value }
                            }) => (
                                <input
                                    className={errors.username ? "errorInput item-info" : "item-info"}
                                    type="password"
                                    onChange={e => onChange(e.target.value)}
                                    onBlur={onBlur}
                                />
                            )}
                            rules={{ required: true }}
                        />
                    </label>
                </form>
                <div>
                    <div className='update-info mt-16' onClick={handleSubmit(changePassword)} >
                        Update
                    </div>
                </div>
            </div>
        </>
    )

}