import { EntityRepository, Repository } from 'typeorm';
import { Friend } from './friend.entity';

@EntityRepository(Friend)
export class FriendRepository extends Repository<Friend> {}
