import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entity/user.entity'
import { UserService } from './users.service'
import { UserResolver } from './users.resolver'
import { RedisModule } from 'src/common/redis/redis.module'
import { UploadService } from '../../common/upload/upload.service'
import { Image } from 'src/common/upload/entity/image.entity'
import { EmailModule } from 'src/common/queues/email/email.module'

@Module({
  imports: [TypeOrmModule.forFeature([User,Image]), EmailModule, RedisModule],
  providers: [UserService, UserResolver, UploadService],
  exports: [UserService],
})
export class UserModule {}
