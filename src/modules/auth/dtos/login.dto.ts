import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsLowercase } from 'class-validator'

@InputType()
export class LoginDto {
  @Field()
  @IsEmail()
  @IsLowercase()
  email: string

  @Field()
  @IsLowercase()
  userName: string

  @Field()
  password: string
}
