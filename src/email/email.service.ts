import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';

import { Injectable, Scope } from '@nestjs/common';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable({scope: Scope.REQUEST})
export class EmailService {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'gocjf12345@gmail.com',
        pass: 'navbqecyrdsqkixm',
      },
    });
  }

  async sendMemnerJoinEmail(
    emailAddress: string,
    signupVerifyToken: string,
  ): Promise<void> {
    const baseUrl = 'http://localhost:3000';

    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;

    const emailOptions: EmailOptions = {
      to: emailAddress,
      subject: '가입 인증 이메일', // 메일 제목
      html: `
      가입확인 버튼을 누르시면 가입인증이 완료됩니다.<br/>
      <from action="${url}" method="POST">
      <button>가입확인</button>
      </form>
      `, // 메일 본문
    };

    return await this.transporter.sendMail(emailOptions);
  }
}
