import { Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bullmq'
import { Queue } from 'bullmq'

@Injectable()
export class NotificationService {
  constructor (@InjectQueue('send-notification') private notificationQueue: Queue) {}

  async sendPushNotification (fcmToken: string, title: string, body: string) {
    await this.notificationQueue.add('send-notification', {
      fcmToken,
      title,
      body,
    })
    console.log(`Push notification job added to queue: ${title}`)
  }
}
