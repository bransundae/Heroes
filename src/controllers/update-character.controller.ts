import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Character, Armor, Weapon, Skill} from '../models';
import {CharacterRepository, ArmorRepository, WeaponRepository, SkillRepository} from '../repositories';

export class UpdateCharacterController {
  constructor(
    @repository(CharacterRepository) public characterRepository : CharacterRepository,
    @repository(WeaponRepository) public weaponRepository : WeaponRepository,
    @repository(ArmorRepository) public armorRepository : ArmorRepository,
    @repository(SkillRepository) public skillRepository : SkillRepository,
  ) {}

  @patch('/updatecharacter/{id}/weapon', {
    responses: {
      '200': {
        description: 'update weapon',
        content: {'application/json': {schema: Weapon}},
      },
    },
  })
  async updateWeapon(
      @param.path.string('id') id: string,
      @requestBody() weapon: Weapon,
  ): Promise<Weapon> {
    const character: Character = await this.characterRepository.findById(id);
    character.attack! += weapon.attack;
    character.defence! += weapon.defence;

    const filter: Filter = {where:{"characterId":id}};
    if ((await this.weaponRepository.find(filter))[0] != null) {
      const oldWeapon: Weapon = await this.characterRepository.weapon(id).get();
      character.attack! -= oldWeapon.attack;
      character.defence! -= oldWeapon.defence;
      await this.characterRepository.weapon(id).delete();
    }
    await this.characterRepository.updateById(id, character);
    return this.characterRepository.weapon(id).create(weapon).then(obj => {
      return obj;
    });
  }

  @patch('/updatecharacter/{id}/armor', {
    responses: {
      '200': {
        description: 'update armor',
        content: {'application/json': {schema: Armor}},
      },
    },
  })
  async updateArmor(
      @param.path.string('id') id: string,
      @requestBody() armor: Armor,
  ): Promise<Weapon> {
    const character: Character = await this.characterRepository.findById(id);
    character.attack! += armor.attack;
    character.defence! += armor.defence;

    const filter: Filter = {where:{"characterId":id}};
    if ((await this.armorRepository.find(filter))[0] != null) {
      const oldArmor: Armor = await this.characterRepository.weapon(id).get();
      character.attack! -= oldArmor.attack;
      character.defence! -= oldArmor.defence;
      await this.characterRepository.weapon(id).delete();
    }
    await this.characterRepository.updateById(id, character);
    return this.characterRepository.weapon(id).create(armor).then(obj => {
      return obj;
    });
  }
  @patch('/updatecharacter/{id}/skill', {
    responses: {
      '200': {
        description: 'update skill',
        content: {'application/json': {schema: Skill}}
      }
    }
  })
  async updateSkill(
      @param.path.string('id') id: string,
      @requestBody() skill: Skill,
  ): Promise<Skill> {
    await this.characterRepository.skill(id).delete();
    return this.characterRepository.skill(id).create(skill).then(obj => {
      return obj;
    })
  }
  @del('/updatecharacter/{id}/weapon', {
    responses: {
      '204': {
        description: 'DELETE Weapon',
      },
    },
  })
  async deleteWeapon(
      @param.path.string('id') id: string,
  ): Promise<void> {
    const filter: Filter = {where: {"characterId":id}};
    if ((await this.weaponRepository.find(filter))[0] != null) {
      const oldWeapon: Weapon = await this.characterRepository.weapon(id).get();
      const character: Character = await this.characterRepository.findById(id);
      character.attack! -= oldWeapon.attack;
      character.defence! -= oldWeapon.defence;
      await this.characterRepository.weapon(id).delete();
      await this.characterRepository.updateById(id, character);
    }
  }

  @del('/updatecharacter/{id}/armor', {
    responses: {
      '204': {
        description: 'DELETE Armor',
      },
    },
  })
  async deleteArmor(
      @param.path.string('id') id: string,
  ): Promise<void> {
    const filter: Filter = {where: {"characterId":id}};
    if ((await this.armorRepository.find(filter))[0] != null) {
      const oldArmor: Armor = await this.characterRepository.armor(id).get();
      const character: Character = await this.characterRepository.findById(id);
      character.attack! -= oldArmor.attack;
      character.defence! -= oldArmor.defence;
      await this.characterRepository.armor(id).delete();
      await this.characterRepository.updateById(id, character);
    }
  }

  @del('/updatecharacter/{id}/skill', {
    responses: {
      '204': {
        description: 'DELETE Skill',
      },
    },
  })
  async deleteSkill(
      @param.path.string('id') id: string,
  ): Promise<void> {
    await this.characterRepository.skill(id).delete();
  }

  //TODO: Add level up api's
}
