import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { apiUrl } from '../../enviroments';

export default function GetInTouch() {
    const { control, handleSubmit, formState: { errors } } = useForm();
    let { addToast } = useToasts();
    let contact = async (form: any) => {
        axios.post(`${apiUrl}/Contacts`, form)
            .then(() => {
                addToast("Success", { appearance: 'success', autoDismiss: true });
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    return (
        <>
            <section className="contact-area section-padding-100-0 mt-7">
                <div className="container">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-12 col-lg-5">
                            {/* <!-- Section Heading --> */}
                            <div className="section-heading">
                                <h2>Đăng ký để nhận tin</h2>
                                <p>Gửi tin nhắn cho chúng tôi, chúng tôi sẽ gọi lại sau</p>
                            </div>
                            {/* <!-- Contact Form Area --> */}
                            <div className="contact-form-area mb-100">
                                <form action="#" method="post">
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <Controller
                                                    control={control}
                                                    name="name"
                                                    render={({
                                                        field: { onChange, onBlur, value }
                                                    }) => (
                                                        <input
                                                            type="text" className="form-control"
                                                            id="contact-name"
                                                            placeholder="Tên của bạn"
                                                            onChange={e => onChange(e.target.value)}
                                                            onBlur={onBlur}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <Controller
                                                    control={control}
                                                    name="email"
                                                    render={({
                                                        field: { onChange, onBlur, value }
                                                    }) => (
                                                        <input
                                                            type="email" className="form-control"
                                                            id="contact-email"
                                                            placeholder="Email của bạn"
                                                            onChange={e => onChange(e.target.value)}
                                                            onBlur={onBlur}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <Controller
                                                    control={control}
                                                    name="subject"
                                                    render={({
                                                        field: { onChange, onBlur, value }
                                                    }) => (
                                                        <input
                                                            type="text" className="form-control" id="contact-subject"
                                                            placeholder="Tiêu đề"
                                                            onChange={e => onChange(e.target.value)}
                                                            onBlur={onBlur}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <Controller
                                                    control={control}
                                                    name="message"
                                                    render={({
                                                        field: { onChange, onBlur, value }
                                                    }) => (
                                                        <textarea
                                                            className="form-control" name="message" id="message" cols={30} rows={10}
                                                            placeholder="Lời nhắn..."
                                                            onChange={e => onChange(e.target.value)}
                                                            onBlur={onBlur}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button onClick={handleSubmit(contact)} className=" alazea-btn mt-15">Gửi tin nhắn</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-12 col-lg-6">
                            {/* <!-- Google Maps --> */}
                            <div className="map-area mb-100">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.81545829258!2d105.84031981482019!3d21.00003329413453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac70a2f48a15%3A0xfc5dfbb8602d0eef!2zMjA3IEdp4bqjaSBQaMOzbmcsIMSQ4buTbmcgVMOibSwgxJDhu5FuZyDEkGEsIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1658380585325!5m2!1svi!2s" width="600" height="450" style={{ border: 0 }} loading="lazy"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}