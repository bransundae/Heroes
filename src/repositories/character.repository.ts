import {DefaultCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {Character, CharacterRelations, Armor, Weapon, Skill} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';
import {Getter} from '@loopback/repository';
import {ArmorRepository, WeaponRepository, SkillRepository} from ".";

export class CharacterRepository extends DefaultCrudRepository<
  Character,
  typeof Character.prototype.id,
  CharacterRelations
> {
  public armor: HasOneRepositoryFactory<Armor, typeof Character.prototype.id>;
  public weapon: HasOneRepositoryFactory<Weapon, typeof Character.prototype.id>;
  public skill: HasOneRepositoryFactory<Skill, typeof Character.prototype.id>;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter(ArmorRepository) protected armorRepositoryGetter: Getter<ArmorRepository>,
    @repository.getter(WeaponRepository) protected weaponRepositoryGetter: Getter<WeaponRepository>,
    @repository.getter(SkillRepository) protected skillRepositoryGetter: Getter<SkillRepository>,
  ) {
    super(Character, dataSource);
    this.armor = this.createHasOneRepositoryFactoryFor('armor', armorRepositoryGetter);
    this.weapon = this.createHasOneRepositoryFactoryFor('weapon', weaponRepositoryGetter);
    this.skill = this.createHasOneRepositoryFactoryFor('skill', skillRepositoryGetter);
  }
}
