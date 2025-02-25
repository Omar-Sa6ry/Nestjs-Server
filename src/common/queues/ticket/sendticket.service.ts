import { Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bullmq'
import { Queue } from 'bullmq'

@Injectable()
export class SendTicketService {
  constructor (@InjectQueue('ticket') private readonly emailQueue: Queue) {}

  async sendEmail (
    to: string,
    subject: string,
    text: string,
    attachment?: Buffer,
  ) {
    const emailData: any = { to, subject, text }

    if (attachment) {
      emailData.attachment = attachment.toString('base64')
    }

    await this.emailQueue.add('send-email', emailData)
    console.log(`Job added to queue to send email to ${to}`)
  }
}
