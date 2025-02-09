import * as DataLoader from 'dataloader'
import { UserNotFound } from '../constant/messages.constant'
import { User } from 'src/modules/users/entity/user.entity'
import { Repository, In } from 'typeorm'
import { Image } from '../upload/entity/image.entity'

export function createUserLoader (userRepository: Repository<User>) {
  return new DataLoader<number, User>(async (userIds: number[]) => {
    const users = await userRepository.findByIds(userIds)
    const userMap = new Map(users.map(user => [user.id, user]))
    return userIds.map(id => userMap.get(id) || new Error(UserNotFound))
  })
}

export function createImageLoader (imageRepository: Repository<Image>) {
  return new DataLoader<number, Image[]>(async (postIds: number[]) => {
    const images = await imageRepository.find({
      where: { postId: In(postIds) },
      select: ['path'],
    })

    const imageMap = new Map<number, Image[]>(postIds.map(id => [id, []]))
    images.forEach(image => imageMap.get(image.postId)?.push(image))
    return postIds.map(id => imageMap.get(id) || [])
  })
}
