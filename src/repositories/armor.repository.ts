import {BelongsToAccessor, DefaultCrudRepository, Getter, repository} from '@loopback/repository';
import {Armor, ArmorRelations, Character} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';
import {CharacterRepository} from "./character.repository";

export class ArmorRepository extends DefaultCrudRepository<
  Armor,
  typeof Armor.prototype.id,
  ArmorRelations
> {
  public readonly character: BelongsToAccessor<Character, typeof Armor.prototype.id>;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('CharacterRepository') protected characterRepositoryGetter: Getter<CharacterRepository>,
  ) {
    super(Armor, dataSource);
    this.character = this.createBelongsToAccessorFor('character', characterRepositoryGetter);
  }
}
