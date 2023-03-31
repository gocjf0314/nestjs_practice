import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';

import { Inject, Injectable, Scope } from '@nestjs/common';
import emailConfig from 'src/config/emailConfig';
import { ConfigType } from '@nestjs/config';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable({scope: Scope.REQUEST})
export class EmailService {
  private transporter: Mail;

  constructor(@Inject(emailConfig.KEY) private config: ConfigType<typeof emailConfig>,) {
    this.transporter = nodemailer.createTransport({
      service: config.service,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass,
      },
    });
  }

  async sendMemnerJoinEmail(
    emailAddress: string,
    signupVerifyToken: string,
  ): Promise<void> {
    const baseUrl = this.config.baseUrl;

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
