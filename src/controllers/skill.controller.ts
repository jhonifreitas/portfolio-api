import { Request, Response } from 'express';

import { ValidationError } from '@exceptions/validation-error';

import {
  AddValidation,
  UpdateValidation,
  GetAllValidation,
  DeleteValidation,
} from '@validations/skill.validation';

import { Skill } from '@models/skill';
import { SkillRepository } from '@repositories/skill.repository';

const SkillController = {
  async getAll(request: Request, response: Response) {
    const query = request.query as {[name: string]: string};
    
    await GetAllValidation.validate(query).catch((err) => {
      throw new ValidationError(err.errors[0]);
    });
    
    const _skill = new SkillRepository();
    let skills: Skill[] = [];

    if (query.active === 'true') skills = await _skill.getAllActive();
    else if (query.active === 'false') skills = await _skill.getAllDeleted();
    else skills = await _skill.getAll();

    return response.json(skills);
  },

  async get(request: Request, response: Response) {
    const { id } = request.params;
    const _skill = new SkillRepository();
    const skill = await _skill.getById(id);
    return response.json(skill);
  },

  async add(request: Request, response: Response) {
    const body = request.body;

    await AddValidation.validate(body).catch((err) => {
      throw new ValidationError(err.errors[0]);
    });

    const _skill = new SkillRepository(response.locals.userId);
    const skill = new Skill(body);
    skill.id = await _skill.add(skill);

    return response.status(201).json(skill);
  },

  async update(request: Request, response: Response) {
    const body = request.body;
    const { id } = request.params;

    await UpdateValidation.validate(body).catch((err) => {
      throw new ValidationError(err.errors[0]);
    });

    const _skill = new SkillRepository(response.locals.userId);
    const skill = await _skill.getById(id);

    if (body.name) skill.name = body.name;
    if (body.years) skill.years = body.years;
    if (body.percent) skill.percent = body.percent;

    await _skill.update(skill.id, skill);

    return response.json(skill);
  },

  async active(request: Request, response: Response) {
    const { id } = request.params;
    const _skill = new SkillRepository(response.locals.userId);
    await _skill.softDelete(id, false);
    return response.json();
  },

  async delete(request: Request, response: Response) {
    const body = request.body;
    const { id } = request.params;

    await DeleteValidation.validate(body).catch((err) => {
      throw new ValidationError(err.errors[0]);
    });

    const _skill = new SkillRepository(response.locals.userId);
    await _skill.delete(id, body.real);

    return response.json();
  }
};

export default SkillController;
