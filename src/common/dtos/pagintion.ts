import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Expose } from 'class-transformer'

@ObjectType()
export class PaginationInfo {
  @Field(() => Int)
  @Expose()
  totalPages: number

  @Field(() => Int)
  @Expose()
  page: number

  @Field(() => Int)
  @Expose()
  total: number
}
