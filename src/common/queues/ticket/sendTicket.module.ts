import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bullmq'
import { TicketProcessor } from './ticket.processing'
import { SendTicketService } from './sendticket.service'

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
      },
    }),
    BullModule.registerQueue({ name: 'ticket' }),
  ],
  providers: [TicketProcessor, SendTicketService],
  exports: [BullModule],
})
export class TicketQueue {}
