import { Field, InputType  } from '@nestjs/graphql'
import { Expose } from 'class-transformer'
import { User } from 'src/modules/users/entity/user.entity'

@InputType()
export class AuthInput  {
  @Field(() => User)
  @Expose()
  user: User

  @Field()
  @Expose()
  token: string
}