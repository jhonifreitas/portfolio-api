import { Request, Response } from 'express';

import { ValidationError } from '@exceptions/validation-error';

import {
  AddValidation,
  UpdateValidation,
  GetAllValidation,
  DeleteValidation,
} from '@validations/profile.validation';

import { Profile } from '@models/profile';
import { ProfileRepository } from '@repositories/profile.repository';

const ProfileController = {
  async getAll(request: Request, response: Response) {
    const query = request.query as {[name: string]: string};
    
    await GetAllValidation.validate(query).catch((err) => {
      throw new ValidationError(err.errors[0]);
    });
    
    const _profile = new ProfileRepository();
    let profiles: Profile[] = [];

    if (query.active === 'true') profiles = await _profile.getAllActive();
    else if (query.active === 'false') profiles = await _profile.getAllDeleted();
    else profiles = await _profile.getAll();

    return response.json(profiles);
  },

  async get(request: Request, response: Response) {
    const { id } = request.params;
    const _profile = new ProfileRepository();
    const profile = await _profile.getById(id);
    return response.json(profile);
  },

  async add(request: Request, response: Response) {
    const body = request.body;

    await AddValidation.validate(body).catch((err) => {
      throw new ValidationError(err.errors[0]);
    });

    const _profile = new ProfileRepository(response.locals.get('user').uid);
    const profile = new Profile(body);
    profile.id = await _profile.add(profile);

    return response.status(201).json(profile);
  },

  async update(request: Request, response: Response) {
    const body = request.body;
    const { id } = request.params;

    await UpdateValidation.validate(body).catch((err) => {
      throw new ValidationError(err.errors[0]);
    });

    const _profile = new ProfileRepository(response.locals.get('user').uid);
    const profile = await _profile.getById(id);

    if (body.name) profile.name = body.name;
    if (body.photo || body.photo === null) profile.photo = body.photo;
    if (body.profession_init) profile.profession_init = body.profession_init;
    if (body.profession_PT) profile.profession_PT = body.profession_PT;
    if (body.profession_EN) profile.profession_EN = body.profession_EN;
    if (body.about_PT) profile.about_PT = body.about_PT;
    if (body.about_EN) profile.about_EN = body.about_EN;
    if (body.CV_PT || body.CV_PT === null) profile.CV_PT = body.CV_PT;
    if (body.CV_EN || body.CV_EN === null) profile.CV_EN = body.CV_EN;

    await _profile.update(profile.id, profile);

    return response.json(profile);
  },

  async active(request: Request, response: Response) {
    const { id } = request.params;
    const _profile = new ProfileRepository(response.locals.get('user').uid);
    await _profile.softDelete(id, false);
    return response.json();
  },

  async delete(request: Request, response: Response) {
    const body = request.body;
    const { id } = request.params;

    await DeleteValidation.validate(body).catch((err) => {
      throw new ValidationError(err.errors[0]);
    });

    const _profile = new ProfileRepository(response.locals.get('user').uid);
    await _profile.delete(id, body.real);

    return response.json();
  }
};

export default ProfileController;
