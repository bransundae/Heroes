import {BelongsToAccessor, DefaultCrudRepository, Getter, repository} from '@loopback/repository';
import {Character, Weapon, WeaponRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';
import {CharacterRepository} from "./character.repository";

export class WeaponRepository extends DefaultCrudRepository<
  Weapon,
  typeof Weapon.prototype.id,
  WeaponRelations
> {
  public readonly character: BelongsToAccessor<Character, typeof Weapon.prototype.id>;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('CharacterRepository') protected characterRepositoryGetter: Getter<CharacterRepository>,
  ) {
    super(Weapon, dataSource);
    this.character = this.createBelongsToAccessorFor('character', characterRepositoryGetter);
  }
}
