import { Module } from '@nestjs/common'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { GenerateToken } from '../../common/config/jwt.service'
import { UserModule } from '../users/users.module'
import { User } from '../users/entity/user.entity'
import { RedisModule } from 'src/common/redis/redis.module'
import { UploadModule } from '../../common/upload/upload.module'
import { Image } from 'src/common/upload/entity/image.entity'
import { EmailModule } from 'src/common/queues/email/email.module'
import { SendEmailService } from 'src/common/queues/email/sendemail.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Image]),
    UserModule,
    RedisModule,
    UploadModule,
    EmailModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'huigyufutftydty',
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    SendEmailService,
    GenerateToken,
    JwtService,
  ],
})
export class AuthModule {}
