import { Injectable, Logger } from '@nestjs/common';
import { SentMessageInfo } from 'nodemailer';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  private readonly logger = new Logger(AppService.name)

  async sendResetPasswordMail(
    emailData,
  ): Promise<SentMessageInfo> {
    this.logger.log(`Send reset password code to ${emailData.email}`);
    return await this.mailerService.sendMail({
      to: emailData.email,
      subject: `Reset ${emailData.type}`,
      template: 'reset',
      context: {
        ...emailData,
        code: emailData.code.split('')
      },
    });
  }

  async sendResetPasswordLinkMail(
    emailData,
  ): Promise<SentMessageInfo> {
    this.logger.log(`Send reset password link to ${emailData.email}`);
    return await this.mailerService.sendMail({
      to: emailData.email,
      subject: `Reset ${emailData.type}`,
      template: 'resetPasswordLink',
      context: emailData,
    });
  }

  async sendGiftCodeToBuyer(
    emailData,
  ): Promise<SentMessageInfo> {
    this.logger.log(`Send gift code to buyer ${emailData.email}`);
    return await this.mailerService.sendMail({
      to: emailData.email,
      subject: emailData.subject,
      template: 'giftCodeBuyer',
      context: emailData.code,
    });
  }

  async sendGiftCodeToReceiver(
    emailData,
  ): Promise<SentMessageInfo> {
    this.logger.log(`Send gift code to receiver ${emailData.email}`);

    return await this.mailerService.sendMail({
      to: emailData.email,
      subject: emailData.subject,
      template: 'giftCodeReceiver',
      context: {
        ...emailData.code,
        code: emailData
          .code
          .code
          .split('')
      },
    });
  }

  async sendSignUpMail(
    emailData,
  ): Promise<SentMessageInfo> {
    this.logger.log(`Send sign up email to ${emailData.email}`);
    await this.mailerService.sendMail({
      to: emailData.email,
      subject: 'WELCOME TO CONSUMER APP',
      template: 'signUp',
      context: {},
    });
    return { message: 'We sent you an email' }
  }

  async sendRegisterMail(
    emailData,
  ): Promise<SentMessageInfo> {
    this.logger.log(`Send register email to ${emailData.email}`);
    return await this.mailerService.sendMail({
      to: emailData.email,
      subject: emailData.subject,
      template: 'register',
      context: emailData,
    });
  }

  async sendTrialPeriodCancelledMail(
    emailData,
  ): Promise<SentMessageInfo> {
    this.logger.log(`Send trial period cancelled email to ${emailData.email}`);
    return await this.mailerService.sendMail({
      to: emailData.email,
      subject: emailData.subject,
      template: 'trialCancelled',
      context: emailData,
    });
  }
}
