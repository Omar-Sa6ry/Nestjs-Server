import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsLowercase, IsOptional } from 'class-validator'

@InputType()
export class LoginDto {
  @Field()
  @IsEmail()
  @IsLowercase()
  @IsOptional()
  email: string

  @Field()
  @IsLowercase()
  @IsOptional()
  userName: string

  @Field()
  password: string
}
