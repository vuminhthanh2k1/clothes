"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetPasswordEmail = exports.sendMail = exports.EMAIL_FROM = void 0;
exports.EMAIL_FROM = 'zenominhhoang@gmail.com';
async function sendMail(Email, { to, from, subject, text, html, attachments, }) {
    return new Promise((resolve, reject) => {
        Email.send({
            to: to,
            from: from || exports.EMAIL_FROM,
            subject: subject,
            text: text,
            html: html,
            attachments: attachments,
        }, function (err, mail) {
            err ? reject(err) : resolve(mail);
        });
    });
}
exports.sendMail = sendMail;
async function sendResetPasswordEmail(Email, info) {
    let url = 'http://localhost:3001';
    const link = `${url}/change-password?token=${info.accessToken.id}`;
    const html = `<p><b>Xin chào, ${info.email}</b></p>
    <br/>
      <p>Đây là email reset được gửi từ hệ thống shoes</p>
    <a href=${link}>Ấn vào đường link để thay đổi reset mật khẩu </a>
    </p>`;
    return sendMail(Email, {
        to: info.email,
        subject: 'Reset Password',
        html: html,
    }).catch((error) => {
        console.log(error);
    });
}
exports.sendResetPasswordEmail = sendResetPasswordEmail;
//# sourceMappingURL=sendEmail.js.map