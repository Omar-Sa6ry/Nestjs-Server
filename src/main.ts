import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js'
import { GeneralResponseInterceptor } from './common/interceptor/generalResponse.interceptor'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new GeneralResponseInterceptor())
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 5 }))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  await app.listen(process.env.PORT)
}

bootstrap()
