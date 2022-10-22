import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import AVATAR from "../assets/images/core-img/avatar.jpg"
import Overview from "../components/profile/Overview";
import ResetPass from "../components/profile/ResetPass";
import { useState } from "react";
import { useSelector } from "react-redux";
import uploadFile from "../helper/uploadFile";
import axios from "axios";
import { apiUrl } from "../enviroments";
import { useToasts } from "react-toast-notifications";
import avatarDefault from '../assets/images/avatar-mac-dinh.png'
const access_token = localStorage.getItem("token");
export default function Profile() {
    const [status, setStatus] = useState<string>('Tổng quan');
    const user = useSelector((state: any) => state.auth.data);
    const { addToast } = useToasts();
    const changeAvatar = async (file: any) => {
        try {
            let fileUrl = await uploadFile(file);
            if (fileUrl) {
                axios({
                    method: 'PATCH',
                    url: `${apiUrl}/Accounts/${user.id}`,
                    data: {
                        avatar: fileUrl
                    },
                    params: {
                        access_token: access_token
                    }
                }).then(() => {
                    addToast("Thay đổi ảnh thành công!", { appearance: 'success', autoDismiss: true });
                }).catch(() => {
                    addToast("Failed", { appearance: 'error', autoDismiss: true });
                })
            }
        } catch (error) {

        }
    }


    return (
        <>
            <Header />

            <section className="container my-20">
                <div className="prof flex gap-10">
                    <div className="prof__left w-1/3 flex flex-col items-center">
                        <div className="prof__left--top flex items-center flex-col">
                            <div className="avatar w-32 h-32 rounded-full overflow-hidden">
                                {!user?.avatar ? <img src={avatarDefault} alt="" /> : <img src={user?.avatar} alt="" />}
                            </div>
                            <input type="file" name="file" id="file" className="inputfile" onChange={(e: any) => { changeAvatar(e.target.files[0]) }} />
                            {/* <label htmlFor="file" className="edit-avatar">Thay đổi avatar</label> */}
                            <h1 className="text-2xl mt-4 text-center">{user?.firstName} {user?.lastName}</h1>
                        </div>
                        <div className="prof__left--bottom">
                            <ul className="flex p-0 flex-col items-center">
                                <div className="distance-line"></div>

                                <li className="prof__left--item text-xl text-center" onClick={() => {
                                    setStatus("Tổng quan")
                                }
                                } >
                                    <b>Tổng quan</b>
                                </li>
                                <div className="distance-line"></div>
                                <li className="prof__left--item text-xl text-center" onClick={() => setStatus("Thay đổi mật khẩu")}>
                                    <b>Thay đổi mật khẩu</b>
                                </li>
                                <div className="distance-line"></div>

                            </ul>
                        </div>
                    </div>
                    <div className="prof__right w-2/3">
                        <div>
                            {status == 'Tổng quan' && <Overview />}

                            {status == 'Thay đổi mật khẩu' && <ResetPass />}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}