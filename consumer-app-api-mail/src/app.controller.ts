import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { SentMessageInfo } from 'nodemailer';
import { MessagePattern } from '@nestjs/microservices';
import { CreateMailsPayloadDto } from './dto/mail.dto';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @MessagePattern({ cmd: 'send-reset-mail' })
  @UsePipes(new ValidationPipe())
  async sendResetPasswordMail(
    payload
  ): Promise<SentMessageInfo> {
    return this.appService.sendResetPasswordMail(payload.body);
  }

  @MessagePattern({ cmd: 'send-reset-link-mail' })
  @UsePipes(new ValidationPipe())
  async sendResetPasswordLinkMail(
    payload
  ): Promise<SentMessageInfo> {
    return this.appService.sendResetPasswordLinkMail(payload.body);
  }

  @MessagePattern({ cmd: 'send-gift-code-email-buyer' })
  @UsePipes(new ValidationPipe())
  async sendGiftCodeToBuyer(
    payload
  ): Promise<SentMessageInfo> {
    return this.appService.sendGiftCodeToBuyer(payload.body);
  }

  @MessagePattern({ cmd: 'send-gift-code-email-receiver' })
  @UsePipes(new ValidationPipe())
  async sendGiftCodeToReceiver(
    payload
  ): Promise<SentMessageInfo> {
    return this.appService.sendGiftCodeToReceiver(payload.body);
  }

  @MessagePattern({ cmd: 'send-sign-up-mail' })
  @UsePipes(new ValidationPipe())
  async sendSignUpMail(
    payload: CreateMailsPayloadDto
  ): Promise<SentMessageInfo> {
    return this.appService.sendSignUpMail(payload.body);
  }

  @MessagePattern({ cmd: 'send-register-mail' })
  @UsePipes(new ValidationPipe())
  async sendRegisterMail(
    payload
  ): Promise<SentMessageInfo> {
    return this.appService.sendRegisterMail(payload.body);
  }

  @MessagePattern({ cmd: 'send-trial-cancelled-mail' })
  @UsePipes(new ValidationPipe())
  async sendTrialPeriodCancelledMail(
    payload
  ): Promise<SentMessageInfo> {
    return this.appService.sendTrialPeriodCancelledMail(payload.body);
  }
}
