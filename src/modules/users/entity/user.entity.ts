import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Role, UserStatus } from 'src/common/constant/enum.constant'
import { Exclude } from 'class-transformer'
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
@ObjectType()
@Index('idx_phone', ['phone'])
@Index('idx_userName', ['userName'])
@Index('idx_email', ['email'])
@Index('idx_avatar', ['avatar'])
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number

  @Column({ nullable: true, unique: true })
  @Field(() => String)
  userName: string

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  avatar: string

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  bio: string

  @Column({ unique: true })
  @Field(() => String)
  phone: string

  @Column({ nullable: true, unique: true })
  @Field(() => String)
  email: string

  @Column()
  @Exclude()
  password: string

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  @Exclude()
  role: Role

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.PUBLIC,
  })
  status: UserStatus

  @Column({ nullable: true })
  @Exclude()
  resetToken?: string

  @Column({ type: 'timestamp', nullable: true })
  @Exclude()
  resetTokenExpiry?: Date | null

  @Column({ nullable: true })
  @Exclude()
  fcmToken: string

  @AfterInsert()
  logInsert () {
    console.log('Inserted User with id: ' + this.id)
  }

  @AfterUpdate()
  logUpdate () {
    console.log('Updated User with id: ' + this.id)
  }

  @AfterRemove()
  logRemove () {
    console.log('Removed User with id: ' + this.id)
  }
}
