export const EMAIL_FROM = 'zenominhhoang@gmail.com';

export async function sendMail(
  Email: any,
  {
    to,
    from,
    subject,
    text,
    html,
    attachments,
  }: {
    to: string | string[];
    from?: string | string[];
    subject: string | string[];
    text?: string;
    html?: string;
    attachments?: {
      filename: string;
      path: string;
      contentType: string;
    }[];
  },
) {
  return new Promise((resolve, reject) => {
    Email.send(
      {
        to: to,
        from: from || EMAIL_FROM,
        subject: subject,
        text: text,
        html: html,
        attachments: attachments,
      },
      function (err: Error, mail: any) {
        err ? reject(err) : resolve(mail);
      },
    );
  });
}



export async function sendResetPasswordEmail(Email: any, info: any) {
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
  