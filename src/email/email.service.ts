import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';
import emailConfig from 'src/config/emailConfig';

import { Injectable } from '@nestjs/common';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: emailConfig().service,
      auth: {
        user: emailConfig().auth.user,
        pass: emailConfig().auth.pass,
      },
    });
  }

  async sendMemberJoinVerification(
    emailAddress: string,
    signupVerifyToken: string,
  ) {
    const baseUrl = emailConfig().baseUrl;

    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;

    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 50px auto;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
                text-align: center;
              }
              .title {
                font-size: 24px;
                margin-bottom: 20px;
                color: #333;
              }
              .button {
                background-color: #007bff;
                color: #fff;
                border: none;
                padding: 15px 30px;
                font-size: 16px;
                border-radius: 5px;
                cursor: pointer;
              }
              .button:hover {
                background-color: #0056b3;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="title">가입 인증</div>
              <p>가입확인 버튼을 누르시면 가입 인증이 완료됩니다.</p>
              <form action="${url}" method="POST">
                <button class="button">가입확인</button>
              </form>
            </div>
          </body>
          </html>
        `,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
