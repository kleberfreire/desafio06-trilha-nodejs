import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {

    return this.repository
      .createQueryBuilder("games")
      .where(`games.title ilike '%${param}%'`)
      .getMany()
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("SELECT COUNT(*) FROM games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[] | undefined> {
    const idTest = '93956c44-eb60-4a32-8e63-f70d6fac4e2a'
    
    const testUser = await this.repository
      .createQueryBuilder()
      .select("users")
      .from(User, 'users')
      .leftJoin("users.games", "games")
      .where("games.id = :idTest", { idTest } )
      .getMany()
      

      console.log(testUser)

      return undefined
      // Complete usando query builder
  }
}
